
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export function ProgressStepper({ currentStep, steps, className }: ProgressStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between w-full mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center rounded-full transition-colors w-10 h-10 text-sm font-medium border-2",
                index < currentStep
                  ? "bg-primary text-primary-foreground border-primary"
                  : index === currentStep
                  ? "border-primary text-primary bg-white"
                  : "border-gray-300 text-gray-400 bg-white"
              )}
            >
              {index < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-xs text-center w-16 sm:w-20 transition-colors",
                index <= currentStep 
                  ? "text-primary font-medium" 
                  : "text-gray-500"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-1 bg-gray-200 rounded-full">
        <div
          className="absolute h-1 bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
