export interface PayPalButtonProps {
  amount: number;
  currency: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}