import { prisma } from "@/lib/prisma";

export async function handleChatbot(message) {

  const msg = message.toLowerCase();

  // FAQ

  if (msg.includes("delivery")) {
    return "🚚 Orders are delivered within 25-40 minutes.";
  }

  if (msg.includes("payment")) {
    return "💳 We accept UPI, Cards, Netbanking and COD.";
  }

  if (msg.includes("contact")) {
    return "📞 You can contact support at +91 9876543210";
  }

  // Product Recommendation

  if (msg.includes("recommend")) {

    const products = await prisma.product.findMany({
      where: { bestSeller: true },
      take: 3
    });

    return `🔥 Our best sellers are: ${products.map(p => p.name).join(", ")}`;
  }

  // Order Tracking

  if (msg.includes("order")) {

    return "📦 Please enter your order ID so I can track it.";
  }

  return "🙂 I'm here to help. You can ask about orders, products, delivery or payments.";

}