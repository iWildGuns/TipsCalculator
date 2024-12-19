import type { MenuItem } from "../types";
import { OrderActions } from "../ordeReducer.ts/orderReducer";

type MenuItemProps = {
  item: MenuItem;
  dispatch: React.Dispatch<OrderActions>;
};

export default function MenuItem({ item, dispatch }: MenuItemProps) {
  return (
    <button
      className=" border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
      onClick={() => dispatch({ type: "addItem", payload: { item } })}
    >
      <p>{item.name}</p>
      <p className=" font-black">${item.price}</p>
    </button>
  );
}
