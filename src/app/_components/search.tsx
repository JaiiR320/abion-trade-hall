"use client";
import { api } from "@/trpc/react";
import { Listing } from "./listing";
import { useState } from "react";

export function SearchPage() {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState<string>("any");
  const [enchant, setEnchant] = useState<string>("any");
  const { data, isLoading } = api.sellOrder.getFuzzy.useQuery({
    search: search,
    tier: tier,
    enchant: enchant,
  });
  return (
    <div className="w-4xl">
      <div
        id="search-header"
        className="mb-2 flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold">Sell Orders</h1>
        <div className="flex items-center gap-2">
          Tier
          <Dropdown
            options={["any", "4", "5", "6", "7", "8"]}
            value={tier}
            onChange={setTier}
          />
          Enchantment
          <Dropdown
            options={["any", "0", "1", "2", "3", "4"]}
            value={enchant}
            onChange={setEnchant}
          />
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="list-row">
          <div></div>
          <div>Item</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Message</div>
        </li>
        {isLoading ? (
          <li className="list-row">
            <div>Loading...</div>
          </li>
        ) : (
          data?.map((sellOrder) => (
            <Listing key={sellOrder.id} sellOrder={sellOrder} />
          ))
        )}
      </ul>
    </div>
  );
}

function Dropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="dropdown dropdown-center">
      <div tabIndex={0} role="button" className="btn bg-base-100 m-1">
        {value}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-neutral rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {options.map((option) => (
          <li
            key={option}
            value={option}
            className="hover:bg-secondary text-primary-content"
          >
            <a onClick={() => onChange(option)}>{option}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
