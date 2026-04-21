import type { CartItem, CustomerAddress, MockOrder, PersistedStore } from "@/types/store";

const STORAGE_KEY = "apollo-aesthetics-store-v1";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeCartItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .filter((item): item is { productId: string; quantity: number } => {
      return isObject(item) && typeof item.productId === "string" && typeof item.quantity === "number";
    })
    .map((item) => ({
      productId: item.productId,
      quantity: Number.isFinite(item.quantity) ? item.quantity : 0,
    }));
}

function normalizeAddress(raw: unknown): CustomerAddress | null {
  if (!isObject(raw)) {
    return null;
  }

  const read = (key: keyof CustomerAddress) => (typeof raw[key] === "string" ? raw[key] : "");

  return {
    fullName: read("fullName"),
    phone: read("phone"),
    email: read("email"),
    addressLine: read("addressLine"),
    landmark: read("landmark"),
    city: read("city"),
    state: read("state"),
    postalCode: read("postalCode"),
  };
}

function normalizeCompletedOrder(raw: unknown): MockOrder | null {
  if (!isObject(raw)) {
    return null;
  }

  const customerAddress = normalizeAddress(raw.customerAddress);
  if (!customerAddress) {
    return null;
  }

  return {
    id: typeof raw.id === "string" ? raw.id : "",
    items: normalizeCartItems(raw.items),
    subtotal: typeof raw.subtotal === "number" ? raw.subtotal : 0,
    shipping: typeof raw.shipping === "number" ? raw.shipping : 0,
    total: typeof raw.total === "number" ? raw.total : 0,
    paymentMethodId: typeof raw.paymentMethodId === "string" ? raw.paymentMethodId : "",
    customerAddress,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : "",
    estimatedDispatchLabel:
      typeof raw.estimatedDispatchLabel === "string" ? raw.estimatedDispatchLabel : "",
  };
}

function normalizePersistedStore(raw: unknown): PersistedStore | null {
  if (!isObject(raw)) {
    return null;
  }

  const cart = isObject(raw.cart) ? raw.cart : {};
  const checkout = isObject(raw.checkout) ? raw.checkout : {};

  return {
    cart: {
      items: normalizeCartItems(cart.items),
    },
    checkout: {
      customerAddress: normalizeAddress(checkout.customerAddress),
      selectedPaymentMethod:
        typeof checkout.selectedPaymentMethod === "string" ? checkout.selectedPaymentMethod : null,
      status:
        checkout.status === "processing" || checkout.status === "paid" || checkout.status === "idle"
          ? checkout.status
          : "idle",
      completedOrder: normalizeCompletedOrder(checkout.completedOrder),
    },
  };
}

export function loadPersistedStore(): PersistedStore | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return normalizePersistedStore(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function savePersistedStore(store: PersistedStore) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore storage write failures so the checkout flow still works in restricted browsers.
  }
}

export function clearPersistedStore() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures for the same reason as save failures.
  }
}
