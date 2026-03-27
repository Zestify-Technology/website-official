import { motion } from 'framer-motion';
import { MessageFormatter } from './AiFormater';

const AIMessage = ({ content, timestamp }) => {
  if (!content) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <span className="text-xs ml-2">Sedang mengetik...</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '100%', overflow: 'visible', wordBreak: 'break-word' }}
    >
      <div className="prose prose-invert max-w-none" style={{ fontSize: '0.875rem', lineHeight: '1.6', overflow: 'visible' }}>
        {MessageFormatter.renderMessageContent(content)}
      </div>
      
      <style jsx>{`
        .prose * {
          font-size: 0.875rem !important;
          line-height: 1.6 !important;
        }

        .prose :where(h1):not(:where([class~="not-prose"] *)) {
          font-size: 1.2rem !important;
        }
        .prose :where(h2):not(:where([class~="not-prose"] *)) {
          font-size: 1.1rem !important;
        }
        .prose :where(h3):not(:where([class~="not-prose"] *)) {
          font-size: 1rem !important;
        }
        .prose :where(h4, h5, h6):not(:where([class~="not-prose"] *)) {
          font-size: 0.9rem !important;
        }

        .prose :where(code):not(:where([class~="not-prose"] *)) {
          background-color: rgba(55, 65, 81, 0.8);
          color: #f3f4f6;
          padding: 0.1rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.8rem !important;
        }
        
        .prose :where(pre):not(:where([class~="not-prose"] *)) {
          background-color: rgba(17, 24, 39, 0.9);
          color: #f3f4f6;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 0.75rem 0;
          font-size: 0.75rem !important;
        }
        
        .prose :where(a):not(:where([class~="not-prose"] *)) {
          color: #60a5fa;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .prose :where(a):hover:not(:where([class~="not-prose"] *)) {
          color: #93c5fd;
          text-decoration: underline;
        }
        
        .prose :where(strong):not(:where([class~="not-prose"] *)) {
          color: #ffffff;
          font-weight: 600;
        }
        
        .prose :where(h1, h2, h3, h4, h5, h6):not(:where([class~="not-prose"] *)) {
          color: #ffffff;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .prose :where(ul, ol):not(:where([class~="not-prose"] *)) {
          padding-left: 1.25rem;
          margin: 0.4rem 0;
        }
        .prose :where(li):not(:where([class~="not-prose"] *)) {
          margin: 0.15rem 0;
        }
        
        .prose :where(blockquote):not(:where([class~="not-prose"] *)) {
          border-left: 3px solid rgba(96, 165, 250, 0.5);
          background-color: rgba(55, 65, 81, 0.3);
          padding: 0.6rem 0.8rem;
          margin: 0.75rem 0;
          border-radius: 0.25rem;
        }
        
        .prose :where(hr):not(:where([class~="not-prose"] *)) {
          border-color: rgba(255, 255, 255, 0.2);
          margin: 1.25rem 0;
        }

        /* Table scroll wrapper already handled in formatter via inline style */
        .prose :where(table):not(:where([class~="not-prose"] *)) {
          border-collapse: collapse;
          width: 100%;
        }
        .prose :where(th):not(:where([class~="not-prose"] *)) {
          background-color: #6366f1;
          font-weight: 600;
          color: #ffffff;
        }
        .prose :where(td):not(:where([class~="not-prose"] *)) {
          background-color: rgba(55, 65, 81, 0.2);
        }
        .prose :where(th, td):not(:where([class~="not-prose"] *)) {
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 10px;
          text-align: left;
        }
      `}</style>
    </motion.div>
  );
};

export default AIMessage;