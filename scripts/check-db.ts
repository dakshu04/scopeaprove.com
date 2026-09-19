import { prisma } from "@/lib/prisma";
import "dotenv/config";



async function main() {
  const userCount = await prisma.user.count();

  console.log("Database connection successful.");
  console.log(`Users currently stored: ${userCount}`);
}

main()
  .catch((error: unknown) => {
    console.error("Database connection failed.");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });