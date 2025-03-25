import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const itemsRouter = createTRPCRouter({
  get: publicProcedure.input(z.object({
    itemName: z.string(),
  })).query(async ({ctx, input}) => {
    const items = await ctx.db.item.findMany({
      where: {
        uniqueName: input.itemName,
      },
    });

    return items;
  }),
  getFuzzy: publicProcedure.input(z.object({
    itemName: z.string(),
    tier: z.string().optional(),
  })).query(async ({ ctx, input }) => {
    if (!input.itemName) return [];
    
    // Using Prisma's built-in search with contains
    const items = await ctx.db.item.findMany({
      where: {
        displayName: {
          contains: input.itemName,
          mode: 'insensitive', // Case-insensitive search
        },
        ...(input.tier && { uniqueName: { contains: input.tier, mode: 'insensitive' } }),
      },
      take: 10, // Limit to 10 results
      orderBy: {
        displayName: 'asc', // Alphabetical order
      },
      select: {
        uniqueName: true,
        displayName: true,
        icon: true,
      },
    });

    return items;
  }),
});

