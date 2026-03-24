"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Scissors, Image, Star, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const TABS = [
  { href: "/", icon: Home, label: "Главная" },
  { href: "/services", icon: Scissors, label: "Услуги" },
  { href: "/portfolio", icon: Image, label: "Работы" },
  { href: "/reviews", icon: Star, label: "Отзывы" },
  { href: "/booking", icon: CalendarCheck, label: "Запись" },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-[var(--brand-pink)]/20">
      <div className="flex items-center justify-around h-16 px-2">
        {TABS.map((tab) => {
          const isActive = tab.href === "/"
            ? pathname === "/" || pathname === ""
            : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors ${
                isActive
                  ? "text-[var(--brand-pink-dark)]"
                  : "text-[var(--brand-text)]/40 hover:text-[var(--brand-text)]/70"
              }`}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.25 : 1,
                  y: isActive ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`flex items-center justify-center rounded-full ${
                  isActive ? "w-10 h-10 bg-[var(--brand-pink)]/30" : ""
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.5} />
              </motion.div>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  y: isActive ? 2 : 0,
                }}
                className="text-[10px] font-sans tracking-wide"
              >
                {tab.label}
              </motion.span>
              {isActive && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute top-0 w-10 h-0.5 rounded-full bg-[var(--brand-pink-dark)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
