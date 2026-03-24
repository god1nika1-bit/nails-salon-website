"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

export interface CartService {
  categoryId: string;
  name: string;
  price: string;
}

const STORAGE_KEY = "likenails_cart";

// Simple pub/sub for cross-component reactivity
const listeners = new Set<() => void>();
function emitChange() {
  listeners.forEach((l) => l());
}

function getSnapshot(): CartService[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getServerSnapshot(): CartService[] {
  return [];
}

function setCart(services: CartService[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  emitChange();
}

export function useServiceCart() {
  const subscribe = useCallback((callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  }, []);

  const services = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addService = useCallback((service: CartService) => {
    const current = getSnapshot();
    if (current.some((s) => s.name === service.name)) return;
    setCart([...current, service]);
  }, []);

  const removeService = useCallback((name: string) => {
    const current = getSnapshot();
    setCart(current.filter((s) => s.name !== name));
  }, []);

  const toggleService = useCallback((service: CartService) => {
    const current = getSnapshot();
    if (current.some((s) => s.name === service.name)) {
      setCart(current.filter((s) => s.name !== service.name));
    } else {
      setCart([...current, service]);
    }
  }, []);

  const isInCart = useCallback((name: string) => {
    return services.some((s) => s.name === name);
  }, [services]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return { services, addService, removeService, toggleService, isInCart, clearCart };
}
