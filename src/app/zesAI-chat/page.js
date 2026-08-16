"use client";

import ShinyText from "@/components/animation/shinnytext";
import SideRays from "@/components/animation/siderays";
import Heading from "@/components/atoms/heading";
import Label from "@/components/atoms/labels";
import Paragraph from "@/components/atoms/paragraph";
import { GlassButton } from "@/components/molecules/button/button";
import PopupOverlay from "@/components/organism/popup";
import AIMessage from "@/components/organism/zesAI/typografi_porse";
import { useState, useEffect, useRef, useCallback } from "react";

function SendIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function ZesAI() {
  const [question, setQuestion] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null); // ← ID unik pesan yang sedang di-stream
  const [messages, setMessages] = useState([]);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpened, setIsOpened] = useState(true);

  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const lastScrollPosition = useRef(0);

  const checkScrollPosition = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    lastScrollPosition.current = container.scrollTop;
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", checkScrollPosition);
    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, [checkScrollPosition]);

  useEffect(() => {
    if (shouldAutoScroll) {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && question === "") {
      textarea.style.height = "auto";
    }
  }, [question]);

  const sanitizeInput = (input) => {
    if (!input || typeof input !== "string") return "";
    const maxLength = 5000;
    const sanitized = input.trim();
    return sanitized.length > maxLength
      ? sanitized.substring(0, maxLength)
      : sanitized;
  };

  const sanitizeAIResponse = (content) => {
    if (!content || typeof content !== "string") return "Response tidak valid";
    const maxLength = 20000;
    if (content.length > maxLength) {
      return (
        content.substring(0, maxLength) +
        "\n\n[Response dipotong karena terlalu panjang]"
      );
    }
    return content;
  };

const handleKeyDown = (e) => {
  if (e.nativeEvent.isComposing) return;

  if (e.key !== "Enter") return;

  // Cek apakah user menggunakan perangkat mobile/touch screen
  const isTouchDevice =
    navigator.maxTouchPoints > 0 &&
    window.matchMedia("(pointer: coarse)").matches;

  // JIKA DI MOBILE: biarkan Enter berfungsi sebagai baris baru secara default (jangan submit)
  if (isTouchDevice) return;

  // JIKA DI DESKTOP:
  if (e.shiftKey) {
    // Jika tekan Shift + Enter, biarkan membuat baris baru (default behavior textarea)
    return;
  } else {
    // Jika hanya tekan Enter tanpa Shift, cegah baris baru dan lakukan submit
    e.preventDefault();
    handleSubmit(e);
  }
};

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 24 * 5) + "px";
    }
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const sanitizedQuestion = sanitizeInput(question);
    if (!sanitizedQuestion || isStreaming) return;

    // Reset textarea
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = "auto";
    setQuestion("");

    // Buat ID unik untuk pesan AI yang akan datang
    const newAiMessageId = `ai-${Date.now()}`;

    // Tambah pesan user
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: sanitizedQuestion,
        timestamp: new Date().toISOString(),
      },
    ]);

    // Tambah placeholder AI dengan ID unik — SEBELUM fetch
    setMessages((prev) => [
      ...prev,
      {
        id: newAiMessageId, // ← ID unik, bukan index
        role: "ai",
        content: "",
        timestamp: new Date().toISOString(),
        modelUsed: "",
      },
    ]);

    const newHistory = [
      ...chatHistory,
      { role: "user", content: sanitizedQuestion },
    ];
    setChatHistory(newHistory);

    // Set streaming dengan ID — bukan boolean doang
    setIsStreaming(true);
    setStreamingMessageId(newAiMessageId); // ← simpan ID pesan yang streaming

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const res = await fetch("/api/zesAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Network response was not ok");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let modelUsed = "";
      let aiTimestamp = new Date().toISOString();

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(trimmed.slice(6));

            if (data.type === "metadata") {
              modelUsed = data.modelUsed;
              aiTimestamp = data.timestamp;
            } else if (data.type === "content") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newAiMessageId
                    ? {
                        ...msg,
                        content: sanitizeAIResponse(data.content),
                        modelUsed,
                        timestamp: aiTimestamp,
                      }
                    : msg,
                ),
              );
            } else if (data.type === "complete") {
              setChatHistory((prev) => [
                ...prev,
                { role: "assistant", content: data.content },
              ]);
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newAiMessageId
                    ? {
                        ...msg,
                        content: sanitizeAIResponse(data.content),
                        modelUsed: data.modelUsed,
                        timestamp: data.timestamp,
                      }
                    : msg,
                ),
              );
              setIsStreaming(false);
              setStreamingMessageId(null);
            } else if (data.type === "error") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newAiMessageId
                    ? {
                        ...msg,
                        content:
                          "Terjadi kesalahan dalam memproses permintaan.",
                        timestamp: new Date().toISOString(),
                      }
                    : msg,
                ),
              );
              setIsStreaming(false);
              setStreamingMessageId(null);
            }
          } catch (parseError) {
            console.error("Error parsing stream data:", parseError);
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setIsStreaming(false);
      setStreamingMessageId(null);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newAiMessageId
            ? {
                ...msg,
                content: "Koneksi terputus atau terjadi kesalahan jaringan.",
                timestamp: new Date().toISOString(),
              }
            : msg,
        ),
      );
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <PopupOverlay isOpen={isOpened} onClose={() => setIsOpened(false)}>
        <div className="flex flex-col gap-4 p-2 text-left">
          {/* Judul Utama */}
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            ERA BARU DENGAN AGENTIC AI
          </h3>

          {/* Paragraf Utama - Ketebalan Normal (font-normal) & text-gray-300 agar tidak terlalu mencolok */}
          <p className="text-sm sm:text-base font-normal text-gray-300 leading-relaxed">
            Kami sudah tidak menggunakan form lagi untuk pengajuan dan beralih
            ke <span className="text-white font-medium">AI Native</span> untuk
            memudahkan klien melakukan pengajuan dan pengecekan secara instan.
          </p>

          {/* Pembatas Halus */}
          <div className="h-[1px] w-full bg-white/10 my-1" />

          {/* Bagian List Kemampuan AI */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Yang bisa kamu lakukan:
            </span>

            <ul className="flex flex-col gap-2.5">
              {/* List 1: AI Pengecekan */}
              <li className="flex items-start gap-3 text-sm sm:text-base text-gray-200 font-normal">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-[10px]">
                  ✦
                </span>
                <span>
                  <strong className="text-white font-medium">
                    AI Pengecekan:
                  </strong>{" "}
                  Cek apakah data kamu sudah terdaftar di sistem atau belum
                  secara *real-time*.
                </span>
              </li>

              {/* List 2: Pengajuan Konsultasi */}
              <li className="flex items-start gap-3 text-sm sm:text-base text-gray-200 font-normal">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-[10px]">
                  ✦
                </span>
                <span>
                  <strong className="text-white font-medium">
                    Pengajuan Konsultasi:
                  </strong>{" "}
                  Jadwalkan diskusi dan konsultasi langsung via asisten pintar
                  kami.
                </span>
              </li>
            </ul>
          </div>

          {/* Tombol Aksi Tambahan di Bawah Popup */}
        </div>
      </PopupOverlay>

      {messages.length === 0 && !isStreaming && (
        <div className="absolute inset-0 pointer-events-none z-1">
          <SideRays
            speed={2.5}
            rayColor1="#ffffff"
            rayColor2="#98a6ff"
            intensity={2}
            spread={2}
            origin="bottom-right"
            opacity={1}
            falloff={1.6}
          />
        </div>
      )}

      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 20% 30%, rgba(12,12,12,0) 0%, rgba(12,12,12,0.6) 100%)",
        }}
      />

      <header className="fixed top-8 left-8 z-50">
        <GlassButton onClick={() => window.history.back()} />
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 lg:px-42 min-h-screen gap-10">
        {messages.length > 0 && (
          <div
            ref={messagesContainerRef}
            className="scrollbar-hidden scrollbar-hide w-full lg:px-35 h-[60vh] overflow-y-auto mb-4 p-4 flex flex-col gap-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id} // ← pakai ID bukan index sebagai key
                className={`flex flex-col text-white ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {msg.role === "ai" ? (
                  <AIMessage
                    content={msg.content}
                    model={msg.modelUsed}
                    // ← cukup bandingkan ID pesan, bukan index array
                    isLoading={msg.id === streamingMessageId}
                  />
                ) : (
                  <div className="chat chat-end">
                    <div className="chat-bubble bg-white text-black">
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {messages.length === 0 && !isStreaming && (
          <>
            <Label variant="glass">zesAI Asisten Digital</Label>
            <div>
              <Heading level={1} className="text-center">
                Selamat Datang!
              </Heading>
              <Paragraph className="text-center">
                Saya zesAI siap melayani anda, Silahkan tanyakan saja pada saya!
              </Paragraph>
            </div>
          </>
        )}

        <div className="w-full max-w-[680px] mx-auto">
          <form onSubmit={handleSubmit}>
            <div
              className={`
        flex items-end gap-2
        bg-white/5
        backdrop-blur-xl
        border border-white/15
        shadow-[0_0_20px_rgba(0,0,0,.15)]
        transition-all duration-200
        ${
          question.split("\n").length > 1 || question.length > 10
            ? "rounded-3xl"
            : "rounded-full"
        }
      `}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={question}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Mulai bertanya..."
                disabled={isStreaming}
                className="
          flex-1
          bg-transparent
          text-white
          placeholder:text-gray-500
          resize-none
          outline-none
          px-6
          py-4
          leading-6
          max-h-40
          overflow-y-auto
        "
              />

              <button
                type="submit"
                disabled={isStreaming || !question.trim()}
                className="
          mb-2
          mr-2
          h-11
          w-11
          shrink-0
          rounded-full
          flex
          items-center
          justify-center
          bg-white
          text-black
          transition
          hover:scale-105
          active:scale-95
          disabled:opacity-40
        "
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-2 pointer-events-none">
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          AI Implemented by
        </span>
        <span
          className="text-sm font-semibold"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Zestify
        </span>
      </footer>
    </section>
  );
}
