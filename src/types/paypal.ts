import { PaymentDetails } from "./payement";

export interface PayPalButtonProps {
  amount: number;
  currency: string;
  onSuccess: (details: PaymentDetails) => void;
  onError: (error: unknown) => void;
}