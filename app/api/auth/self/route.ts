import { NextResponse } from 'next/server';

import { getUserSession } from '@/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ message: 'Вы не авторизованны!' }, { status: 401 });
    }

    const data = await prisma.user.findFirst({
      where: {
        id: +user.id,
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '[Self] server error' }, { status: 500 });
  }
}
