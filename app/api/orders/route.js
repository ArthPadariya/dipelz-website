import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

//////////////////////////////////////////////////////
// CREATE ORDER
//////////////////////////////////////////////////////

export async function POST(req) {

  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { address, couponCode } = await req.json();

    //////////////////////////////////////////////////////
    // GET USER CART
    //////////////////////////////////////////////////////

    const cart = await prisma.cart.findUnique({

      where: {
        userEmail: session.user.email
      },

      include: {
        items: {
          include: {
            product: true
          }
        }
      }

    });

    if (!cart || cart.items.length === 0) {

      return NextResponse.json(
        { error: "Cart empty" },
        { status: 400 }
      );

    }

    //////////////////////////////////////////////////////
    // CALCULATE SUBTOTAL
    //////////////////////////////////////////////////////

    const subtotal = cart.items.reduce(

      (acc, item) =>
        acc + item.product.price * item.quantity,

      0

    );

    const deliveryFee =
      subtotal >= 399 ? 0 : 40;

    let discount = 0;
    let coupon = null;

    //////////////////////////////////////////////////////
    // VALIDATE COUPON
    //////////////////////////////////////////////////////

    if (couponCode) {

      coupon = await prisma.coupon.findUnique({
        where: { code: couponCode }
      });

      if (!coupon) {

        return NextResponse.json(
          { error: "Invalid coupon code" },
          { status: 400 }
        );

      }

      if (!coupon.active) {

        return NextResponse.json(
          { error: "Coupon inactive" },
          { status: 400 }
        );

      }

      if (coupon.expiresAt && coupon.expiresAt < new Date()) {

        return NextResponse.json(
          { error: "Coupon expired" },
          { status: 400 }
        );

      }

      discount =
        (subtotal + deliveryFee) *
        (coupon.discount / 100);

    }

    //////////////////////////////////////////////////////
    // FINAL TOTAL
    //////////////////////////////////////////////////////

    const total =
      subtotal + deliveryFee - discount;

    //////////////////////////////////////////////////////
    // CREATE ORDER
    //////////////////////////////////////////////////////

    const order = await prisma.order.create({

      data: {

        userId: session.user.id,

        total,

        status: "pending",

        paymentStatus: "pending",

        address: JSON.stringify(address),

        items: {

          create: cart.items.map(item => ({

            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
            name: item.product.name

          }))

        }

      }

    });

    //////////////////////////////////////////////////////
    // SAVE COUPON USAGE
    //////////////////////////////////////////////////////

    if (coupon) {

      await prisma.couponUsage.create({

        data: {

          userEmail: session.user.email,
          couponId: coupon.id

        }

      });

    }

    //////////////////////////////////////////////////////
    // CLEAR CART
    //////////////////////////////////////////////////////

    await prisma.cartItem.deleteMany({

      where: {
        cartId: cart.id
      }

    });

    return NextResponse.json(order);

  } catch (error) {

    console.error("ORDER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );

  }

}

//////////////////////////////////////////////////////
// GET ORDERS (ADMIN)
//////////////////////////////////////////////////////

export async function GET() {

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );

  }

  const orders = await prisma.order.findMany({

    include: {
      user: true,
      items: true
    },

    orderBy: {
      createdAt: "desc"
    }

  });

  return NextResponse.json(orders);

}

//////////////////////////////////////////////////////
// UPDATE ORDER STATUS (ADMIN)
//////////////////////////////////////////////////////

export async function PATCH(req) {

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );

  }

  const { orderId, status } = await req.json();

  const updated = await prisma.order.update({

    where: { id: orderId },

    data: { status }

  });

  return NextResponse.json(updated);

}