"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Eye, X } from "lucide-react";
import CenterModal from "@/components/molecules/modals/centeredmodal";
import { BlueButton, SubmitButton } from "@/components/molecules/button/button";
import { pb } from "@/app/lib/pocketbase-dashboard";

const PRIORITY_OPTIONS = ["low", "medium", "high"];
const STATUS_OPTIONS = ["open", "in_progress", "resolved"];

const PRIORITY_STYLES = {
  low: "bg-white/[0.06] text-white/50",
  medium: "bg-[#F5C445]/15 text-[#F5C445]",
  high: "bg-red-500/15 text-red-300",
};

const STATUS_STYLES = {
  open: "bg-[#7c8cfa]/15 text-[#a3b0ff]",
  in_progress: "bg-[#F5C445]/15 text-[#F5C445]",
  resolved: "bg-emerald-500/15 text-emerald-300",
};

const emptyForm = () => ({
  problem: "",
  detail: "",
  priority: "low",
  status: "open",
});

export default function ContentPlanPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());

  // ----- Side detail panel state -----
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailRow, setDetailRow] = useState(null);

  // ----- Fetch data from PocketBase on mount -----
  useEffect(() => {
    fetchRows();
  }, []);

  async function fetchRows() {
    try {
      setFetching(true);
      const records = await pb.collection("zxa_problem").getFullList({
        sort: "-created",
        requestKey: null,
      });
      setRows(records);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      alert(error.message || "Terjadi kesalahan saat mengambil data.");
    } finally {
      setFetching(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function openAddModal() {
    setModalMode("add");
    setEditingId(null);
    setForm(emptyForm());
    setIsModalOpen(true);
  }

  function openEditModal(row) {
    setModalMode("edit");
    setEditingId(row.id);
    setForm({
      problem: row.problem,
      detail: row.detail,
      priority: row.priority,
      status: row.status,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openDetailPanel(row) {
    setDetailRow(row);
    setIsDetailOpen(true);
  }

  function closeDetailPanel() {
    setIsDetailOpen(false);
    // Delay clearing the row slightly so the closing animation doesn't
    // flash empty content — optional, but keeps it feeling smooth.
    setTimeout(() => setDetailRow(null), 200);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      if (modalMode === "add") {
        await pb.collection("zxa_problem").create(form);
      } else {
        await pb.collection("zxa_problem").update(editingId, form);
      }

      // Refetch instead of manually pushing into state, so the table
      // always reflects what's actually in the DB.
      await fetchRows();

      setForm(emptyForm());
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert(error.message || "Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  }

  async function removeRow(id) {
    if (!confirm("Hapus data ini?")) return;
    try {
      await pb.collection("zxa_problem").delete(id);
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert(error.message || "Terjadi kesalahan saat menghapus data.");
    }
  }

  return (
    <div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
        <BlueButton
          onClick={openAddModal}
          className="flex justify-center items-center gap-3"
        >
          <Plus className="h-4 w-4" />
          Tambah Data
        </BlueButton>
      </div>

      {/* ===== Table (all breakpoints) — scrolls horizontally on small screens instead of stacking into cards ===== */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-left text-xs uppercase tracking-wide text-white/35">
                <th className="px-4 py-3 font-medium">Problem</th>
                <th className="px-3 py-3 font-medium">Detail</th>
                <th className="px-3 py-3 font-medium">Priority</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="w-20 px-3 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {fetching && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-14 text-center text-sm text-white/30"
                  >
                    Memuat data...
                  </td>
                </tr>
              )}

              {!fetching &&
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="group border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-2.5 text-white whitespace-nowrap">
                      {row.problem || (
                        <span className="text-white/25">Untitled</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-white/70 max-w-[240px] truncate">
                      {row.detail || <span className="text-white/25">—</span>}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${PRIORITY_STYLES[row.priority]}`}
                      >
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[row.status]}`}
                      >
                        {row.status?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        <ActionButton
                          label="Detail"
                          onClick={() => openDetailPanel(row)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </ActionButton>
                        <ActionButton
                          label="Edit"
                          onClick={() => openEditModal(row)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </ActionButton>
                        <ActionButton
                          label="Delete"
                          tone="destructive"
                          onClick={() => removeRow(row.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}

              {!fetching && rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-14 text-center text-sm text-white/30"
                  >
                    Belum ada data — klik "Tambah Data" untuk membuat baris
                    pertama.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Modal: Add / Edit ===== */}
      <CenterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalMode === "add" ? "Add content" : "Edit content"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Problem">
            <input
              type="text"
              name="problem"
              autoFocus
              value={form.problem}
              onChange={handleChange}
              placeholder="e.g. Behind the scenes reel"
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
            />
          </FormField>

          <FormField label="Detail">
            <textarea
              name="detail"
              value={form.detail}
              onChange={handleChange}
              placeholder="e.g. Behind the scenes reel"
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
            />
          </FormField>

          <FormField label="Priority">
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/[0.08] bg-[#121214] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20 appearance-none cursor-pointer"
            >
              {PRIORITY_OPTIONS.map((opt) => (
                <option
                  key={opt}
                  value={opt}
                  className="bg-[#121214] text-white capitalize"
                >
                  {opt}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Status">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/[0.08] bg-[#121214] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20 appearance-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option
                  key={opt}
                  value={opt}
                  className="bg-[#121214] text-white capitalize"
                >
                  {opt.replace("_", " ")}
                </option>
              ))}
            </select>
          </FormField>

          <SubmitButton disabled={loading}>
            {loading
              ? "Menyimpan..."
              : modalMode === "add"
                ? "Tambah"
                : "Simpan"}
          </SubmitButton>
        </form>
      </CenterModal>

      {/* ===== Side panel: view detail ===== */}
      <SideDetailPanel
        isOpen={isDetailOpen}
        onClose={closeDetailPanel}
        row={detailRow}
      >
        {detailRow && (
          /* flex flex-col h-full membagi area antara konten atas dan tombol bawah */
          <div className="flex h-full flex-col justify-between space-y-6">
            {/* Konten Atas: otomatis scrollable jika teks terlalu panjang */}
            <div className="flex-1 space-y-5 overflow-y-auto pr-1">
              <DetailField label="Problem">
                <p className="text-base font-medium text-white break-words">
                  {detailRow.problem || (
                    <span className="text-white/25">Untitled</span>
                  )}
                </p>
              </DetailField>

              <div className="grid grid-cols-2 gap-4">
                <DetailField label="Priority">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ${PRIORITY_STYLES[detailRow.priority]}`}
                  >
                    {detailRow.priority}
                  </span>
                </DetailField>
                <DetailField label="Status">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[detailRow.status]}`}
                  >
                    {detailRow.status?.replace("_", " ")}
                  </span>
                </DetailField>
              </div>

              <DetailField label="Detail">
                {/* break-words mencegah teks panjang seperti URL merusak layout */}
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70 break-words">
                  {detailRow.detail || <span className="text-white/25">—</span>}
                </p>
              </DetailField>

              {detailRow.created && (
                <DetailField label="Created">
                  <p className="text-sm text-white/50">
                    {new Date(detailRow.created).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </DetailField>
              )}
            </div>

            {/* Footer Tombol: Terkunci di bawah dengan sedikit padding dan border tipis */}
            <div className="pt-4 border-t border-white/5 bg-transparent">
              <BlueButton
                onClick={() => {
                  closeDetailPanel();
                  openEditModal(detailRow);
                }}
                className="flex w-full items-center justify-center gap-2 py-2.5"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </BlueButton>
            </div>
          </div>
        )}
      </SideDetailPanel>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/50">
        {label}
      </label>
      {children}
    </div>
  );
}

function SideDetailPanel({ isOpen, onClose, children }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform border-l border-white/[0.08] bg-[#0c0c0e] shadow-2xl transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Detail</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/[0.06] hover:text-white/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[calc(100%-57px)] overflow-y-auto px-5 py-5">
          {children}
        </div>
      </div>
    </>
  );
}

function DetailField({ label, children }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] uppercase tracking-wide text-white/30">
        {label}
      </p>
      {children}
    </div>
  );
}

function ActionButton({ onClick, label, children, tone = "default" }) {
  const toneClass =
    tone === "destructive"
      ? "hover:bg-red-500/10 hover:text-red-300"
      : "hover:bg-white/[0.06] hover:text-white/80";

  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-lg p-1.5 text-white/40 transition ${toneClass}`}
    >
      {children}
    </button>
  );
}
