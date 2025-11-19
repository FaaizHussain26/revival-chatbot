import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Minus, X } from "lucide-react";
import ChatInterface from "./chat-interface";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-50"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className="group relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full shadow-lg border-none 
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
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
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
                    className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed 
                /* Mobile: Full screen modal with safe spacing */
                left-2 right-2 top-2 bottom-20
                /* Small mobile landscape */
                xs:left-4 xs:right-4 xs:top-4 xs:bottom-24
                /* Tablet portrait */
                sm:left-4 sm:right-4 sm:top-4 sm:bottom-24 sm:max-w-[500px] sm:max-h-[600px] sm:mx-auto
                /* Tablet landscape and up: Bottom right widget */
                md:inset-auto md:bottom-24 md:right-6 md:left-auto md:top-auto md:w-[380px] md:h-[550px] md:max-w-none md:mx-0
                /* Desktop */
                lg:w-[420px] lg:h-[600px]
                /* Large desktop */
                xl:w-[450px]
                rounded-2xl shadow-2xl overflow-hidden z-50 bg-background border border-border flex flex-col"
            >
              {/* Header */}
              <div className="flex-shrink-0 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 flex flex-row items-center justify-between border-b bg-gradient-to-r from-[oklch(35.295%_0.11949_258.602)] to-[oklch(26%_0.11949_258.602)]">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                      Chat with us
                    </h3>
                    <p className="text-white/80 text-[10px] sm:text-xs truncate">
                      We're here to help
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-white hover:bg-white/30"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" />
                    <Minus className="h-5 w-5 hidden md:block" />
                  </Button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="flex-1 overflow-hidden min-h-0">
                <ChatInterface />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
