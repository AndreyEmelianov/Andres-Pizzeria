import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';

const productsFake = [
  {
    id: 1,
    name: 'Маргарита',
    price: 370,
    imageUrl: '/images/11EE7D6105EF6690B86FBDE6150B5B0C.avif',
    items: [{ price: 370 }],
  },
  {
    id: 2,
    name: 'Маргарита',
    price: 370,
    imageUrl: '/images/11EE7D6105EF6690B86FBDE6150B5B0C.avif',
    items: [{ price: 370 }],
  },
  {
    id: 3,
    name: 'Маргарита',
    price: 370,
    imageUrl: '/images/11EE7D6105EF6690B86FBDE6150B5B0C.avif',
    items: [{ price: 370 }],
  },
  {
    id: 4,
    name: 'Маргарита',
    price: 370,
    imageUrl: '/images/11EE7D6105EF6690B86FBDE6150B5B0C.avif',
    items: [{ price: 370 }],
  },
  {
    id: 5,
    name: 'Маргарита',
    price: 370,
    imageUrl: '/images/11EE7D6105EF6690B86FBDE6150B5B0C.avif',
    items: [{ price: 370 }],
  },
  {
    id: 6,
    name: 'Маргарита',
    price: 370,
    imageUrl: '/images/11EE7D6105EF6690B86FBDE6150B5B0C.avif',
    items: [{ price: 370 }],
  },
];

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" products={productsFake} categoryId={1} />
              <ProductsGroupList title="Закуски" products={productsFake} categoryId={2} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
