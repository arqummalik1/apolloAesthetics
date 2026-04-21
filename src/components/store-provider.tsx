"use client";

import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from "react";

import { product } from "@/data/product";
import { buildMockOrder, getCartQuantity, getCartSubtotal } from "@/lib/commerce";
import { clearPersistedStore, loadPersistedStore, savePersistedStore } from "@/lib/storage";
import type {
  AppStoreState,
  CartItem,
  CartState,
  CustomerAddress,
  MockOrder,
  PersistedStore,
} from "@/types/store";

type StoreAction =
  | { type: "HYDRATE"; payload: PersistedStore | null }
  | { type: "SET_DRAWER"; payload: boolean }
  | { type: "ADD_TO_CART"; payload: { productId: string; quantity: number } }
  | { type: "SET_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "SAVE_ADDRESS"; payload: CustomerAddress }
  | { type: "SELECT_PAYMENT_METHOD"; payload: string }
  | { type: "SET_PAYMENT_STATUS"; payload: AppStoreState["checkout"]["status"] }
  | { type: "COMPLETE_ORDER"; payload: MockOrder }
  | { type: "RESET_AFTER_SUCCESS" }
  | { type: "ADD_TOAST"; payload: { message: string; type: "success" | "info" } }
  | { type: "REMOVE_TOAST"; payload: number };

type StoreContextValue = {
  state: AppStoreState;
  cartQuantity: number;
  subtotal: number;
  addToCart: (quantity?: number) => void;
  setQuantity: (quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  saveAddress: (address: CustomerAddress) => void;
  selectPaymentMethod: (methodId: string) => void;
  setPaymentStatus: (status: AppStoreState["checkout"]["status"]) => void;
  completeOrder: () => MockOrder | null;
  resetAfterSuccess: () => void;
  showToast: (message: string, type?: "success" | "info") => void;
  removeToast: (id: number) => void;
};

const initialState: AppStoreState = {
  cart: { items: [] },
  checkout: {
    customerAddress: null,
    selectedPaymentMethod: null,
    status: "idle",
    completedOrder: null,
  },
  isCartOpen: false,
  isHydrated: false,
  toasts: [],
};

function upsertCartItem(items: CartItem[], payload: { productId: string; quantity: number }) {
  const current = items.find((item) => item.productId === payload.productId);
  if (!current) {
    return [...items, payload];
  }

  return items.map((item) =>
    item.productId === payload.productId ? { ...item, quantity: item.quantity + payload.quantity } : item,
  );
}

function normalizeCart(cart: CartState): CartState {
  return {
    items: cart.items.filter((item) => item.quantity > 0),
  };
}

function reducer(state: AppStoreState, action: StoreAction): AppStoreState {
  switch (action.type) {
    case "HYDRATE":
      return {
        ...state,
        cart: action.payload?.cart ?? state.cart,
        checkout: action.payload?.checkout ?? state.checkout,
        isHydrated: true,
      };
    case "SET_DRAWER":
      return { ...state, isCartOpen: action.payload };
    case "ADD_TO_CART": {
      const nextCart = normalizeCart({
        items: upsertCartItem(state.cart.items, action.payload),
      });

      return {
        ...state,
        cart: nextCart,
        isCartOpen: true,
      };
    }
    case "SET_QUANTITY": {
      const nextCart = normalizeCart({
        items: state.cart.items.map((item) =>
          item.productId === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item,
        ),
      });

      return {
        ...state,
        cart: nextCart,
      };
    }
    case "SAVE_ADDRESS":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          customerAddress: action.payload,
        },
      };
    case "SELECT_PAYMENT_METHOD":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          selectedPaymentMethod: action.payload,
        },
      };
    case "SET_PAYMENT_STATUS":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          status: action.payload,
        },
      };
    case "COMPLETE_ORDER":
      return {
        ...state,
        cart: { items: [] },
        checkout: {
          ...state.checkout,
          status: "paid",
          completedOrder: action.payload,
        },
      };
    case "RESET_AFTER_SUCCESS":
      return {
        ...initialState,
        isHydrated: state.isHydrated,
      };
    case "ADD_TOAST": {
      const newToast = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type,
      };
      return {
        ...state,
        toasts: [...state.toasts, newToast],
      };
    }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: loadPersistedStore() });
  }, []);

  useEffect(() => {
    if (!state.isHydrated) {
      return;
    }

    savePersistedStore({
      cart: state.cart,
      checkout: state.checkout,
    });
  }, [state.cart, state.checkout, state.isHydrated]);

  const cartQuantity = getCartQuantity(state.cart);
  const subtotal = getCartSubtotal(state.cart);

  const value: StoreContextValue = {
    state,
    cartQuantity,
    subtotal,
    addToCart(quantity = 1) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { productId: product.id, quantity: Math.max(1, quantity) },
      });
      dispatch({
        type: "ADD_TOAST",
        payload: { message: "Added to cart! ✨", type: "success" },
      });
    },
    setQuantity(quantity) {
      dispatch({
        type: "SET_QUANTITY",
        payload: { productId: product.id, quantity: Math.max(0, quantity) },
      });
    },
    openCart() {
      dispatch({ type: "SET_DRAWER", payload: true });
    },
    closeCart() {
      dispatch({ type: "SET_DRAWER", payload: false });
    },
    saveAddress(address) {
      dispatch({ type: "SAVE_ADDRESS", payload: address });
    },
    selectPaymentMethod(methodId) {
      dispatch({ type: "SELECT_PAYMENT_METHOD", payload: methodId });
    },
    setPaymentStatus(status) {
      dispatch({ type: "SET_PAYMENT_STATUS", payload: status });
    },
    completeOrder() {
      if (!state.checkout.customerAddress || !state.checkout.selectedPaymentMethod || state.cart.items.length === 0) {
        return null;
      }

      const order = buildMockOrder(
        state.cart,
        state.checkout.customerAddress,
        state.checkout.selectedPaymentMethod,
      );

      dispatch({ type: "COMPLETE_ORDER", payload: order });
      return order;
    },
    resetAfterSuccess() {
      clearPersistedStore();
      dispatch({ type: "RESET_AFTER_SUCCESS" });
    },
    showToast(message, type = "success") {
      dispatch({ type: "ADD_TOAST", payload: { message, type } });
    },
    removeToast(id) {
      dispatch({ type: "REMOVE_TOAST", payload: id });
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
