
import { ReactNode } from "react";
import { ProgressStepper } from "./ProgressStepper";
import { AnimatePresence, motion } from "framer-motion";

interface EVotingLayoutProps {
  children: ReactNode;
  currentStep: number;
  illustration?: ReactNode;
  leftSideContent?: ReactNode;
}

const steps = [
  "Start",
  "Register",
  "Verify",
  "Review",
  "Vote",
  "Face ID",
  "Fingerprint",
];

export function EVotingLayout({ 
  children, 
  currentStep, 
  illustration, 
  leftSideContent 
}: EVotingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full p-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M2 7v10c0 .6.4 1 1 1h4v-5h2v5h10c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H3c-.6 0-1 .4-1 1Z" />
                <path d="M9 22V7" />
                <path d="M15 22V7" />
                <path d="M12 7v15" />
                <path d="M6 7v15" />
                <path d="M18 7v15" />
                <path d="M12 7H3" />
                <path d="M12 7h9" />
              </svg>
            </div>
            <span className="font-semibold text-lg">E-Voting Portal</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-green-100 text-success-500 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Secure Connection
            </span>
            <span className="text-muted-foreground text-xs hidden md:inline-block">
              Election Commission Official Portal
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8 px-4 md:py-12">
          <ProgressStepper 
            currentStep={currentStep} 
            steps={steps}
            className="max-w-4xl mx-auto mb-10"
          />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="order-2 md:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-100"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg p-6 md:p-8 h-full">
                {illustration && (
                  <div className="mb-8 flex justify-center">
                    {illustration}
                  </div>
                )}
                
                {leftSideContent && (
                  <div className="space-y-4">
                    {leftSideContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          <p>© 2025 National Election Commission. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            •{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            •{" "}
            <a href="#" className="text-primary hover:underline">
              Help & Support
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
