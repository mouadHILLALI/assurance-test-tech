"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const { currentUser, switchUser, availableUsers } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-surface-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-display font-bold text-sm shadow-md shadow-brand-600/25 group-hover:shadow-lg group-hover:shadow-brand-600/30 transition-shadow">
            FA
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold text-surface-800 leading-tight">
              Fiches Assurance
            </p>
            <p className="text-[11px] text-surface-400 font-medium tracking-wide">
              Gestion des dossiers
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-700"
          >
            Fiches
          </Link>
          <Link
            href="/produits"
            className="rounded-lg px-3 py-2 text-sm font-medium text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-700"
          >
            Produits
          </Link>
        </nav>

        {/* Role Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-surface-400">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase ${
                currentUser.role === "ADMIN"
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-teal-100 text-teal-700 border border-teal-200"
              }`}
            >
              {currentUser.role}
            </span>
          </div>

          <select
            value={currentUser.id}
            onChange={(e) => switchUser(e.target.value)}
            className="rounded-xl border border-surface-200 bg-surface-50 px-3 py-2 text-sm font-medium text-surface-700 outline-none transition-all hover:border-surface-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          >
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.prenom} {u.nom} ({u.role})
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
