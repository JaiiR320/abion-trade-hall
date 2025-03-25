import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const sellOrderRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const sellOrders = await ctx.db.sellOrder.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return sellOrders;
  }),

  getFuzzy: publicProcedure.input(z.object({
    search: z.string(),
    tier: z.string(),
    enchant: z.string(),
  })).query(async ({ ctx, input }) => {
    const { search, tier, enchant } = input;
    console.log(tier, enchant);

    // Build the where clause conditionally
    const conditions = [];

    // Only add search filter if search string is not empty
    if (search.trim() !== '') {
      conditions.push({
        itemDisplayName: { 
          contains: search, 
          mode: "insensitive" 
        }
      });
    }

    // Only add tier filter if tier is valid and not "any"
    if (tier !== "any") {
      conditions.push({
        itemName: {
          startsWith: `T${tier}_`
        }
      });
    }

    // Only add enchant filter if enchant is valid and not "any"
    if (enchant !== "any") {
      conditions.push({
        itemName: {
          contains: `@${enchant}`
        }
      });
    }

    const sellOrders = await ctx.db.sellOrder.findMany({
      where: conditions.length > 0 ? { AND: conditions as any } : {},
      orderBy: {
        itemPrice: "asc",
      },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
          }
        }
      }
    });

    return sellOrders;
  }),

  create: protectedProcedure.input(z.object({
    itemName: z.string(),
    itemPrice: z.number(),
    itemQuantity: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const { itemName, itemPrice, itemQuantity } = input;
    const item = await ctx.db.item.findUnique({
      where: {
        uniqueName: itemName,
      },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    return ctx.db.sellOrder.create({
      data: {
        itemDisplayName: item.displayName,
        itemName,
        itemPrice,
        itemQuantity,
        userId: ctx.session.user.id,
      },
    });
  }),
});