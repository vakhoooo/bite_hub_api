import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const cuisines = [
  'Вок',
  'Бургеры',
  'Суши',
  'Пицца',
  'Паста',
  'Завтраки',
  'Обеды',
  'Грузия',
  'Италия',
  'Русская',
  'Узбекская',
  'Азия',
  'Япония',
  'Китай',
  'Кофе',
  'Десерты',
  'Выпечка',
  'Шашлык',
  'Шаурма',
  'Стейки',
  'Сэндвичи',
  'Морепродукты',
  'Вегги',
  'Европа',
  'Фастфуд',
  'Восток',
  'Кавказ',
  'Детское',
];

const imageUrls = [
  'https://i.pinimg.com/736x/b9/f6/1c/b9f61c263f36783eb5ef06de0fb14488.jpg',
  'https://i.pinimg.com/736x/89/39/89/893989d8309ef1f714c2207fdc8e4846.jpg',
  'https://i.pinimg.com/736x/57/93/aa/5793aae2b2d8daf281d4e3d1c48ead58.jpg',
  'https://i.pinimg.com/736x/37/7c/ce/377cce5e06eb7e18921831bf45cbb0a8.jpg',
  'https://i.pinimg.com/736x/8a/97/a3/8a97a30a195970749e16eaa97b697fc4.jpg',
  'https://i.pinimg.com/736x/c7/f4/e0/c7f4e078ec9aa74a8c6f34d92303094b.jpg',
  'https://i.pinimg.com/736x/a4/f3/ab/a4f3ab79f7a0c0346fdc58a89ba54edb.jpg',
  'https://i.pinimg.com/736x/b8/2d/e9/b82de9d7d553f4fa8617b929a0d401e3.jpg',
  'https://i.pinimg.com/736x/72/d9/af/72d9af964d384fc2a16fd087c1062a7c.jpg',
  'https://i.pinimg.com/736x/8a/5f/97/8a5f9705388e1b01876827aaccca9fd6.jpg',
  'https://i.pinimg.com/736x/a2/1c/47/a21c47b8aa3b23c4eca6c7479682d858.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpcZMbhagb5koJ_yBYq1hCR1c30AA4Wo8xrQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFG2qVSfpbyJkWLn5KkmL0TmCmDb4tx_x8bg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB9OeQe4Zh_-SwFEF7aaY8GMxpHlF8gIZoRw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgEyBglWaJcMivzOBRFYZr3pmAG9YuWCxk5Q&s',
  'https://i.pinimg.com/736x/69/60/06/69600698b09c8c3eeea63103444b4439.jpg',
  'https://i.pinimg.com/736x/10/9d/97/109d97db916c75ff643787a3075ff399.jpg',
  'https://i.pinimg.com/736x/ef/1a/17/ef1a17a1f18485a6d874a91493307468.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasmKRzXFXKHlyQKKe5fibTQDRY3fQp4xJHVpiXxL8lg_2msdWkwtYJFiwIS0kKb_kgn4&usqp=CAU',
  'https://img.freepik.com/premium-photo/georgian-dumplings-khinkali-with-meat-tasty-healthy-food_135427-44.jpg',
  'https://thecookingfoodie.com/wp-content/uploads/2024/08/240103-jpg.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcNmX1RkffNeNvBf0uY9ug1t6l_I6LfOXusw&s',
  'https://i.pinimg.com/736x/04/55/68/04556881f33c0636fea94aa9a92a8565.jpg',
  'https://cdn.loveandlemons.com/wp-content/uploads/2019/06/homemade-pizza.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI2ZGexGWt5hFN1lhsDXMoWbfH3WHWeTB12p0eVUv0rLvKMTlInmOo9m3VoItM679SWdg&usqp=CAU',
];

function getRestaurantTypes() {
  const length = Math.floor(Math.random() * 8);

  const res = [];

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * cuisines.length);

    const el = cuisines[index];

    res.push(el);
  }

  return res;
}

function getRandomImage() {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
}

function createRandomTgNumber() {
  return Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 9) + 1,
  ).join('');
}

function createUserContact() {
  return {
    city: 'Краснодар',
    address: 'Улица Героя Яцкова 28',
    phoneNumber: faker.phone.number(),
  };
}

// async function createMeal() {
//   const idList: any[] = await prisma.restaurant.findMany({
//     where: { isOpen: true, isBlocked: false },
//   });

//   const mealConstructor = () => ({
//     name: faker.food.dish(),
//     isActive: true,
//     imageUrl: getRandomImage(),
//     price: +faker.commerce.price({ min: 400.0 }),
//     isHalal: Math.floor(Math.random() * 2) > 1,
//     spicyLevel: Math.floor(Math.random() * 5),
//     isAllergic: Math.floor(Math.random() * 2) > 1,
//     restaurantId: idList[Math.floor(Math.random() * idList.length)]?.id,
//     weight: +faker.commerce.price({ min: 400.0, max: 2000.0 }),
//     ingredients: Array.from({ length: Math.floor(Math.random() * 20) }, () =>
//       faker.food.ingredient(),
//     ),
//     prepApproxTime: Math.floor(Math.random() * 300000),
//   });

//   let res = [];

//   for (let i = 0; i < 1000; i++) {
//     const meal = mealConstructor();

//     res.push(meal);

//     if (res.length === 100) {
//       await prisma.meal.createMany({ data: res });
//       res = [];
//     }
//   }
// }

// createMeal()
//   .then((res) => console.log('MOVRCHIT'))
//   .catch((err) => console.log(err));

//--------------------

async function seed() {
  console.log('🚀 Seeding users...');

  const users = Array.from({ length: 100 }, () => ({
    role: Math.random() < 0.5 ? Role.USER : Role.RESTAURANT_OWNER,
    tgId: createRandomTgNumber(),
    ...createUserContact(),
    userName: faker.internet.userName(),
    lat: 45.068975,
    long: 39.040188,
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${users.length} users!`);

  console.log('📝 Seeding user contacts...');

  const createdUsers = await prisma.user.findMany();

  console.log('🏢 Seeding restaurants...');

  const restaurantOwners = createdUsers.filter(
    (user) => user.role === Role.RESTAURANT_OWNER,
  );

  for (const owner of restaurantOwners) {
    try {
      const restaurant = await prisma.restaurant.create({
        data: {
          name: faker.company.name(),
          introImageUrl: getRandomImage(),
          userId: owner.id,
          percent: Math.floor(Math.random() * (15 - 9 + 1) + 9),
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          city: faker.location.city(),
          address: ["Лиственная улица, 2", "2-я Российская улица", "Подсолнечная улица, 16"][Math.floor(Math.random() * 2)],
          ownerFullname: faker.person.fullName(),
          pickUpAddress: faker.location.streetAddress(),
          isOpen: faker.datatype.boolean(),
          isBlocked: faker.datatype.boolean(),
          lat: [39.01912, 39.022772, 38.983388, 39.133188][
            Math.floor(Math.random() * 2)
          ],
          long: [45.055985, 45.041754, 45.018396, 45.093334, 45.116141][
            Math.floor(Math.random() * 3)
          ],
          types: getRestaurantTypes(),
        },
      });

      await prisma.restaurantRating.create({
        data: {
          eval: 5,
          restaurantId: restaurant.id,
        },
      });

      console.log(`✅ Created restaurant: ${restaurant.name}`);
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.warn(
          `⚠️ Skipping duplicate restaurant for owner ${owner.userName}`,
        );
      } else {
        console.error(`❌ Failed to create restaurant:`, error);
      }
    }
  }

  console.log(`✅ Created ${restaurantOwners.length} restaurants!`);
  console.log('🎉 Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
