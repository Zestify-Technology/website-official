"use client";

import SideRays from "@/components/animation/siderays";
import Heading from "@/components/atoms/heading";
import Label from "@/components/atoms/labels";
import Paragraph from "@/components/atoms/paragraph";
import { GlassButton } from "@/components/molecules/button/button";
import AIMessage from "@/components/organism/zesAI/typografi_porse";
import { useState, useEffect, useRef, useCallback } from "react"; // 1. Ditambahkan useCallback di sini



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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ZesAI() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const topRef = useRef(null);
  const scrollCheckTimeout = useRef(null);
  const isUserScrolling = useRef(false);
  const lastScrollPosition = useRef(0);

  const checkScrollPosition = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;

    // Deteksi arah scroll
    const isScrollingUp = scrollTop < lastScrollPosition.current;

    setIsUserScrolledUp(!isAtBottom && isScrollingUp);
    lastScrollPosition.current = scrollTop;
  }, []);

  const forceScrollToBottom = useCallback(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
    setIsUserScrolledUp(false);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, [checkScrollPosition]);

  // Auto-scroll instant tanpa timeout
  useEffect(() => {
    if (shouldAutoScroll && !isUserScrolling.current) {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight; // Instant scroll tanpa animasi
      }
    }
  }, [messages, shouldAutoScroll]);

  // Bersihkan timeout saat unmount
  useEffect(() => {
    scrollCheckTimeout.current = setTimeout(() => {
      // logika timeout
    }, 1000);

    return () => {
      const timeout = scrollCheckTimeout.current;
      clearTimeout(timeout);
    };
  }, []);

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

    if (sanitized.length > maxLength) {
      return sanitized.substring(0, maxLength);
    }

    return sanitized;
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

  // HANDLE INPUT
  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 24 * 5) + "px";
    }
    setQuestion(e.target.value);
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const sanitizedQuestion = sanitizeInput(question);
    if (!sanitizedQuestion) return;

    const userTimestamp = new Date().toISOString();
    setLoading(true);

    const newMessage = {
      role: "user",
      content: sanitizedQuestion,
      timestamp: userTimestamp,
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }

    setQuestion("");
    setMessages((prev) => [...prev, newMessage]);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("/api/zesAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: sanitizedQuestion }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let aiMessageIndex = -1;
      let aiTimestamp = new Date().toISOString();
      let modelUsed = "";

      // Add initial AI message placeholder
      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            role: "ai",
            content: "",
            timestamp: aiTimestamp,
            modelUsed: "",
          },
        ];
        aiMessageIndex = newMessages.length - 1;
        return newMessages;
      });

      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === "metadata") {
                modelUsed = data.modelUsed;
                aiTimestamp = data.timestamp;
              } else if (data.type === "content") {
                // Update AI message content with streaming text
                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (newMessages[aiMessageIndex]) {
                    newMessages[aiMessageIndex] = {
                      ...newMessages[aiMessageIndex],
                      content: sanitizeAIResponse(data.content),
                      modelUsed: modelUsed,
                      timestamp: aiTimestamp,
                    };
                  }
                  return newMessages;
                });
              } else if (data.type === "complete") {
                // Final update with complete message
                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (newMessages[aiMessageIndex]) {
                    newMessages[aiMessageIndex] = {
                      ...newMessages[aiMessageIndex],
                      content: sanitizeAIResponse(data.content),
                      modelUsed: data.modelUsed,
                      timestamp: data.timestamp,
                    };
                  }
                  return newMessages;
                });
              } else if (data.type === "error") {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (newMessages[aiMessageIndex]) {
                    newMessages[aiMessageIndex] = {
                      ...newMessages[aiMessageIndex],
                      content: "Terjadi kesalahan dalam memproses permintaan.",
                      timestamp: new Date().toISOString(),
                    };
                  }
                  return newMessages;
                });
              }
            } catch (parseError) {
              console.error("Error parsing stream data:", parseError);
            }
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Koneksi terputus atau terjadi kesalahan jaringan.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Animated rays (bottom-right) ── */}

      {messages.length === 0 && !loading && (
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


      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 20% 30%, rgba(12,12,12,0) 0%, rgba(12,12,12,0.6) 100%)",
        }}
      />

      {/* ── Header / Back button ── */}
      <header className="fixed top-8 left-8 z-50">
        <GlassButton onClick={() => window.history.back()} />
      </header>

      {/* ── Main content ── */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 lg:px-42 min-h-screen gap-10">
        {/* 3. Render Daftar Pesan Jika Sudah Ada Chat */}
        {messages.length > 0 && (
          <div
            ref={messagesContainerRef}
            className="scrollbar-hidden scrollbar-hide w-full lg:px-35 h-[60vh] overflow-y-auto mb-4 p-4 flex flex-col gap-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col text-white ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {msg.role === "ai" ? (
                  <AIMessage content={msg.content} model={msg.modelUsed} />
                ) : (
                  <>
                    <div className="chat chat-end">
                      <div className="chat-bubble bg-white text-black">
                        {msg.content}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 3. Logika conditional rendering yang diperbaiki untuk Welcome Screen & Input Bar */}
        {messages.length === 0 && !loading && (
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

        {/* Input bar ditaruh di luar agar tetap muncul saat chat sedang berlangsung */}
        <div
          className="relative w-full transition-all duration-300"
          style={{ maxWidth: "680px" }}
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              boxShadow: "0 0 0 1.5px hsla(0,0%,100%,0.15)",
              borderRadius: "9999px",
              opacity: 1,
            }}
          />

          {/* 4. Form disatukan dengan onSubmit */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center rounded-full overflow-hidden bg-[rgba(255,255,255,0.05)] backdrop-blur-md">
              <textarea
                ref={textareaRef}
                rows={1}
                value={question}
                onChange={handleInput}
                onKeyDown={(e) => {
                  // 5. Diubah menjadi "Enter" (capital E)
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Mulai bertanya...."
                className="z-9999 flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-500 outline-none text-base resize-none"
                style={{ caretColor: "#4a7dff" }}
              />

              {/* 4. Ditambahkan type="submit" */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-12 h-12 mr-1.5 rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #cfcfcf 100%)",
                  boxShadow: "0 0 16px rgba(74,125,255,0.4)",
                  flexShrink: 0,
                }}
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-2 pointer-events-none">
        <span
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.01em" }}
        >
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
