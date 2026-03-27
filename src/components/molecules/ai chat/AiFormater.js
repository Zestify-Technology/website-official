import DOMPurify from 'dompurify';

export const MessageFormatter = {
  // Utility functions
  escapeHtml: (unsafe) => {
    if (!unsafe || typeof unsafe !== 'string') return '';
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  isValidUrl: (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  },

  validateLength: (text, maxLength = 200) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  },

  // Parsing functions
  parseCodeBlocks: (text) => {
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
    return text.replace(codeBlockRegex, (match, language, code) => {
      const safeLang = MessageFormatter.escapeHtml((language || 'text').substring(0, 20));
      const safeCode = MessageFormatter.escapeHtml(code.trim());
      return `<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${safeLang}">${safeCode}</code></pre>`;
    });
  },

  parseHorizontalRules: (text) => {
    return text.replace(/^\s*---\s*$/gm, '<hr class="my-4 border-t border-gray-600">');
  },

  parseInlineCode: (text) => {
    return text.replace(/`([^`]+)`/g, (match, code) => {
      const safeCode = MessageFormatter.escapeHtml(code);
      return `<code class="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm">${safeCode}</code>`;
    });
  },

  parseHeaders: (text) => {
    if (!text || typeof text !== 'string') return '';

    const lines = text.split('\n');
    const result = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        result.push('');
        return;
      }

      let headerMatch = null;
      let headerLevel = 0;
      let headerText = '';
      let headerClass = '';

      const headerConfigs = [
        { regex: /^#{6}\s+(.+)$/, level: 6, class: 'text-xs font-bold text-white mb-1 mt-2' },
        { regex: /^#{5}\s+(.+)$/, level: 5, class: 'text-sm font-bold text-white mb-1 mt-2' },
        { regex: /^#{4}\s+(.+)$/, level: 4, class: 'text-base font-bold text-white mb-1 mt-2' },
        { regex: /^#{3}\s+(.+)$/, level: 3, class: 'text-lg font-bold text-white mb-2 mt-3' },
        { regex: /^#{2}\s+(.+)$/, level: 2, class: 'text-xl font-bold text-white mb-2 mt-3' },
        { regex: /^#{1}\s+(.+)$/, level: 1, class: 'text-2xl font-bold text-white mb-3 mt-4' },
      ];

      for (const config of headerConfigs) {
        headerMatch = trimmedLine.match(config.regex);
        if (headerMatch) {
          headerLevel = config.level;
          headerClass = config.class;
          break;
        }
      }

      if (headerMatch && headerLevel > 0) {
        headerText = MessageFormatter.validateLength(headerMatch[1].trim(), 200);
        const safeHeaderText = MessageFormatter.escapeHtml(headerText);
        result.push(`<h${headerLevel} class="${headerClass}">${safeHeaderText}</h${headerLevel}>`);
      } else {
        result.push(line);
      }
    });

    return result.join('\n');
  },

  parseTextFormatting: (text) => {
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, (match, content) => {
      const safeContent = MessageFormatter.escapeHtml(content);
      return `<strong class="font-bold text-white">${safeContent}</strong>`;
    });
    
    // Italic
    text = text.replace(/\*(.*?)\*/g, (match, content) => {
      const safeContent = MessageFormatter.escapeHtml(content);
      return `<em class="italic text-gray-300">${safeContent}</em>`;
    });
    
    // Strikethrough
    text = text.replace(/~~(.*?)~~/g, (match, content) => {
      const safeContent = MessageFormatter.escapeHtml(content);
      return `<del class="line-through text-gray-400">${safeContent}</del>`;
    });
    
    return text;
  },

  parseTables: (text) => {
    const lines = text.split('\n');
    const result = [];
    let tableBuffer = [];

    const flushTable = () => {
      if (tableBuffer.length < 2) return;
      const header = tableBuffer[0].split('|').map(c => c.trim()).filter(Boolean);
      const rows = tableBuffer.slice(2).map(row =>
        row.split('|').map(c => c.trim()).filter(Boolean)
      );

      // Scrollable wrapper + indigo header
      let html = `<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%;border-radius:8px;margin:12px 0;display:block;">`;
      html += `<table style="width:max-content;min-width:100%;border-collapse:collapse;font-size:0.78rem;text-align:left;color:#d1d5db;">`;

      html += `<thead><tr>`;
      header.forEach(h => {
        html += `<th style="padding:8px 12px;background:#6366f1;color:#ffffff;font-weight:600;white-space:nowrap;border:1px solid rgba(99,102,241,0.4);">${h}</th>`;
      });
      html += `</tr></thead>`;

      // Body rows
      html += `<tbody>`;
      rows.forEach((r, rowIdx) => {
        const rowBg = rowIdx % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)';
        html += `<tr style="background:${rowBg};">`;
        r.forEach(c => {
          html += `<td style="padding:7px 12px;border:1px solid rgba(255,255,255,0.08);white-space:nowrap;">${c}</td>`;
        });
        html += `</tr>`;
      });
      html += `</tbody></table></div>`;

      result.push(html);
      tableBuffer = [];
    };

    for (const line of lines) {
      if (line.trim().startsWith('|') && line.includes('|')) {
        tableBuffer.push(line);
      } else {
        if (tableBuffer.length) {
          flushTable();
        }
        result.push(line);
      }
    }
    if (tableBuffer.length) flushTable();

    return result.join('\n');
  },

  formatTextWithLinks: (text) => {
    if (!text || typeof text !== 'string') return '';

    let formatted = text;

    // Markdown links
    formatted = formatted.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, label, url) => {
        if (!MessageFormatter.isValidUrl(url) || url.length > 500) {
          return MessageFormatter.escapeHtml(match);
        }
        
        const cleanLabel = MessageFormatter.validateLength(label, 100);
        const safeLabel = MessageFormatter.escapeHtml(cleanLabel);
        const safeUrl = MessageFormatter.escapeHtml(url);
        
        return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${safeLabel}</a>`;
      }
    );

    // Auto-link URLs
    formatted = formatted.replace(
      /(?<!href=["'])(https?:\/\/[^\s<>&"']+[^\s<>&"'.,;!?])/g,
      (url) => {
        if (!MessageFormatter.isValidUrl(url) || url.length > 500) {
          return MessageFormatter.escapeHtml(url);
        }
        
        try {
          const urlObj = new URL(url);
          let displayText = urlObj.hostname + urlObj.pathname;
          displayText = displayText.replace(/\/$/, '');
          displayText = MessageFormatter.validateLength(displayText, 50);
          
          const safeDisplayText = MessageFormatter.escapeHtml(displayText);
          const safeUrl = MessageFormatter.escapeHtml(url);
          
          return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${safeDisplayText}</a>`;
        } catch (_) {
          return MessageFormatter.escapeHtml(url);
        }
      }
    );

    return formatted;
  },

  // Main parsing function
  parseMessageContent: (content) => {
    if (!content || typeof content !== 'string') return '';

    let formatted = content;

    // If AI already sent raw HTML tags (e.g. <strong class="...">) pass them through directly
    // by temporarily protecting them before any escaping steps
    const htmlTagRegex = /<\/?[a-z][^>]*>/gi;
    const htmlPlaceholders = [];
    formatted = formatted.replace(htmlTagRegex, (match) => {
      const idx = htmlPlaceholders.length;
      htmlPlaceholders.push(match);
      return `\x00HTML${idx}\x00`;
    });

    // Apply parsing in order (on clean text, no raw HTML interference)
    formatted = MessageFormatter.parseHorizontalRules(formatted);
    formatted = MessageFormatter.parseTables(formatted);
    formatted = MessageFormatter.parseCodeBlocks(formatted);
    formatted = MessageFormatter.parseInlineCode(formatted);
    formatted = MessageFormatter.parseHeaders(formatted);
    formatted = MessageFormatter.parseTextFormatting(formatted);
    formatted = MessageFormatter.formatTextWithLinks(formatted);
    formatted = formatted.replace(/\n/g, '<br>');

    // Restore protected HTML tags
    formatted = formatted.replace(/\x00HTML(\d+)\x00/g, (_, idx) => htmlPlaceholders[parseInt(idx)]);

    return formatted;
  },

  // Main render function
  renderMessageContent: (content) => {
    if (!content) return null;

    try {
      const parsed = MessageFormatter.parseMessageContent(content);
      const safe = DOMPurify.sanitize(parsed, {
        ALLOWED_TAGS: [
          'h1','h2','h3','h4','h5','h6','p','br','strong','em','del',
          'code','pre','a','ul','ol','li','blockquote','table','thead',
          'tbody','tr','th','td','div','hr'
        ],
        ALLOWED_ATTR: ['class','href','target','rel','style']
      });
      
      return <div dangerouslySetInnerHTML={{ __html: safe }} />;
    } catch (error) {
      console.error('Error rendering message:', error);
      return <div className="text-red-400">Error menampilkan pesan</div>;
    }
  }
};