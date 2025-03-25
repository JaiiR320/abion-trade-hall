"use client";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

export function SellOrderForm() {
  const { mutate: createSellOrder } = api.sellOrder.create.useMutation({
    onSuccess: () => {
      // utils.sellOrder.invalidate();
      setItemName("");
      setItemQuantity(0);
      setItemPrice(0);
      setSuccess(true);
    },
  });

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  return (
    <>
      {success && <div className="alert alert-success">Success</div>}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Create a Sell Order</legend>

        <label className="fieldset-label">Item Name</label>
        <input
          type="text"
          className="input"
          placeholder="Adept's Blight Staff"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label className="fieldset-label">Quantity</label>
        <input
          type="number"
          className="input"
          placeholder="10"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(Number(e.target.value))}
        />

        <label className="fieldset-label">Price</label>
        <input
          type="number"
          className="input"
          placeholder="100"
          value={itemPrice}
          onChange={(e) => setItemPrice(Number(e.target.value))}
        />

        <button
          className="btn btn-primary"
          onClick={() =>
            createSellOrder({
              itemName: itemName,
              itemPrice: itemPrice,
              itemQuantity: itemQuantity,
            })
          }
        >
          Create
        </button>
      </fieldset>
    </>
  );
}
