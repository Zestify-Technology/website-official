import { motion } from "framer-motion";
import { MessageFormatter } from "./AiFormater";
import "@/app/css/globals.css";

const AIMessage = ({ content, timestamp }) => {
  // Loading state
  if (!content) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>

        <span className="text-xs ml-2 text-gray-400">
          Sedang mengetik...
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Bubble Chat AI */}
    
        
        {/* Content */}
        <div className="prose prose-sm max-w-none
        prose-p:text-white
          prose-headings:font-semibold
          prose-headings:tracking-tight
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
          prose-blockquote:border-l-4
          prose-blockquote:border-blue-500
          prose-blockquote:bg-gray-800/50
          prose-blockquote:px-4
          prose-blockquote:py-3
          prose-blockquote:rounded-lg
          prose-blockquote:italic
          prose-table:border-collapse
          prose-table:w-full
          prose-th:bg-gradient-to-r
          prose-th:from-indigo-600
          prose-th:to-indigo-500
          prose-th:text-white
          prose-th:px-3
          prose-th:py-2
          prose-td:bg-gray-800/60
          prose-td:px-3
          prose-td:py-2
          prose-td:border
          prose-td:border-gray-700
          prose-tr:even:bg-gray-800/30
        ">
          {MessageFormatter.renderMessageContent(content)}
        </div>
    </motion.div>
  );
};

export default AIMessage;