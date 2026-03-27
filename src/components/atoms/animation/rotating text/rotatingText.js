"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";

import '@/app/css/rotatingText.css';

// Utility function untuk menggabungkan class nam es
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts = [],
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    onComplete,
    onStart,
    mainClassName = "",
    splitLevelClassName = "",
    elementLevelClassName = "",
    pauseOnHover = false,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);



  // Fungsi untuk memisahkan text menjadi karakter dengan dukungan emoji
  const splitIntoCharacters = useCallback((text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  }, []);

  // Memproses text berdasarkan splitBy option
  const elements = useMemo(() => {
    if (!texts[currentTextIndex]) return [];
    
    const currentText = texts[currentTextIndex];
    
    switch (splitBy) {
      case "characters": {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      case "words": {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      case "lines": {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }
      default: {
        return currentText.split(splitBy).map((part, i, arr) => ({
          characters: [part],
          needsSpace: i !== arr.length - 1,
        }));
      }
    }
  }, [texts, currentTextIndex, splitBy, splitIntoCharacters]);

  // Menghitung delay untuk staggered animation
  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      switch (staggerFrom) {
        case "first":
          return index * staggerDuration;
        case "last":
          return (total - 1 - index) * staggerDuration;
        case "center":
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        case "random":
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        default:
          return Math.abs(staggerFrom - index) * staggerDuration;
      }
    },
    [staggerFrom, staggerDuration]
  );

  // Handler untuk perubahan index
  const handleIndexChange = useCallback(
    (newIndex) => {
      if (newIndex !== currentTextIndex) {
        setIsAnimating(true);
        setCurrentTextIndex(newIndex);
        
        if (onNext) onNext(newIndex);
        if (onStart) onStart(newIndex);
        
        // Reset animating state setelah animasi selesai
        setTimeout(() => {
          setIsAnimating(false);
          if (onComplete) onComplete(newIndex);
        }, 500); // Adjust based on your transition duration
      }
    },
    [currentTextIndex, onNext, onStart, onComplete]
  );

  // Navigation functions
  const next = useCallback(() => {
    if (isAnimating) return;
    
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
        
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange, isAnimating]);

  const previous = useCallback(() => {
    if (isAnimating) return;
    
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
        
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange, isAnimating]);

  const jumpTo = useCallback(
    (index) => {
      if (isAnimating) return;
      
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange, isAnimating]
  );

  const reset = useCallback(() => {
    if (isAnimating) return;
    
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange, isAnimating]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Expose methods through ref
  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
      pause,
      resume,
      getCurrentIndex: () => currentTextIndex,
      getTotalTexts: () => texts.length,
      isAnimating,
      isPaused,
    }),
    [next, previous, jumpTo, reset, pause, resume, currentTextIndex, texts.length, isAnimating, isPaused]
  );

  // Auto rotation effect
  useEffect(() => {

      // Validasi texts prop
  if (!Array.isArray(texts) || texts.length === 0) {
    console.warn("RotatingText: texts prop must be a non-empty array");
  }
  
    if (!auto || isPaused || isAnimating) return;
    
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto, isPaused, isAnimating]);

  // Mouse event handlers untuk pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return (
    <motion.span
      className={cn("text-rotate", mainClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
      transition={transition}
      {...rest}
    >
      {/* Screen reader text */}
      <span className="text-rotate-sr-only" aria-live="polite">
        {texts[currentTextIndex]}
      </span>
      
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cn(
            splitBy === "lines" ? "text-rotate-lines" : "text-rotate",
            splitLevelClassName
          )}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
              
            const totalChars = array.reduce(
              (sum, word) => sum + word.characters.length,
              0
            );

            return (
              <span
                key={`word-${wordIndex}`}
                className="text-rotate-word"
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={`char-${charIndex}`}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        totalChars
                      ),
                    }}
                    className={cn("text-rotate-element", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && (
                  <span className="text-rotate-space"> </span>
                )}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;    