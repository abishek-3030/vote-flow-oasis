
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info, MessageSquare, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface Step3OTPVerificationProps {
  onNext: () => void;
}

export function Step3OTPVerification({ onNext }: Step3OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only one digit per input
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Navigate between inputs with arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    if (e.key === "ArrowRight" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    // Go to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Check if pasted content is numeric and has the right length
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const digits = pastedData.split("").slice(0, 6);
      const newOtp = [...otp];
      
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      
      setOtp(newOtp);
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(val => val === "");
      const inputToFocus = document.getElementById(
        `otp-${nextEmptyIndex > -1 ? nextEmptyIndex : 5}`
      );
      if (inputToFocus) {
        inputToFocus.focus();
      }
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
    setCanResend(false);
    // Focus the first input
    const firstInput = document.getElementById("otp-0");
    if (firstInput) {
      firstInput.focus();
    }
  };

  const isValid = otp.every((digit) => digit !== "");

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Secure Your Vote with OTP Verification
      </h2>
      <p className="text-muted-foreground mb-6">
        Enter the OTP sent to your registered mobile number.
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="otp-0">One Time Password (OTP)</Label>
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold border rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Button 
            onClick={onNext} 
            disabled={!isValid}
            className="w-full"
          >
            Verify OTP
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={!canResend}
            onClick={handleResend}
          >
            {canResend ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend OTP
              </>
            ) : (
              <>
                <span className="mr-2">Resend OTP in</span>
                <span className="font-medium">{timer}s</span>
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
          <p className="flex items-center">
            <Info className="h-4 w-4 mr-2 text-primary" />
            Didn't receive the OTP? Check your SMS inbox and verify that the mobile number you entered is correct.
          </p>
        </div>
      </div>
    </div>
  );
}

export function OTPVerificationIllustration() {
  return (
    <div className="flex justify-center items-center h-64">
      <MessageSquare size={180} className="text-primary-500" />
    </div>
  );
}

export function OTPVerificationLeftContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Important Information</h3>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          OTP is valid for 5 minutes
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          Enter the verification code within 5 minutes of receiving it. After that, you'll need to request a new code.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Do not share your OTP with anyone
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          For security reasons, never share your OTP with anyone, not even election officials.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Check your SMS inbox
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          The OTP has been sent to your registered mobile number. Check your SMS inbox.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          You'll proceed only if OTP is verified
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          This verification step is mandatory to ensure the security of the voting process.
        </p>
      </div>
    </div>
  );
}
