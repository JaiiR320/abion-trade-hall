import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// Define the type for a single condition
type SellOrderWhereCondition = {
  itemDisplayName?: {
    contains: string;
    mode: "insensitive";
  };
  itemName?: {
    startsWith?: string;
    contains?: string;
  };
};

// Define the type for the complete where clause
type SellOrderWhereInput =
  | {
      AND: SellOrderWhereCondition[];
    }
  | Record<string, never>; // empty object type for when no conditions

export const sellOrderRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const sellOrders = await ctx.db.sellOrder.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return sellOrders;
  }),

  getFuzzy: publicProcedure
    .input(
      z.object({
        search: z.string(),
        tier: z.string(),
        enchant: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, tier, enchant } = input;

      const conditions: SellOrderWhereCondition[] = [];

      if (search.trim() !== "") {
        conditions.push({
          itemDisplayName: {
            contains: search,
            mode: "insensitive",
          },
        });
      }

      if (tier !== "any") {
        conditions.push({
          itemName: {
            startsWith: `T${tier}_`,
          },
        });
      }

      if (enchant !== "any") {
        conditions.push({
          itemName: {
            contains: `@${enchant}`,
          },
        });
      }

      const where: SellOrderWhereInput =
        conditions.length > 0 ? { AND: conditions } : {};

      const sellOrders = await ctx.db.sellOrder.findMany({
        where,
        orderBy: {
          itemPrice: "asc",
        },
        take: 10,
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return sellOrders;
    }),

  create: protectedProcedure
    .input(
      z.object({
        itemName: z.string(),
        itemPrice: z.number(),
        itemQuantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
