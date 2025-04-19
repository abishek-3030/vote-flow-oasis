
import { useState } from "react";
import { EVotingLayout } from "@/components/EVotingLayout";
import { 
  Step1Introduction, 
  IntroductionIllustration, 
  IntroductionLeftContent 
} from "@/components/steps/Step1Introduction";
import { 
  Step2Registration, 
  RegistrationIllustration, 
  RegistrationLeftContent 
} from "@/components/steps/Step2Registration";
import { 
  Step3OTPVerification, 
  OTPVerificationIllustration, 
  OTPVerificationLeftContent 
} from "@/components/steps/Step3OTPVerification";
import { 
  Step4VerifyDetails, 
  VerifyDetailsIllustration, 
  VerifyDetailsLeftContent 
} from "@/components/steps/Step4VerifyDetails";
import { 
  Step5Voting, 
  VotingIllustration, 
  VotingLeftContent 
} from "@/components/steps/Step5Voting";
import { 
  Step6FaceVerification, 
  FaceVerificationIllustration, 
  FaceVerificationLeftContent 
} from "@/components/steps/Step6FaceVerification";
import { 
  Step7FingerprintVote, 
  FingerprintVoteIllustration, 
  FingerprintVoteLeftContent 
} from "@/components/steps/Step7FingerprintVote";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleComplete = () => {
    // This could navigate to a thank you page or reset the flow
    console.log("Voting process completed!");
  };

  // Content for current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1Introduction onNext={handleNext} />;
      case 1:
        return <Step2Registration onNext={handleNext} />;
      case 2:
        return <Step3OTPVerification onNext={handleNext} />;
      case 3:
        return <Step4VerifyDetails onNext={handleNext} />;
      case 4:
        return <Step5Voting onNext={handleNext} />;
      case 5:
        return <Step6FaceVerification onNext={handleNext} />;
      case 6:
        return <Step7FingerprintVote onComplete={handleComplete} />;
      default:
        return <Step1Introduction onNext={handleNext} />;
    }
  };

  // Illustration for current step
  const renderIllustration = () => {
    switch (currentStep) {
      case 0:
        return <IntroductionIllustration />;
      case 1:
        return <RegistrationIllustration />;
      case 2:
        return <OTPVerificationIllustration />;
      case 3:
        return <VerifyDetailsIllustration />;
      case 4:
        return <VotingIllustration />;
      case 5:
        return <FaceVerificationIllustration />;
      case 6:
        return <FingerprintVoteIllustration />;
      default:
        return <IntroductionIllustration />;
    }
  };

  // Left side content for current step
  const renderLeftContent = () => {
    switch (currentStep) {
      case 0:
        return <IntroductionLeftContent />;
      case 1:
        return <RegistrationLeftContent />;
      case 2:
        return <OTPVerificationLeftContent />;
      case 3:
        return <VerifyDetailsLeftContent />;
      case 4:
        return <VotingLeftContent />;
      case 5:
        return <FaceVerificationLeftContent />;
      case 6:
        return <FingerprintVoteLeftContent />;
      default:
        return <IntroductionLeftContent />;
    }
  };

  return (
    <EVotingLayout 
      currentStep={currentStep} 
      illustration={renderIllustration()}
      leftSideContent={renderLeftContent()}
    >
      {renderCurrentStep()}
    </EVotingLayout>
  );
};

export default Index;
