// src/app/api/orders/route.ts

import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, products } = body // products = [{ productId, quantity }]

    if (!userId || !Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    // احسب السعر الإجمالي
    const productIds = products.map(p => p.productId)
    const foundProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    const total = foundProducts.reduce((acc, p) => {
      const item = products.find(i => i.productId === p.id)
      return acc + p.price * (item?.quantity || 1)
    }, 0)

    // أنشئ الطلب
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        total,
        items: {
          create: products.map(p => ({
            product: { connect: { id: p.productId } },
            quantity: p.quantity,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
