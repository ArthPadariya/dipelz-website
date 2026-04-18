import { prisma } from "@/lib/prisma";

export default async function PaymentPage({ params }) {

  const { id: orderId } = await params;

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 399 ? 0 : 40;

  const total = subtotal + shipping;

  return (

    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto py-6 px-6 flex items-center justify-between">

        <img
          src="/logo.png"
          className="h-10"
        />

        <div className="text-sm text-gray-500">
          Secure Checkout 🔒
        </div>

      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 pb-16">

        {/* LEFT SIDE — PAYMENT */}

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-xl font-semibold mb-4">
            Payment Method
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            All transactions are secure and encrypted
          </p>

          {/* PAYMENT METHODS */}

          <div className="border rounded-lg divide-y">

            {/* RAZORPAY */}

            <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">

              <div className="flex items-center gap-3">

                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />

                <span className="font-medium">
                  Razorpay Secure
                </span>

              </div>

              <div className="flex gap-2 items-center">

                <img src="/upi.jpeg" className="h-6" />
                <img src="/visa.jpeg" className="h-6" />
                <img src="/mastercard.jpeg" className="h-6" />
                <img src="/rupay.jpeg" className="h-6" />

              </div>

            </label>

            {/* CASH ON DELIVERY */}

            <label className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50">

              <input
                type="radio"
                name="payment"
              />

              <span>
                Cash on Delivery
              </span>

            </label>

          </div>

          {/* BILLING ADDRESS */}

          <div className="mt-8">

            <h3 className="font-medium mb-3">
              Billing Address
            </h3>

            <div className="border rounded-lg divide-y">

              <label className="flex items-center gap-3 p-4">

                <input
                  type="radio"
                  name="billing"
                  defaultChecked
                />

                Same as shipping address

              </label>

              <label className="flex items-center gap-3 p-4">

                <input
                  type="radio"
                  name="billing"
                />

                Use different billing address

              </label>

            </div>

          </div>

          {/* PAY BUTTON */}

          <button
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            Pay ₹{total}
          </button>

          {/* FOOTER */}

          <div className="flex gap-6 text-xs text-gray-500 mt-6">

            <span>Refund policy</span>
            <span>Shipping</span>
            <span>Privacy policy</span>
            <span>Terms</span>

          </div>

        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}

        <div className="bg-white shadow-lg rounded-xl p-8 h-fit">

          <h3 className="font-semibold text-lg mb-6">
            Order Summary
          </h3>

          <div className="space-y-4">

            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center"
              >

                <div className="flex gap-3 items-center">

                  <img
                    src={item.product.images?.[0]}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />

                  <div>

                    <p className="font-medium">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty {item.quantity}
                    </p>

                  </div>

                </div>

                <span className="font-medium">
                  ₹{item.product.price * item.quantity}
                </span>

              </div>

            ))}

          </div>

          {/* TOTAL */}

          <div className="border-t mt-6 pt-6 space-y-3 text-sm">

            <div className="flex justify-between">

              <span>Subtotal</span>
              <span>₹{subtotal}</span>

            </div>

            <div className="flex justify-between">

              <span>Shipping</span>

              <span>
                {shipping === 0 ? "Free" : `₹${shipping}`}
              </span>

            </div>

          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">

            <span>Total</span>
            <span>₹{total}</span>

          </div>

        </div>

      </div>

    </div>

  );
}