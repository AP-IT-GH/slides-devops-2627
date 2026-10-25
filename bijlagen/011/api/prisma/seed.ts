
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    await prisma.blog.create({
        data: {
            title: "My first blog",
            body: "This is my first blog post",
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
