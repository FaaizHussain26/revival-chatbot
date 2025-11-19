import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Minus } from "lucide-react";
import ChatInterface from "./chat-interface";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className="group relative h-16 w-16 rounded-full shadow-lg border-none 
               bg-primary hover:bg-primary/90 transition-all duration-200 hover:shadow-xl overflow-hidden"
          >
            {/* Chat Icon - visible when closed */}
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src="assets/chat-icon.png"
                  className="h-7 w-7"
                  alt="Chat"
                />
              </motion.div>
            )}

            {/* Down Arrow Icon - visible when open */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-primary">
                  <img
                    src="assets/down-arrow.png"
                    className="h-7 w-7"
                    alt="Close"
                  />
                </div>
              </motion.div>
            )}

            {/* Hover effect ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 0.5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 sm:right-6 w-[90vw] sm:w-[200px] md:w-[450px] h-[600px] 
                      rounded-2xl shadow-2xl overflow-hidden z-40 bg-background border border-border mb-1"
          >
            {/* Header */}
            <div className="px-6 py-4 flex flex-row items-center justify-between border-b bg-gradient-to-r from-[oklch(35.295%_0.11949_258.602)] to-[oklch(26%_0.11949_258.602)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Chat with us</h3>
                  <p className="text-white/80 text-xs">We're here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full text-white hover:bg-white/30"
                >
                  <Minus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 overflow-hidden h-[calc(100%-72px)]">
              <ChatInterface />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
