
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";

interface Step1IntroductionProps {
  onNext: () => void;
}

export function Step1Introduction({ onNext }: Step1IntroductionProps) {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
        Your Vote, Your Voice!
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Participate in a seamless and secure online voting experience.
      </p>
      
      <Button 
        onClick={onNext} 
        size="lg" 
        variant="vote"
        className="animate-pulse-border px-8 py-6 text-base rounded-md"
      >
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

export function IntroductionIllustration() {
  return (
    <div className="flex justify-center items-center h-64">
      <Users size={200} className="text-primary-500" />
    </div>
  );
}

export function IntroductionLeftContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-white rounded-full p-2 shadow-md">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-lg">Secure and transparent process</h3>
          <p className="text-muted-foreground">
            Our e-voting system uses end-to-end encryption to ensure the security and integrity of your vote.
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="bg-white rounded-full p-2 shadow-md">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="h-6 w-6 text-primary"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" 
            />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-lg">Government-approved eVoting method</h3>
          <p className="text-muted-foreground">
            This platform is officially approved and meets all the regulatory requirements for electronic voting.
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="bg-white rounded-full p-2 shadow-md">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="h-6 w-6 text-primary"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" 
            />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-lg">Your data is encrypted and safe</h3>
          <p className="text-muted-foreground">
            We prioritize your privacy and security. All your personal information and vote are fully encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}
