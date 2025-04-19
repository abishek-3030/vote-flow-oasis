
import { Button } from "@/components/ui/button";
import { Link2, CheckCircle, XCircle, UserCheck, List, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Step4VerifyDetailsProps {
  onNext: () => void;
}

interface CandidateType {
  id: number;
  name: string;
  age: number;
  party: string;
  eligible: boolean;
}

const candidates: CandidateType[] = [
  { id: 1, name: "Jane Smith", age: 42, party: "Progressive Party", eligible: true },
  { id: 2, name: "John Reynolds", age: 53, party: "Conservative Alliance", eligible: true },
  { id: 3, name: "Amira Khan", age: 38, party: "Green Future", eligible: true },
  { id: 4, name: "Robert Chen", age: 47, party: "People's Coalition", eligible: true },
  { id: 5, name: "Sarah Johnson", age: 36, party: "Liberty Union", eligible: true },
];

export function Step4VerifyDetails({ onNext }: Step4VerifyDetailsProps) {
  const userDetails = {
    name: "Rahul Sharma",
    age: 32,
    eligible: true,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Verify Your Details
      </h2>
      <p className="text-muted-foreground mb-6">
        Please review your information and check your eligibility status.
      </p>

      <div className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Your Information</h3>
          <dl className="space-y-2">
            <div className="grid grid-cols-2">
              <dt className="text-muted-foreground">Name:</dt>
              <dd className="font-medium">{userDetails.name}</dd>
            </div>
            <div className="grid grid-cols-2">
              <dt className="text-muted-foreground">Age:</dt>
              <dd className="font-medium">{userDetails.age}</dd>
            </div>
            <div className="grid grid-cols-2">
              <dt className="text-muted-foreground">Eligibility:</dt>
              <dd className="font-medium">
                {userDetails.eligible ? (
                  <span className="flex items-center text-success-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Eligible to vote
                  </span>
                ) : (
                  <span className="flex items-center text-destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Not eligible
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-3 flex items-center">
            <List className="h-5 w-5 mr-2" />
            Candidate List
          </h3>
          
          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id} 
                className="border rounded-md p-3 bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{candidate.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {candidate.age} years | {candidate.party}
                    </p>
                  </div>
                  <div>
                    {candidate.eligible ? (
                      <span className="text-xs bg-success-100 text-success-500 px-2 py-1 rounded-full font-medium">
                        Eligible
                      </span>
                    ) : (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full font-medium">
                        Not Eligible
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-md p-4">
          <p className="text-sm flex items-start">
            <Info className="h-4 w-4 mr-2 text-primary mt-0.5" />
            By proceeding, you confirm that your details are correct and you're ready to generate your unique voting link.
          </p>
        </div>

        <Button 
          onClick={onNext} 
          className="w-full"
        >
          <Link2 className="mr-2 h-4 w-4" />
          Generate Voting Link
        </Button>
      </div>
    </div>
  );
}

export function VerifyDetailsIllustration() {
  return (
    <div className="flex justify-center items-center h-64">
      <UserCheck size={180} className="text-primary-500" />
    </div>
  );
}

export function VerifyDetailsLeftContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Important Information</h3>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Review your details carefully
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          Make sure your personal information is correct before proceeding.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Make sure your eligibility is confirmed
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          You can only vote if your eligibility status shows as "Eligible".
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Once you generate the URL, do not share it
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          Your voting link is unique to you and should not be shared with anyone else.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary flex items-center gap-2">
          <Info className="h-5 w-5" />
          Proceed only if you're sure
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          After generating the voting link, the process cannot be reversed.
        </p>
      </div>
    </div>
  );
}
