import { useCallback } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../ordeReducer.ts/orderReducer";

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
  dispatch: React.Dispatch<OrderActions>;
};

export default function OrderTotals({
  order,
  tip,
  dispatch,
}: OrderTotalsProps) {
  const subTotalAmount = useCallback(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );
  const tipAmount = useCallback(
    () => subTotalAmount() * tip,
    [subTotalAmount, tip]
  );
  const totalAmount = useCallback(
    () => subTotalAmount() + tipAmount(),
    [subTotalAmount, tipAmount]
  );

  return (
    <>
      <div className="space-y-3">
        <h2 className=" font-black text-2xl">Total & Tips</h2>
        <p>
          Subtotal to pay: {""}
          <span className=" font-bold">{formatCurrency(subTotalAmount())}</span>
        </p>
        <p>
          Tips: {""}
          <span className=" font-bold">{formatCurrency(tipAmount())}</span>
        </p>
        <p>
          Total to Pay: {""}
          <span className=" font-bold">{formatCurrency(totalAmount())}</span>
        </p>
      </div>
      <button
        className=" w-full bg-black p-3 text-white font-bold mt-10 disabled:opacity-10"
        disabled={totalAmount() === 0}
        onClick={() => dispatch({ type: "placeOrder" })}
      >
        Save Order
      </button>
    </>
  );
}
