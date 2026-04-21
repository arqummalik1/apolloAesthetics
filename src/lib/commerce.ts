import { product } from "@/data/product";
import { makeOrderId } from "@/lib/format";
import type { CartState, CustomerAddress, MockOrder } from "@/types/store";

export function getCartQuantity(cart: CartState) {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(cart: CartState) {
  return cart.items.reduce((total, item) => {
    if (item.productId !== product.id) {
      return total;
    }

    return total + product.price * item.quantity;
  }, 0);
}

export function buildMockOrder(
  cart: CartState,
  customerAddress: CustomerAddress,
  paymentMethodId: string,
): MockOrder {
  const subtotal = getCartSubtotal(cart);
  const shipping = 0;

  return {
    id: makeOrderId(),
    items: cart.items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    paymentMethodId,
    customerAddress,
    createdAt: new Date().toISOString(),
    estimatedDispatchLabel: "Dispatch within 24 hours after backend go-live",
  };
}
