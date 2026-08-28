import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing data...");
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.savedPost.deleteMany();
  await prisma.postDetail.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log("Creating users...");
  const password = await bcrypt.hash("password123", 10);

  const [rahul, priya, arjun, ananya] = await Promise.all([
    prisma.user.create({
      data: {
        username: "rahul_sharma",
        email: "rahul@example.com",
        password,
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    }),
    prisma.user.create({
      data: {
        username: "priya_patel",
        email: "priya@example.com",
        password,
        avatar: "https://i.pravatar.cc/150?img=25",
      },
    }),
    prisma.user.create({
      data: {
        username: "arjun_mehta",
        email: "arjun@example.com",
        password,
        avatar: "https://i.pravatar.cc/150?img=15",
      },
    }),
    prisma.user.create({
      data: {
        username: "ananya_iyer",
        email: "ananya@example.com",
        password,
        avatar: "https://i.pravatar.cc/150?img=32",
      },
    }),
  ]);

  console.log("Creating posts...");

  const postsData = [
    {
      title: "Spacious 2BHK Near Bandra Station",
      price: 45000,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      ],
      address: "Linking Road, Bandra West",
      city: "Mumbai",
      bedroom: 2,
      bathroom: 2,
      latitude: "19.054999",
      longitude: "72.840698",
      type: "rent",
      property: "apartment",
      userId: rahul.id,
      detail: {
        desc: "Well-ventilated 2BHK close to Bandra station, market, and Carter Road. Semi-furnished with modular kitchen.",
        utilities: "Tenant pays utilities",
        pet: "Pets Allowed",
        income: "3x the rent",
        size: 950,
        school: 2,
        bus: 1,
        restaurant: 1,
      },
    },
    {
      title: "Independent Villa in Whitefield",
      price: 12500000,
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      ],
      address: "ITPL Main Road, Whitefield",
      city: "Bangalore",
      bedroom: 4,
      bathroom: 4,
      latitude: "12.969700",
      longitude: "77.749901",
      type: "buy",
      property: "house",
      userId: rahul.id,
      detail: {
        desc: "Premium independent villa near tech parks, with private garden, servant quarters, and covered parking.",
        utilities: "Owner responsible",
        pet: "Pets Allowed",
        income: "N/A",
        size: 3200,
        school: 1,
        bus: 3,
        restaurant: 2,
      },
    },
    {
      title: "Premium 3BHK in Gurgaon Sector 54",
      price: 65000,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      ],
      address: "Golf Course Road, Sector 54",
      city: "Gurgaon",
      bedroom: 3,
      bathroom: 3,
      latitude: "28.432850",
      longitude: "77.101669",
      type: "rent",
      property: "condo",
      userId: priya.id,
      detail: {
        desc: "High-rise apartment with clubhouse, swimming pool, gym, and 24/7 security, close to Cyber Hub.",
        utilities: "Included in rent",
        pet: "Pets not allowed",
        income: "2.5x the rent",
        size: 1750,
        school: 2,
        bus: 1,
        restaurant: 1,
      },
    },
    {
      title: "Cosy 3BHK in Kothrud",
      price: 8500000,
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      ],
      address: "Paud Road, Kothrud",
      city: "Pune",
      bedroom: 3,
      bathroom: 2,
      latitude: "18.507750",
      longitude: "73.807861",
      type: "buy",
      property: "apartment",
      userId: priya.id,
      detail: {
        desc: "Family-friendly apartment in a well-established society with a garden, close to schools and hospitals.",
        utilities: "Owner responsible",
        pet: "Pets Allowed",
        income: "N/A",
        size: 1350,
        school: 1,
        bus: 2,
        restaurant: 3,
      },
    },
    {
      title: "Studio Near Anna University",
      price: 15000,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      ],
      address: "Sardar Patel Road, Guindy",
      city: "Chennai",
      bedroom: 1,
      bathroom: 1,
      latitude: "13.008730",
      longitude: "80.219521",
      type: "rent",
      property: "apartment",
      userId: arjun.id,
      detail: {
        desc: "Compact studio ideal for students and working professionals, walking distance to campus and cafes.",
        utilities: "Tenant pays utilities",
        pet: "Pets not allowed",
        income: "3x the rent",
        size: 400,
        school: 1,
        bus: 1,
        restaurant: 2,
      },
    },
    {
      title: "Residential Plot in New Town",
      price: 3200000,
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206",
      ],
      address: "Action Area II, New Town",
      city: "Kolkata",
      bedroom: 0,
      bathroom: 0,
      latitude: "22.580696",
      longitude: "88.463190",
      type: "buy",
      property: "land",
      userId: arjun.id,
      detail: {
        desc: "Clear-title residential plot in a rapidly developing area, close to IT hubs and the airport.",
        utilities: "N/A",
        pet: "N/A",
        income: "N/A",
        size: 2400,
        school: 4,
        bus: 3,
        restaurant: 3,
      },
    },
    {
      title: "Charming 2BHK in Jubilee Hills",
      price: 6500000,
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      ],
      address: "Road No. 36, Jubilee Hills",
      city: "Hyderabad",
      bedroom: 2,
      bathroom: 2,
      latitude: "17.431900",
      longitude: "78.407600",
      type: "buy",
      property: "apartment",
      userId: ananya.id,
      detail: {
        desc: "Elegant apartment in a prime locality, close to upscale restaurants, malls, and parks.",
        utilities: "Owner responsible",
        pet: "Pets Allowed",
        income: "N/A",
        size: 1150,
        school: 2,
        bus: 2,
        restaurant: 1,
      },
    },
    {
      title: "Modern 1BHK in Indiranagar",
      price: 28000,
      images: [
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      ],
      address: "100 Feet Road, Indiranagar",
      city: "Bangalore",
      bedroom: 1,
      bathroom: 1,
      latitude: "12.971891",
      longitude: "77.641151",
      type: "rent",
      property: "apartment",
      userId: ananya.id,
      detail: {
        desc: "Trendy 1BHK in the heart of Indiranagar, surrounded by cafes, pubs, and boutique stores.",
        utilities: "Tenant pays utilities",
        pet: "Pets Allowed",
        income: "3x the rent",
        size: 650,
        school: 3,
        bus: 1,
        restaurant: 1,
      },
    },
  ];

  const createdPosts = [];
  for (const p of postsData) {
    const { detail, ...postFields } = p;
    const post = await prisma.post.create({ data: postFields });
    await prisma.postDetail.create({
      data: { ...detail, postId: post.id },
    });
    createdPosts.push(post);
  }

  console.log("Creating saved posts...");
  await prisma.savedPost.create({
    data: { userId: priya.id, postId: createdPosts[0].id },
  });
  await prisma.savedPost.create({
    data: { userId: arjun.id, postId: createdPosts[2].id },
  });

  console.log("Creating a chat with messages...");
  const chat = await prisma.chat.create({
    data: {
      userIDs: [rahul.id, priya.id],
      users: { connect: [{ id: rahul.id }, { id: priya.id }] },
      seenBy: [rahul.id],
      lastMessage: "Sounds great, see you then!",
    },
  });

  await prisma.message.create({
    data: {
      text: "Hi, is the Bandra flat still available?",
      userId: priya.id,
      chatId: chat.id,
    },
  });
  await prisma.message.create({
    data: {
      text: "Yes it is! Would you like to schedule a viewing?",
      userId: rahul.id,
      chatId: chat.id,
    },
  });
  await prisma.message.create({
    data: {
      text: "Sounds great, see you then!",
      userId: priya.id,
      chatId: chat.id,
    },
  });

  console.log("Seed complete!");
  console.log(`Users created: ${[rahul, priya, arjun, ananya].length}`);
  console.log(`Posts created: ${createdPosts.length}`);
  console.log('All sample users have password: "password123"');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });