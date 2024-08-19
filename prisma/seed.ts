import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

import { prisma } from './prisma-client';
import { _ingredients, categories, products } from './constants';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 700),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User',
        email: 'user@gmail.ru',
        password: hashSync('123456', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@gmail.ru',
        password: hashSync('123456', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl: '/images/pizzas/pepperoniFresh233x233.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl: '/images/pizzas/cheesePizza233x233.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl: '/images/pizzas/ChorizoFresh584x584.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Мясная с аджикой',
      imageUrl: '/images/pizzas/adjicaPizza.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 40),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Бефстроганов',
      imageUrl: '/images/pizzas/beefstroganof.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 40),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: 'Двойной цыпленок',
      imageUrl: '/images/pizzas/chickenCheesePizza.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 40),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: 'Мясной микс с баварскими колбасками',
      imageUrl: '/images/pizzas/meatMixPizza.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 40),
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: 'Креветки со сладким чили',
      imageUrl: '/images/pizzas/shrimpsPizza.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),

      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30 }),

      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '111111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: '/images/stories/story1.webp',
      },
      {
        previewImageUrl: '/images/stories/story2.webp',
      },
      {
        previewImageUrl: '/images/stories/story3.webp',
      },
      {
        previewImageUrl: '/images/stories/story4.webp',
      },
      {
        previewImageUrl: '/images/stories/story5.webp',
      },
      {
        previewImageUrl: '/images/stories/story6.webp',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: '/images/stories/storyItem1.webp',
      },
      {
        storyId: 1,
        sourceUrl: '/images/stories/storyItem2.webp',
      },
      {
        storyId: 2,
        sourceUrl: '/images/stories/storyItem3.webp',
      },
      {
        storyId: 2,
        sourceUrl: '/images/stories/storyItem4.webp',
      },
      {
        storyId: 3,
        sourceUrl: '/images/stories/storyItem5.webp',
      },
      {
        storyId: 4,
        sourceUrl: '/images/stories/storyItem6.webp',
      },
      {
        storyId: 4,
        sourceUrl: '/images/stories/storyItem7.webp',
      },
      {
        storyId: 5,
        sourceUrl: '/images/stories/storyItem7.webp',
      },
      {
        storyId: 5,
        sourceUrl: '/images/stories/storyItem3.webp',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
