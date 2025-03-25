import type { SellOrder } from "@prisma/client";
import Image from "next/image";

export function Listing({ sellOrder }: { sellOrder: SellOrder }) {
  return (
    <li className="list-row items-center">
      <Image
        src={`https://render.albiononline.com/v1/item/${sellOrder.itemName}.png`}
        alt={sellOrder.itemName}
        className="h-15 w-15"
      />
      <div className="card-title">{sellOrder.itemDisplayName}</div>
      <div className="card-title">{`${sellOrder.itemQuantity}`}</div>
      <div className="card-title">{`\$${sellOrder.itemPrice.toLocaleString()}`}</div>
      <div className="btn btn-primary">Message</div>
    </li>
  );
}
