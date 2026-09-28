import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, workerId, city, quantity = 1 } = body;

    // 1. Basic Validation
    if (!userId || !workerId || !city) {
      return NextResponse.json({ error: 'Missing required fields (userId, workerId, city)' }, { status: 400 });
    }

    // 2. Fetch Worker's Pricing for this specific city
    const workerPriceRecord = await prisma.workerCityPricing.findUnique({
      where: {
        workerId_city: {
          workerId: workerId,
          city: city.toLowerCase().trim(),
        },
      },
    });

    // If no record exists, the worker doesn't service this city or hasn't set a price yet.
    if (!workerPriceRecord) {
      return NextResponse.json({ 
        error: 'This worker is not currently available or has no pricing set for this city.' 
      }, { status: 404 });
    }

    // 3. Perform Commission & Financial Math
    const basePrice = workerPriceRecord.price;
    const totalPrice = basePrice * quantity;
    
    // Platform takes a 5% cut
    const commissionAmount = totalPrice * 0.05;
    
    // Worker keeps the remaining 95%
    const workerPayout = totalPrice - commissionAmount;

    // 4. Create the Booking Record
    const booking = await prisma.booking.create({
      data: {
        userId,
        workerId,
        city: city.toLowerCase().trim(),
        quantity,
        basePrice,
        totalPrice,
        commissionAmount,
        workerPayout,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking created successfully!',
      booking: booking 
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
