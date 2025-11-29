// frontend/src/lib/cart.js
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "sweet_heaven_cart_v1";

const initialState = {
  items: [], // {id, name, price, image, quantity}
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, quantity } = action.payload;
      const existing = state.items.find((x) => x.id === item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.id === item.id ? { ...x, quantity: x.quantity + quantity } : x
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...item, quantity }],
      };
    }

    case "SET_QUANTITY": {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((x) =>
          x.id === id ? { ...x, quantity } : x
        ),
      };
    }

    case "REMOVE_ITEM": {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((x) => x.id !== id),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

function initCart() {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return initialState;
    return { items: parsed.items };
  } catch (e) {
    console.warn("Failed to read cart from localStorage", e);
    return initialState;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, initCart);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ items: state.items })
        );
      }
    } catch (e) {
      console.warn("Failed to save cart", e);
    }
  }, [state.items]);

  const addItem = (item, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { item, quantity } });

  const setQuantity = (id, quantity) =>
    dispatch({ type: "SET_QUANTITY", payload: { id, quantity } });

  const removeItem = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const clearCart = () => dispatch({ type: "CLEAR" });

  const value = {
    items: state.items,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
