"use client";

import { PayPalButtonProps } from "@/types/paypal";
import { FUNDING, PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency,
  onSuccess,
  onError
}) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! || "",
        currency: currency,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, actions) => 
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{ amount: { currency_code: currency, value: amount.toString() } }],
          })
        }
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess(details);
          }
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;