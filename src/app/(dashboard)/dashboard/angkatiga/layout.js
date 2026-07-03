"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Palette,
  FileText,
  GanttChart,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { pb } from "@/app/lib/pocketbase-dashboard";

const overviewNav = [
  { label: "Overview", href: "/dashboard/angkatiga", icon: LayoutGrid },
  { label: "Problem", href: "/dashboard/angkatiga/problem", icon: AlertCircle },
  // { label: "Solution", href: "/dashboard/solution", icon: Lightbulb },
  // { label: "Progress", href: "/dashboard/progress", icon: TrendingUp },
];

// const zestifyTaskNav = [
//   { label: "Branding Deck", href: "/dashboard/branding-deck", icon: Palette },
//   { label: "Content Plan", href: "/dashboard/content-plan", icon: FileText },
//   {
//     label: "Timeline Progress",
//     href: "/dashboard/timeline-progress",
//     icon: GanttChart,
//   },
// ];

// Satukan semua list nav untuk mempermudah pencarian breadcrumb otomatis
const allNavItems = [...overviewNav];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [namaPengguna, setNamaPengguna] = useState('')

  // MENCARI DETAIL BREADCRUMB SECARA OTOMATIS BERDASARKAN PATHNAME
  const currentNav = allNavItems.find((item) => item.href === pathname);

  // Jika ditemukan pakai datanya, jika tidak ditemukan (misal di halaman /dashboard utama) gunakan fallback
  const currentLabel = currentNav ? currentNav.label : "Dashboard";
  const CurrentIcon = currentNav ? currentNav.icon : Home;

  // close the mobile drawer on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const name =
      pb.authStore.record?.name || pb.authStore.record?.username || "User";
    setNamaPengguna(name);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#0a0a0c]">
      {/* ===== Mobile top bar — transparent, icon only ===== */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-end px-4 lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center text-white/70 transition hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* ===== Mobile overlay ===== */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-white/[0.06] bg-[#0e0e10] px-3 py-4 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-1">
          <h1 className="text-sm font-semibold leading-snug tracking-tight text-white">
            Zestify x Angkatiga
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.05] hover:text-white/70 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Overview nav */}
        <nav className="mt-5 space-y-0.5">
          {overviewNav.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Section divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/30">
            Zestify Task
          </span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        {/* Zestify Task nav */}
        {/* <nav className="space-y-0.5">
          {zestifyTaskNav.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav> */}

        <div className="flex-1" />

        {/* Logout */}
        <div className="border-t border-white/[0.06] pt-3">
          <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-white/50 transition hover:bg-white/[0.05] hover:text-red-300">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Content area ===== */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <div className="relative min-h-full">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#7c8cfa]/10 blur-[140px]"
          />
          <div className="relative mx-auto max-w-[1400px] px-6 py-8 sm:px-10">
            {/* BREADCRUMB OTOMATIS */}
            <div className="flex items-center gap-2 text-sm text-white/40">
              <CurrentIcon className="h-4 w-4" />
              <span>{currentLabel}</span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              {currentLabel === "Overview"
                ? `Selamat Datang ${namaPengguna || "..."}`
                : currentLabel}
            </h1>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ item, pathname }) {
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
        isActive
          ? "bg-white/[0.08] text-white"
          : "text-white/50 hover:bg-white/[0.05] hover:text-white/80"
      }`}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}
