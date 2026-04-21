export type GalleryAsset = {
  id: string;
  src: string;
  alt: string;
  label: string;
  accent: string;
};

export type Product = {
  id: string;
  brand: string;
  name: string;
  form: string;
  volume: string;
  price: number;
  currency: "INR";
  shortDescription: string;
  description: string;
  usage: string[];
  caution: string[];
  highlights: string[];
  listedIngredients: string[];
  heroImage: GalleryAsset;
  featureImages: GalleryAsset[];
  gallery: GalleryAsset[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CustomerAddress = {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
};

export type PaymentOption = {
  id: string;
  label: string;
  description: string;
};

export type MockOrder = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethodId: string;
  customerAddress: CustomerAddress;
  createdAt: string;
  estimatedDispatchLabel: string;
};

export type CheckoutState = {
  customerAddress: CustomerAddress | null;
  selectedPaymentMethod: string | null;
  status: "idle" | "processing" | "paid";
  completedOrder: MockOrder | null;
};

export type ToastState = {
  message: string;
  type: "success" | "info";
  id: number;
};

export type AppStoreState = {
  cart: CartState;
  checkout: CheckoutState;
  isCartOpen: boolean;
  isHydrated: boolean;
  toasts: ToastState[];
};

export type PersistedStore = Pick<AppStoreState, "cart" | "checkout">;
