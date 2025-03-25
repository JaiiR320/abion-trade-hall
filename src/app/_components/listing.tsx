import type { SellOrder } from "@prisma/client";

export function Listing({ sellOrder }: { sellOrder: SellOrder }) {
  return (
    <li className="list-row items-center">
      <img src={`https://render.albiononline.com/v1/item/${sellOrder.itemName}.png`} alt={sellOrder.itemName} className="w-15 h-15" />
      <div className="card-title">{sellOrder.itemDisplayName}</div>
      <div className="card-title">{`${sellOrder.itemQuantity}`}</div>
      <div className="card-title">{`\$${sellOrder.itemPrice.toLocaleString()}`}</div>
      <div className="btn btn-primary">Message</div>
    </li>
  );
}
