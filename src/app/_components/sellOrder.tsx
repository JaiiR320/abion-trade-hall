"use client"

import { api } from "@/trpc/react";

export function SellOrder() {
  const { data: sellOrders } = api.sellOrder.get.useQuery();

  return (
    <div>
      <h1>Sell Orders</h1>
      <SellOrderForm />
      <ul>
        {sellOrders?.map(sellOrder => (
          <li key={sellOrder.id}>
            <p>{sellOrder.itemName}</p>
            <p>{sellOrder.itemPrice}</p>
            <p>{sellOrder.itemQuantity}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SellOrderForm() {
  const utils = api.useUtils();
  const { mutate: createSellOrder } = api.sellOrder.create.useMutation({
    onSuccess: () => {
      utils.sellOrder.invalidate();
    },
  });

  return (
    <form onSubmit={e => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const itemName = formData.get("itemName");
      const itemPrice = formData.get("itemPrice");
      const itemQuantity = formData.get("itemQuantity");

      if (typeof itemName === "string" && typeof itemPrice === "string" && typeof itemQuantity === "string") {  
        createSellOrder({
          itemName,
          itemPrice: parseInt(itemPrice),
          itemQuantity: parseInt(itemQuantity),
        });
      }
    }}
    >
      <input type="text" placeholder="Item Name" name="itemName" className="w-full rounded-full bg-white/10 px-4 py-2 text-white border border-white" />
      <input type="number" placeholder="Item Price" name="itemPrice" className="w-full rounded-full bg-white/10 px-4 py-2 text-white border border-white" />
      <input type="number" placeholder="Item Quantity" name="itemQuantity" className="w-full rounded-full bg-white/10 px-4 py-2 text-white border border-white" />
      <button type="submit" className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 border border-white">Create</button>
    </form>
  )
}