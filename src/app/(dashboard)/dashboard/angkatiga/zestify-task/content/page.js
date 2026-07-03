"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Eye,
  Calendar,
  Radio,
  Flag,
  UserRound,
} from "lucide-react";
import CenterModal from "@/components/molecules/modals/centeredmodal";
import SideDetailPanel from "@/components/molecules/modals/sidemodal";


const STATUS_OPTIONS = ["Draft", "In review", "Scheduled", "Published"];
const PLATFORM_OPTIONS = ["Instagram", "TikTok", "YouTube", "LinkedIn", "X"];

const STATUS_STYLES = {
  Draft: "bg-white/[0.06] text-white/50",
  "In review": "bg-[#F5C445]/15 text-[#F5C445]",
  Scheduled: "bg-[#7c8cfa]/15 text-[#a3b0ff]",
  Published: "bg-emerald-500/15 text-emerald-300",
};

let nextId = 1;
const emptyDraft = () => ({
  title: "",
  platform: PLATFORM_OPTIONS[0],
  status: "Draft",
  date: "",
  assignee: "",
  notes: "",
});

export default function ContentPlanPage() {
  // Empty on purpose — wire this up to your DB fetch (useEffect + API call, SWR, etc.)
  const [rows, setRows] = useState([]);

  // ----- Add modal (centered) -----
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addDraft, setAddDraft] = useState(emptyDraft());

  function openAddModal() {
    setAddDraft(emptyDraft());
    setIsAddOpen(true);
  }

  function closeAddModal() {
    setIsAddOpen(false);
  }

  function submitAdd() {
    // TODO: call your create API here, then use the returned record instead of a local id
    setRows((prev) => [...prev, { id: nextId++, ...addDraft }]);
    setIsAddOpen(false);
  }

  // ----- Detail panel (side, Notion-style) -----
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailDraft, setDetailDraft] = useState(null);

  function openDetail(row) {
    setDetailDraft({ ...row });
    setIsDetailOpen(true);
  }

  function closeDetail() {
    setIsDetailOpen(false);
  }

  function updateDetailField(field, value) {
    setDetailDraft((prev) => ({ ...prev, [field]: value }));
  }

  function saveDetail() {
    // TODO: call your update API here
    setRows((prev) =>
      prev.map((row) => (row.id === detailDraft.id ? { ...detailDraft } : row))
    );
    setIsDetailOpen(false);
  }

  function deleteRow(id) {
    // TODO: call your delete API here
    setRows((prev) => prev.filter((row) => row.id !== id));
    if (detailDraft?.id === id) setIsDetailOpen(false);
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-white/40">
        <FileText className="h-4 w-4" />
        Content Plan
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Content Plan
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Manage upcoming content across platforms.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 self-start rounded-lg bg-[#7c8cfa] px-4 py-2.5 text-sm font-medium text-[#0a0a0c] shadow-[0_0_20px_rgba(124,140,250,0.25)] transition hover:bg-[#8f9dfb] sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add content
        </button>
      </div>

      {/* ===== Desktop / tablet table ===== */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left text-xs uppercase tracking-wide text-white/35">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-3 py-3 font-medium">Platform</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Due date</th>
              <th className="px-3 py-3 font-medium">Assignee</th>
              <th className="w-20 px-3 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="group cursor-pointer border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]"
                onClick={() => openDetail(row)}
              >
                <td className="px-4 py-2.5 text-white">
                  {row.title || <span className="text-white/25">Untitled content</span>}
                </td>
                <td className="px-3 py-2.5 text-white/70">{row.platform}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-white/70">{formatDate(row.date)}</td>
                <td className="px-3 py-2.5 text-white/70">
                  {row.assignee || <span className="text-white/25">Unassigned</span>}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <ActionButton
                      label="View"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetail(row);
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </ActionButton>
                    <ActionButton
                      label="Delete"
                      tone="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRow(row.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-14 text-center text-sm text-white/30">
                  No content yet — click "Add content" to create your first row.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile card list ===== */}
      <div className="mt-6 space-y-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            onClick={() => openDetail(row)}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-base font-medium text-white">
                {row.title || <span className="text-white/25">Untitled content</span>}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <ActionButton
                  label="View"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetail(row);
                  }}
                >
                  <Eye className="h-3.5 w-3.5" />
                </ActionButton>
                <ActionButton
                  label="Delete"
                  tone="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteRow(row.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </ActionButton>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Field label="Platform">
                <span className="text-white/70">{row.platform}</span>
              </Field>
              <Field label="Status">
                <span
                  className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status]}`}
                >
                  {row.status}
                </span>
              </Field>
              <Field label="Due date">
                <span className="text-white/70">{formatDate(row.date)}</span>
              </Field>
              <Field label="Assignee">
                <span className="text-white/70">
                  {row.assignee || <span className="text-white/25">Unassigned</span>}
                </span>
              </Field>
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-14 text-center text-sm text-white/30">
            No content yet — tap "Add content" to create your first row.
          </div>
        )}
      </div>

      {/* ===== Modal 1: Add content (centered) ===== */}
      <CenterModal
        isOpen={isAddOpen}
        onClose={closeAddModal}
        title="Add content"
        footer={
          <>
            <button
              onClick={closeAddModal}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white/90"
            >
              Cancel
            </button>
            <button
              onClick={submitAdd}
              className="rounded-lg bg-[#7c8cfa] px-4 py-2 text-sm font-medium text-[#0a0a0c] transition hover:bg-[#8f9dfb]"
            >
              Add content
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Title">
            <input
              type="text"
              autoFocus
              value={addDraft.title}
              onChange={(e) =>
                setAddDraft((d) => ({ ...d, title: e.target.value }))
              }
              placeholder="e.g. Behind the scenes reel"
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Platform">
              <select
                value={addDraft.platform}
                onChange={(e) =>
                  setAddDraft((d) => ({ ...d, platform: e.target.value }))
                }
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
              >
                {PLATFORM_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#121214]">
                    {opt}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Status">
              <select
                value={addDraft.status}
                onChange={(e) =>
                  setAddDraft((d) => ({ ...d, status: e.target.value }))
                }
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#121214]">
                    {opt}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Due date">
              <input
                type="date"
                value={addDraft.date}
                onChange={(e) =>
                  setAddDraft((d) => ({ ...d, date: e.target.value }))
                }
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20 [color-scheme:dark]"
              />
            </FormField>

            <FormField label="Assignee">
              <input
                type="text"
                value={addDraft.assignee}
                onChange={(e) =>
                  setAddDraft((d) => ({ ...d, assignee: e.target.value }))
                }
                placeholder="Name"
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
              />
            </FormField>
          </div>
        </div>
      </CenterModal>

      {/* ===== Modal 2: Detail (side panel, Notion-style) ===== */}
      {detailDraft && (
        <SideDetailPanel
          isOpen={isDetailOpen}
          onClose={closeDetail}
          subtitle="Content Plan"
          title={detailDraft.title || "Untitled content"}
          footer={
            <>
              <button
                onClick={() => deleteRow(detailDraft.id)}
                className="mr-auto flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-300/80 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
              <button
                onClick={closeDetail}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white/90"
              >
                Cancel
              </button>
              <button
                onClick={saveDetail}
                className="rounded-lg bg-[#7c8cfa] px-4 py-2 text-sm font-medium text-[#0a0a0c] transition hover:bg-[#8f9dfb]"
              >
                Save changes
              </button>
            </>
          }
        >
          <div className="space-y-5">
            <FormField label="Title">
              <input
                type="text"
                value={detailDraft.title}
                onChange={(e) => updateDetailField("title", e.target.value)}
                placeholder="Untitled content"
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-base font-medium text-white placeholder:text-white/25 outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
              />
            </FormField>

            <div className="space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <PropertyRow icon={Radio} label="Platform">
                <select
                  value={detailDraft.platform}
                  onChange={(e) => updateDetailField("platform", e.target.value)}
                  className="w-full rounded-md bg-transparent px-1.5 py-1 text-sm text-white outline-none transition hover:bg-white/[0.05] focus:bg-white/[0.05]"
                >
                  {PLATFORM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#121214]">
                      {opt}
                    </option>
                  ))}
                </select>
              </PropertyRow>

              <PropertyRow icon={Flag} label="Status">
                <select
                  value={detailDraft.status}
                  onChange={(e) => updateDetailField("status", e.target.value)}
                  className={`rounded-md px-2 py-0.5 text-xs font-medium outline-none transition ${STATUS_STYLES[detailDraft.status]}`}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#121214] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </PropertyRow>

              <PropertyRow icon={Calendar} label="Due date">
                <input
                  type="date"
                  value={detailDraft.date}
                  onChange={(e) => updateDetailField("date", e.target.value)}
                  className="w-full rounded-md bg-transparent px-1.5 py-1 text-sm text-white outline-none transition hover:bg-white/[0.05] focus:bg-white/[0.05] [color-scheme:dark]"
                />
              </PropertyRow>

              <PropertyRow icon={UserRound} label="Assignee">
                <input
                  type="text"
                  value={detailDraft.assignee}
                  onChange={(e) => updateDetailField("assignee", e.target.value)}
                  placeholder="Unassigned"
                  className="w-full rounded-md bg-transparent px-1.5 py-1 text-sm text-white placeholder:text-white/25 outline-none transition hover:bg-white/[0.05] focus:bg-white/[0.05]"
                />
              </PropertyRow>
            </div>

            <FormField label="Notes">
              <textarea
                value={detailDraft.notes}
                onChange={(e) => updateDetailField("notes", e.target.value)}
                placeholder="Add brief, references, or context for this content…"
                rows={6}
                className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-sm leading-relaxed text-white placeholder:text-white/25 outline-none transition focus:border-[#7c8cfa]/50 focus:ring-2 focus:ring-[#7c8cfa]/20"
              />
            </FormField>
          </div>
        </SideDetailPanel>
      )}
    </div>
  );
}

function formatDate(value) {
  if (!value) return <span className="text-white/25">No date</span>;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Field({ label, children }) {
  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-wide text-white/30">
        {label}
      </p>
      {children}
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

function PropertyRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex w-28 shrink-0 items-center gap-2 text-xs text-white/40">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
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