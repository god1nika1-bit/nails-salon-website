"use client";

import { useState, useEffect, useCallback } from "react";

export interface CartService {
  categoryId: string;
  name: string;
  price: string;
}

const STORAGE_KEY = "likenails_cart";
const CART_EVENT = "likenails_cart_change";

function readCart(): CartService[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartService[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function useServiceCart() {
  const [services, setServices] = useState<CartService[]>([]);

  // Sync from localStorage on mount + listen for cross-component updates
  useEffect(() => {
    setServices(readCart());

    const handleChange = () => setServices(readCart());
    window.addEventListener(CART_EVENT, handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener(CART_EVENT, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  const addService = useCallback((service: CartService) => {
    const current = readCart();
    if (current.some((s) => s.name === service.name)) return;
    writeCart([...current, service]);
  }, []);

  const removeService = useCallback((name: string) => {
    writeCart(readCart().filter((s) => s.name !== name));
  }, []);

  const toggleService = useCallback((service: CartService) => {
    const current = readCart();
    if (current.some((s) => s.name === service.name)) {
      writeCart(current.filter((s) => s.name !== service.name));
    } else {
      writeCart([...current, service]);
    }
  }, []);

  const isInCart = useCallback(
    (name: string) => services.some((s) => s.name === name),
    [services]
  );

  const clearCart = useCallback(() => writeCart([]), []);

  return { services, addService, removeService, toggleService, isInCart, clearCart };
}
