export interface PaymentDetails {
  id: string;
  orderId: string;
  paymentId: string;
  status: string;
  amount: string;
  currency: string;
  payerEmail: string;
  purchase_units: {
    reference_id?: string;
    amount: {
      value: string;
      currency_code: string;
      breakdown?: {
        item_total?: { currency_code: string; value: string };
        shipping?: { currency_code: string; value: string };
        discount?: { currency_code: string; value: string };
      };
    };
  }[];
  payments?: {
    method: string;
    status: string;
  };
  payer: {
    email_address: string;
  };
  create_time?: string;
  update_time?: string;
}