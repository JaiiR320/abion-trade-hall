import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
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

  create: protectedProcedure.input(z.object({
    itemName: z.string(),
    itemPrice: z.number(),
    itemQuantity: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const { itemName, itemPrice, itemQuantity } = input;

    return ctx.db.sellOrder.create({
      data: {
        itemName,
        itemPrice,
        itemQuantity,
        userId: ctx.session.user.id,
      },
    });
  }),
});