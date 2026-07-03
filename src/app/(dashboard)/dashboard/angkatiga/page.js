"use client";
import { useEffect, useState } from "react";
import { LayoutGrid, Loader2 } from "lucide-react";
import { pb } from "@/app/lib/pocketbase-dashboard";

export default function DashboardPage() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProblems() {
      try {
        setIsLoading(true);
        const data = await pb.collection("zxa_problem").getFullList({
          sort: "-created",
          requestKey: null,
        });
        setRecords(data);
      } catch (error) {
        console.error("Gagal mengambil data problem:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProblems();
  }, []);

  const statusCounts = records.reduce((acc, row) => {
    const status = row.status?.toLowerCase() || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const priorityCounts = records.reduce((acc, row) => {
    const priority = row.priority?.toLowerCase() || "unknown";
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  // Mengambil angka dasar (jika undefined, default ke 0)
  const openCount = statusCounts["open"] || 0;
  const resolvedCount = statusCounts["resolved"] || 0;

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center text-white/50">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Memuat data statistik...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 2. Stat Berdasarkan Status */}
      <div><br/>
        <h3 className="text-sm font-medium text-white/40 mb-3 px-1">
          Status Overview
        </h3>
        {/* Diubah menjadi grid-cols-2 atau 5 di desktop agar muat */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Open" value={openCount} />
          <StatCard label="Resolved" value={resolvedCount} />
        </div>
      </div>
    </div>
  );
}

// Menambahkan parameter className opsional agar kartu baru bisa diberi aksen warna pembeda
function StatCard({ label, value, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all hover:border-white/10 ${className}`}
    >
      <p className="text-sm text-white/40 font-medium">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white tracking-tight sm:text-4xl">
        {value}
      </p>
    </div>
  );
}
