export const categories = [
  { name: 'Пиццы' },
  { name: 'Завтрак' },
  { name: 'Закуски' },
  { name: 'Коктейли' },
  { name: 'Напитки' },
];

export const _ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl: '/images/ingredients/cheseBorder.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl: '/images/ingredients/mozzarella.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl: '/images/ingredients/chederAndParmezan.png',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl: '/images/ingredients/jalapenioPepper.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl: '/images/ingredients/tenderChicken.png',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl: '/images/ingredients/Schampinions.png',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl: '/images/ingredients/hamon.png',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl: '/images/ingredients/pepperoni.png',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl: '/images/ingredients/chorizzoSpicy.png',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl: '/images/ingredients/cucumberSalt.png',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl: '/images/ingredients/tomato.png',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl: '/images/ingredients/redOnion.png',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl: '/images/ingredients/freshPinnapple.png',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl: '/images/ingredients/italianSpicy.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl: '/images/ingredients/sweetPepper.png',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl: '/images/ingredients/brinza.png',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl: '/images/ingredients/meatballs.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    imageUrl: '/images/products/omeletWithHamAndMushrooms.webp',
    categoryId: 2,
  },
  {
    name: 'Омлет с пепперони',
    imageUrl: '/images/products/omletPepperoni.webp',
    categoryId: 2,
  },
  {
    name: 'Кофе Латте',
    imageUrl: '/images/products/latte.webp',
    categoryId: 2,
  },
  {
    name: 'Дэнвич ветчина и сыр',
    imageUrl: '/images/products/denvichHamAndChease.webp',
    categoryId: 3,
  },
  {
    name: 'Куриные наггетсы',
    imageUrl: '/images/products/naggets.webp',
    categoryId: 3,
  },
  {
    name: 'Картофель из печи с соусом 🌱',
    imageUrl: '/images/products/fryPattatoWithSouce.webp',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    imageUrl: '/images/products/dodster.webp',
    categoryId: 3,
  },
  {
    name: 'Острый Додстер 🌶️🌶️',
    imageUrl: '/images/products/dodsterSpicy.webp',
    categoryId: 3,
  },
  {
    name: 'Банановый молочный коктейль',
    imageUrl: '/images/products/bananaMilkCoctail.webp',
    categoryId: 4,
  },
  {
    name: 'Карамельное яблоко молочный коктейль',
    imageUrl: '/images/products/caramelAppleCoctail.webp',
    categoryId: 4,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl: '/images/products/oreoMilkCoctail.webp',
    categoryId: 4,
  },
  {
    name: 'Классический молочный коктейль 👶',
    imageUrl: '/images/products/classicMilkCoctail.webp',
    categoryId: 4,
  },
  {
    name: 'Ирландский Капучино',
    imageUrl: '/images/products/irishCappucino.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Карамельный капучино',
    imageUrl: '/images/products/caramelCappucino.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Кокосовый латте',
    imageUrl: '/images/products/coconutLatte.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Американо',
    imageUrl: '/images/products/americano.webp',
    categoryId: 5,
  },
  {
    name: 'Кофе Классический Латте',
    imageUrl: '/images/products/classicLatte.webp',
    categoryId: 5,
  },
];
