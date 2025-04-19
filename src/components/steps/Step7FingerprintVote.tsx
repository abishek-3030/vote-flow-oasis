
import { Button } from "@/components/ui/button";
import { Fingerprint, Info, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Step7FingerprintVoteProps {
  onComplete: () => void;
}

export function Step7FingerprintVote({ onComplete }: Step7FingerprintVoteProps) {
  const [scanningState, setScanningState] = useState<
    "idle" | "scanning" | "error" | "success"
  >("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Simulated vote details
  const voteDetails = {
    party: "Progressive Party",
    voterId: "VOTER-2025-78901",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };

  // Simulated scanning process
  const startScanning = () => {
    setScanningState("scanning");
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setScanningState("success");
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };

  const handleFinalize = () => {
    setShowSuccess(true);
    setTimeout(onComplete, 3000);
  };

  return (
    <div>
      {showSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-success-100 rounded-full p-4 mb-6">
            <CheckCircle className="h-12 w-12 text-success-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Your vote has been cast successfully!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Thank you for participating in the democratic process. Your vote has been securely recorded.
          </p>
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm text-center">
              You may now close this window or return to the homepage.
            </p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Fingerprint Verification & Vote Finalization
          </h2>
          <p className="text-muted-foreground mb-6">
            Complete the verification process with your fingerprint to cast your vote.
          </p>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="relative">
                  <div
                    className={cn(
                      "border-2 rounded-md h-64 flex flex-col items-center justify-center transition-all",
                      scanningState === "idle"
                        ? "border-gray-300 bg-gray-50"
                        : scanningState === "scanning"
                        ? "border-primary bg-primary-50"
                        : scanningState === "success"
                        ? "border-success-500 bg-success-50"
                        : "border-destructive bg-destructive/10"
                    )}
                  >
                    <button
                      onClick={scanningState === "idle" ? startScanning : undefined}
                      disabled={scanningState !== "idle"}
                      className={cn(
                        "w-32 h-40 rounded-lg flex items-center justify-center",
                        scanningState === "idle"
                          ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                          : scanningState === "scanning"
                          ? "bg-primary/20"
                          : scanningState === "success"
                          ? "bg-success-100"
                          : "bg-destructive/20"
                      )}
                    >
                      <Fingerprint
                        className={cn(
                          "h-16 w-16 transition-colors",
                          scanningState === "idle"
                            ? "text-gray-400"
                            : scanningState === "scanning"
                            ? "text-primary animate-pulse"
                            : scanningState === "success"
                            ? "text-success-500"
                            : "text-destructive"
                        )}
                      />
                    </button>
                    
                    <div className="mt-6 text-center">
                      <p
                        className={cn(
                          "font-medium",
                          scanningState === "success"
                            ? "text-success-500"
                            : scanningState === "error"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      >
                        {scanningState === "idle"
                          ? "Click the sensor to start scanning"
                          : scanningState === "scanning"
                          ? "Scanning fingerprint..."
                          : scanningState === "success"
                          ? "Fingerprint verified!"
                          : "Error. Please try again."}
                      </p>
                      
                      {scanningState === "scanning" && (
                        <div className="w-full max-w-xs mt-2 bg-gray-200 rounded-full h-2.5 mx-auto">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${scanProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-primary" />
                    Place finger flat and steady on the scanner
                  </p>
                  <p className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-primary" />
                    Ensure it is clean and properly aligned
                  </p>
                  <p className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-primary" />
                    Do not remove finger until scan completes
                  </p>
                </div>
              </div>
              
              <div>
                <div className="border rounded-lg p-4 bg-white h-full">
                  <h3 className="font-medium mb-4">Voting Summary</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between pb-3 border-b">
                      <dt className="text-muted-foreground">Selected Party:</dt>
                      <dd className="font-medium">{voteDetails.party}</dd>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <dt className="text-muted-foreground">Voter ID:</dt>
                      <dd className="font-medium">{voteDetails.voterId}</dd>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <dt className="text-muted-foreground">Date:</dt>
                      <dd className="font-medium">{voteDetails.date}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Time:</dt>
                      <dd className="font-medium">{voteDetails.time}</dd>
                    </div>
                  </dl>
                  
                  <div className="mt-6 bg-primary-50 p-3 rounded-md text-sm text-primary-800">
                    <p>
                      By finalizing your vote, you confirm that you have reviewed your selection and wish to cast your vote officially.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleFinalize}
              disabled={scanningState !== "success"}
              className="w-full"
            >
              Finalize & Cast Vote
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export function FingerprintVoteIllustration() {
  return (
    <div className="flex justify-center items-center h-64">
      <Fingerprint size={180} className="text-primary-500" />
    </div>
  );
}

export function FingerprintVoteLeftContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Final Verification Step</h3>
      
      <div className="rounded-lg bg-white p-5 shadow-sm">
        <h4 className="font-medium mb-3">Why Fingerprint Verification?</h4>
        <p className="text-sm text-muted-foreground">
          Fingerprint verification serves as the final security measure to ensure that only the registered voter can cast the vote. This multi-factor authentication approach maintains the integrity of the election.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary mb-2">Fingerprint Security</h4>
        <ul className="text-sm space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-4 w-4 mt-0.5 text-primary"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" 
              />
            </svg>
            Your fingerprint data is encrypted end-to-end
          </li>
          <li className="flex items-start gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-4 w-4 mt-0.5 text-primary"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" 
              />
            </svg>
            Only used for verification, not stored permanently
          </li>
          <li className="flex items-start gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-4 w-4 mt-0.5 text-primary"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" 
              />
            </svg>
            Complies with international biometric security standards
          </li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary">After Casting Your Vote</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Once your vote is cast, it is anonymized and added to the secure blockchain. You'll receive a confirmation code but no one can link your identity to your specific vote.
        </p>
      </div>
    </div>
  );
}
