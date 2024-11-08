import prisma from "@/lib/prisma";
import { PaymentDetails } from "@/types/payement";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: PaymentDetails = await req.json();
    const { orderId, paymentId, status, amount, currency, payerEmail } = body;

    if (!orderId || !paymentId || !status || !amount || !currency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: { orderId, paymentId, status, amount: parseFloat(amount), currency, payerEmail },
    });

    return NextResponse.json({ order });
  } catch(error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}