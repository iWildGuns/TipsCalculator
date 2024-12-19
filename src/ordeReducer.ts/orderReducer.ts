import { MenuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "addItem"; payload: { item: MenuItem } }
  | { type: "removeItem"; payload: { id: MenuItem["id"] } }
  | { type: "placeOrder" }
  | { type: "addTip"; payload: { value: number } };

export type OrderState = {
  order: OrderItem[];
  tip: number;
};

export const initialState: OrderState = {
  order: [],
  tip: 0,
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  if (action.type === "addItem") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    let order: OrderItem[] = [];
    if (itemExist) {
      order = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      order = [...state.order, newItem];
    }
    return {
      ...state,
      order,
    };
  }

  if (action.type === "removeItem") {
    const order = state.order.filter((item) => item.id !== action.payload.id);
    return {
      ...state,
      order,
    };
  }

  if (action.type === "placeOrder") {
    return {
      ...state,
      order: [],
      tip: 0,
    };
  }

  if (action.type === "addTip") {
    const tip = action.payload.value;
    return {
      ...state,
      tip,
    };
  }

  return state;
};
