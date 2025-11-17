import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatInterface from "./chat-interface";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="ghost"
        className="h-21 w-21 rounded-full fixed bottom-6 right-6 shadow-lg z-50 bg-[#FF6600]"
      >
        <img src="/assets/logo.webp" alt="logo" width={64} height={54} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-27 right-6 sm:right-8 w-[90vw] sm:w-[400px] md:w-[450px] h-[600px] 
                      rounded-lg shadow-xl overflow-hidden z-40 bg-white border border-gray-200"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-[#FF6600] to-[#C49E78] flex flex-row items-center justify-between border-b gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://placehold.co/600x600?text=EasyDIY"
                    alt="Virtual Assistant Avatar"
                    className="h-12 w-12 rounded-full border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-white text-xl font-medium">
                    EasyDIY Murphy
                  </h2>
                  <p className="text-gray-200 text-sm ">AI Support</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full text-white hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
            <div className="flex-1 overflow-hidden h-[calc(100%-76px)]">
              <ChatInterface inModal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
