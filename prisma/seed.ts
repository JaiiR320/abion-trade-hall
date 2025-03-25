import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Item = {
  Index: number;
  UniqueName: string;
  LocalizedNames: {
    "EN-US": string;
  } | null;
  LocalizedDescription: {
    "EN-US": string;
  };
};

async function main() {
  const items = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public", "items.json"), "utf-8"),
  ) as Item[];

  await prisma.item.deleteMany();

  for (const [_, item] of items.entries()) {
    // Skip items without proper localization
    if (!item.LocalizedNames || !item.UniqueName) {
      console.log(`Skipping item with missing data:`, item);
      continue;
    }

    try {
      await prisma.item.create({
        data: {
          index: Number(item.Index),
          uniqueName: item.UniqueName,
          displayName: item.LocalizedNames["EN-US"] ?? item.UniqueName,
          icon: `https://render.albiononline.com/v1/item/${item.UniqueName}.png`,
        },
      });
    } catch (error) {
      console.error(`Error creating item ${item.UniqueName}:`, error);
    }
  }

  console.log(`Seeding completed`);
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
