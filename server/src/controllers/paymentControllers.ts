import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * Create a Payment Session
 */
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user;
    const { plan } = req.body; // Example: "basic", "pro"

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: req.body.email,
      line_items: [
        {
          price: plan === "pro" ? process.env.STRIPE_PRO_PLAN : process.env.STRIPE_BASIC_PLAN,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
};
