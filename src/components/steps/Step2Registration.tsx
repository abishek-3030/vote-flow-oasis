
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Info, Upload, User } from "lucide-react";
import { useState } from "react";

interface Step2RegistrationProps {
  onNext: () => void;
}

export function Step2Registration({ onNext }: Step2RegistrationProps) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhaar, setAadhaar] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAadhaar(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadhaar(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid = fullName && age && mobile && aadhaar;
  const isAgeValid = Number(age) >= 18;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">Voter Registration</h2>
      <p className="text-muted-foreground mb-6">
        Please provide your details to register for voting.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name as per ID"
                className="pl-10"
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              min="18"
              max="120"
              required
            />
            {age && !isAgeValid && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <Info className="h-4 w-4 mr-1" />
                You must be 18 or above to vote
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhaar">Upload Aadhaar</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                dragActive ? "border-primary bg-primary-50" : "border-muted"
              } ${aadhaar ? "bg-success-50 border-success-500" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center py-4">
                {aadhaar ? (
                  <>
                    <div className="bg-success-100 p-2 rounded-full mb-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="h-6 w-6 text-success-500"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.5 12.75l6 6 9-13.5" 
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">
                      {aadhaar.name} ({(aadhaar.size / 1024).toFixed(2)} KB)
                    </p>
                    <button
                      type="button"
                      className="text-xs text-primary mt-2 hover:underline"
                      onClick={() => setAadhaar(null)}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">
                      Drag & drop your Aadhaar file or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: PDF, JPG, PNG (Max 5MB)
                    </p>
                    <label className="mt-4 cursor-pointer">
                      <span className="bg-primary/10 text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/20 transition-colors">
                        Browse Files
                      </span>
                      <input
                        type="file"
                        id="aadhaar"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!isFormValid || !isAgeValid}
        >
          Proceed to OTP Verification
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

export function RegistrationIllustration() {
  return (
    <div className="flex justify-center items-center h-64">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-500"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
  );
}

export function RegistrationLeftContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Important Information</h3>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Enter accurate personal details
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          Make sure your name matches exactly as it appears on your official ID.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Age must be 18 or above to vote
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          As per voting regulations, you must be at least 18 years old on the election date.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Aadhaar used only for identity verification
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          Your Aadhaar details are only used to verify your identity and will not be stored.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Your information is strictly confidential
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          All personal data is encrypted and protected under the Data Protection Act.
        </p>
      </div>
    </div>
  );
}
