"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "@/app/css/globals.css";

import { useState, useRef, useEffect, useCallback } from "react";
import H1, { H3 } from "@/components/atoms/heading/heading";
import ShinyText from "@/components/atoms/animation/shinnytext/shinnytext";
import AIMessage from "./AImessege";
import { motion } from "framer-motion";
import { ShinyButton, SolidButton } from "@/components/atoms/button/button";
import RotatingText from "@/components/atoms/animation/rotating text/rotatingText";
import Paragraph from "@/components/atoms/paragraph/paragraph";


export default function ChatAI() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const topRef = useRef(null);
  const scrollCheckTimeout = useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const isUserScrolling = useRef(false);

  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
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



    const rotatingTexts = ["Profesional", "Responsif", "Efektif", "Efisiensi"];


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

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 10; // 10px threshold

    setShouldAutoScroll(isAtBottom);
    isUserScrolling.current = !isAtBottom;
  }, []);

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

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 24 * 5) + "px";
    }
    setQuestion(e.target.value);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const res = await fetch("/api/zestifyAI", {
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
    <>
      <div className="flex z-9999 mt-[-65px] py-10 h-[77vh] overflow-hidden scrollbar-hide no-scrollbar flex-col lg:px-4">
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 lg:p-4 scrollbar-hide no-scrollbar"
        >
<div className="flex flex-col justify-start items-start gap-7 translate-y-50">
            {messages.length === 0 && !loading && (
              <>
                <style>{`
                  .hint-chip {
                    display: inline-block;
                    padding: 6px 14px;
                    border-radius: 20px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.55);
                    font-size: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                  }
                  .hint-chip:hover {
                    background: rgba(99,102,241,0.2);
                    border-color: rgba(99,102,241,0.4);
                    color: rgba(255,255,255,0.85);
                  }
                `}</style>

                <div ref={topRef}></div>
                <div className="lg:w-[80%] w-[70%] space-y-3 flex flex-col justify-start items-start">
                  <p style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}>
                    Asisten Digital
                  </p>
                  <H3 align="left">
                    Tanyakan apapun seputar kami, AI akan menjawab pertanyaan mu!
                  </H3>

                  {/* Hint chips */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Apa layanan Zestify?",
                      "Bagaimana cara kerja sistem ini?",
                      "Harga & paket tersedia?",
                    ].map((hint) => (
                      <button
                        key={hint}
                        className="hint-chip"
                        onClick={() => setQuestion(hint)}
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {messages.map((msg, i) => (
            <div
              key={`${msg.timestamp}-${i}`}
              className={`mt-10 w-full px-3 flex flex-col ${
                msg.role === "user" ? "chat chat-end overflow-hidden" : "items-start"
              }`}
            >
              <span className="text-[clamp(0.8rem,1vw,1.4rem)] text-[white] mb-1">
                {msg.role === "user" ? "Anda - " : "Asisten Digital - "}
                <time className="text-white opacity-40">
                  {new Date(msg.timestamp).toLocaleString("id-ID", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </span>

              <div
                className={`text-left text-[clamp(0.9rem,1vw,1rem)] ${
                  msg.role === "user"
                    ? "chat-bubble bg-indigo-500 w-fit text-[#ffffff]"
                    : "w-full"
                }`}
              >
                {msg.role === "ai" ? (
                  <AIMessage content={msg.content} timestamp={msg.timestamp} />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div
              key="loading-indicator"
              className="mt-5 flex flex-col items-start"
            >
              <ShinyText text="AI Sedang Merespon" />
            </div>
          )}
        </div>
        {isUserScrolledUp && (
          <motion.button
            key="scroll-to-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={forceScrollToBottom}
            className="fixed bottom-32 right-8 bg-white text-black p-3 rounded-full shadow-lg z-50 hover:shadow-xl transition-all"
            aria-label="Scroll to bottom"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        )}
      </div>

      <div className="fixed w-[80%] left-[50%] translate-x-[-50%] bottom-10">
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-white rounded-xl flex items-center overflow-hidden">
            <textarea
              ref={textareaRef}
              rows={1}
              value={question}
              onInput={handleInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Tulis Sesuatu"
              maxLength={5000}
              className="flex-1 p-4 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none resize-none text-base min-h-[60px]"
            />

            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="flex items-center justify-center w-12 h-12 m-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}