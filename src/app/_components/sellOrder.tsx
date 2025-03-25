"use client"
import { api } from "@/trpc/react";
import { Listing } from "./listing";
import { useState } from "react";

export function SellOrder() {
  const { data: sellOrders } = api.sellOrder.get.useQuery();
  const [search, setSearch] = useState("");

  const filteredSellOrders = sellOrders?.filter((sellOrder) => {
    return sellOrder.itemDisplayName.toLowerCase().includes(search.toLowerCase())
  });
  
  return (
    <div className="flex w-4xl flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Sell Orders</h1>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-full max-w-xs" placeholder="Search" />
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="list-row">
          <div></div>
          <div>Item</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Message</div>
        </li>
        {filteredSellOrders?.map((sellOrder) => (
          <Listing key={sellOrder.id} sellOrder={sellOrder} />
        ))}
      </ul>
    </div>
  );
}