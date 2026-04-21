import type { CustomerAddress } from "@/types/store";

export type AddressErrors = Partial<Record<keyof CustomerAddress, string>>;

export function validateAddress(address: CustomerAddress): AddressErrors {
  const errors: AddressErrors = {};

  if (!address.fullName.trim()) errors.fullName = "Full name is required.";
  if (!address.phone.trim()) errors.phone = "Phone number is required.";
  if (!address.email.trim()) errors.email = "Email address is required.";
  if (!address.addressLine.trim()) errors.addressLine = "Address line is required.";
  if (!address.city.trim()) errors.city = "City is required.";
  if (!address.state.trim()) errors.state = "State is required.";
  if (!address.postalCode.trim()) errors.postalCode = "Postal code is required.";

  if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (address.phone && !/^[0-9+\-\s]{8,15}$/.test(address.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (address.postalCode && !/^[0-9]{4,10}$/.test(address.postalCode)) {
    errors.postalCode = "Enter a valid postal code.";
  }

  return errors;
}

export function isAddressComplete(address: CustomerAddress | null) {
  if (!address) {
    return false;
  }

  return Object.keys(validateAddress(address)).length === 0;
}
