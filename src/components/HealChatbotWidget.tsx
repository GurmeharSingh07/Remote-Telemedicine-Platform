"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface Message {
  id: string;
  sender: "heal" | "user";
  text: string;
  isTyping?: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "heal",
    text: "Hello! I'm HEAL, HealNet's clinical AI assistant. How can I help you today?",
  },
  {
    id: "2",
    sender: "user",
    text: "Can I access patient records from Apollo Delhi?",
  },
  {
    id: "3",
    sender: "heal",
    text: "Yes — if Apollo Delhi is connected to HealNet, you can access authorized records instantly with patient consent. Would you like me to pull up recent visits?",
  },
];

const knowledgeBase = [
  {
    keywords: ["hello", "hi", "hey"],
    response:
      "Hello! I’m HEAL, HealNet’s clinical AI assistant. I can help you check symptoms, access records, or guide you through platform features. How can I support you today?",
  },
  {
    keywords: ["headache", "migraine"],
    response:
      "Headaches may be caused by dehydration, eye strain, stress, or lack of rest. If the pain becomes intense or affects your vision, I recommend consulting a clinician.",
  },
  {
    keywords: ["fever", "temperature", "hot"],
    response:
      "A fever usually means the body is fighting an infection. If the fever lasts more than 72 hours or exceeds 103°F (39.4°C), please seek medical attention.",
  },
  {
    keywords: ["chest pain", "heart", "breathing", "numbness"],
    response:
      "🚨 *Urgent Attention Needed:* These symptoms can indicate a serious condition. Please visit the nearest emergency facility immediately.",
  },
  {
    keywords: ["book", "appointment", "schedule"],
    response:
      "You can book an appointment anytime from the ‘Doctors’ section in HealNet. Let me know if you want guidance.",
  },
  {
    keywords: ["cost", "insurance", "price"],
    response:
      "You can view pricing, plans, and insurance coverage inside the HealNet Services tab. I can guide you there if needed.",
  },
];

const springVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-white border border-[rgba(168,237,223,0.4)] rounded-2xl rounded-tl-sm w-fit">
      <motion.span
        className="w-2 h-2 rounded-full bg-[#A8EDDF]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
      />
      <motion.span
        className="w-2 h-2 rounded-full bg-[#A8EDDF]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
      />
      <motion.span
        className="w-2 h-2 rounded-full bg-[#A8EDDF]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
      />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.isTyping) {
    return <TypingIndicator />;
  }

  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-4 py-3 ${
          isUser
            ? "bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-white rounded-2xl rounded-br-sm"
            : "bg-white border border-[rgba(168,237,223,0.4)] text-[#1A2332] rounded-2xl rounded-tl-sm"
        }`}
      >
        <p className="text-[14px] font-[family-name:var(--font-body)] leading-relaxed">
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default function HealChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const healResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "heal",
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      };
      setMessages((prev) => [...prev, healResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Collapsed State */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 z-[9999] flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F2C4CE] to-[#A8EDDF] shadow-[0_8px_32px_rgba(162,237,223,0.4)] flex items-center justify-center cursor-pointer"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </motion.button>
            <span className="text-[11px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
              Ask HEAL
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 z-[9999] w-[380px] h-[520px] bg-[rgba(255,255,255,0.9)] backdrop-blur-[24px] border border-[rgba(168,237,223,0.5)] rounded-[24px] shadow-[0_20px_60px_rgba(180,210,220,0.3)] flex flex-col overflow-hidden"
            variants={springVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(168,237,223,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[15px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)]">
                    HEAL
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8EDDF]" />
                    <span className="text-[12px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
                      HealNet AI · Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#F7F9FC] flex items-center justify-center text-[#8A9BB0] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(168,237,223,0.3)] bg-white">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask HEAL anything..."
                className="flex-1 h-10 px-4 rounded-full bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] text-[14px] font-[family-name:var(--font-body)] text-[#1A2332] placeholder-[#8A9BB0] focus:outline-none focus:border-[#A8EDDF]"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}