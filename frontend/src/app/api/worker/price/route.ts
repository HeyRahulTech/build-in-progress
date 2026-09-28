import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workerId, city, price } = body;

    // Basic validation
    if (!workerId || !city || price === undefined) {
      return NextResponse.json({ error: 'Missing workerId, city, or price' }, { status: 400 });
    }

    // Upsert is perfect here: it creates a new record if the city isn't listed, 
    // or updates the price if the worker already has a price set for this city.
    const cityPrice = await prisma.workerCityPricing.upsert({
      where: {
        // This relies on the @@unique([workerId, city]) we added in schema.prisma
        workerId_city: {
          workerId: workerId,
          city: city.toLowerCase().trim(), // Standardize city names
        },
      },
      update: {
        price: parseFloat(price),
      },
      create: {
        workerId: workerId,
        city: city.toLowerCase().trim(),
        price: parseFloat(price),
      },
    });

    return NextResponse.json({ success: true, message: 'Price updated successfully', data: cityPrice }, { status: 200 });

  } catch (error) {
    console.error('Error saving worker price:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
