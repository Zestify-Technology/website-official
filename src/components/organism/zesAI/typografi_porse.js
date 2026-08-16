import { motion } from "framer-motion";
import "@/app/globals.css";
import { MessageFormatter } from "./formater";
import ShinyText from "@/components/animation/shinnytext";

const AIMessage = ({ content, timestamp, model, isLoading }) => {
  const hasContent = content && content.trim() !== "";
  const showThinking = isLoading && !hasContent;
  const showReplying = isLoading && hasContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {showThinking && (
        <div className="text-left py-2 px-4">
          <ShinyText text="AI Sedang Berpikir..." />
        </div>
      )}

      {showReplying && (
        <div className="text-left py-1 px-4 mb-2">
          <ShinyText text="AI Sedang Membalas..." />
        </div>
      )}

      {hasContent && (
        <div
          className="prose prose-sm max-w-none text-gray-100
            prose-p:text-gray-100
            prose-headings:text-white
            prose-headings:font-semibold
            prose-headings:tracking-tight
            prose-strong:text-white
            prose-ol:text-gray-100
            prose-ul:text-gray-100
            prose-li:text-gray-100
            prose-a:text-blue-400
            hover:prose-a:text-blue-300
            prose-code:text-yellow-400
            prose-code:bg-gray-900
            prose-code:px-1
            prose-code:py-0.5
            prose-code:rounded
            prose-pre:bg-gray-900
            prose-pre:border
            prose-pre:border-gray-700
            prose-pre:rounded-lg
            prose-pre:p-4
            prose-blockquote:text-gray-200
            prose-blockquote:border-l-4
            prose-blockquote:border-blue-500
            prose-blockquote:bg-gray-800/50
            prose-blockquote:px-4
            prose-blockquote:py-3
            prose-blockquote:rounded-lg
            prose-blockquote:italic
            prose-table:border-collapse
            prose-table:w-full
            prose-th:text-gray-900
            prose-th:bg-[#f7f7f7]
            prose-th:px-3
            prose-th:py-2
            prose-td:text-gray-100
            prose-td:bg-gray-800/60
            prose-td:px-3
            prose-td:py-2
            prose-td:border
            prose-td:border-gray-700
            prose-tr:even:bg-gray-800/30"
        >
          {MessageFormatter.renderMessageContent(content)}
        </div>
      )}
    </motion.div>
  );
};

export default AIMessage;