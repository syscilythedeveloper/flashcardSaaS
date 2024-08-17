import Stripe from "stripe";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import getRawBody from "raw-body";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  try {
    console.log("req.headers", req.headers);
    if (req.method != "POST")
      return res.status(405).json({ error: "Only POST request allowed" });
    const sig = req.headers["stripe-signature"];
    const rawBody = await getRawBody(req);

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["line_items"] }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (!lineItems) {
        return res.status(400).json({ error: "Internal Server Error" });
      }

      try {
        console.log("Fullfill the order with custom logic");
        console.log("data: ", lineItems.data);
        console.log("customer email: ", event.data.object.customer_email);
        console.log("created at: ", event.data.object.created);

        console.log("creating suscription.......");

        res.status(200).end();
      } catch (error) {
        console.log("Handling when you're unable to save the order");
        return res.status(500).json({ error: "Internal Server Error 2" });
      }
    }
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return res.status(500).json({ error: "Failed to parse JSON" });
  }
}
