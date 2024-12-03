"use client";

import { PaymentDetails } from "@/types/payement";
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

            const purchaseUnit = details.purchase_units?.[0];
            const customer = details.payer;

            const PaymentDetails: PaymentDetails = {
              id: details.id!,
              orderId: data.orderID || "",
              paymentId: details.id || "",
              status: details.status || "",
              amount: purchaseUnit?.amount?.value || "0",
              currency: purchaseUnit?.amount?.currency_code || "USD",
              payerEmail: customer?.email_address || "",
              purchase_units: details.purchase_units?.map((unit) => ({
                payments: unit.payments || { captures:  [{ id: "" }] },
                amount: unit.amount || { value: "0", currency_code: "USD" },
              })) || [],
              payer: { 
                email_address: customer?.email_address || "",
              },
              create_time: details.create_time || "",
              update_time: details.update_time || "",
            };

            onSuccess(PaymentDetails);
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