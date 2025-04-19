
import { Button } from "@/components/ui/button";
import { ExternalLink, Vote } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Step5VotingProps {
  onNext: () => void;
}

interface PartyType {
  id: number;
  name: string;
  logo: string;
  color: string;
  manifestoLink: string;
}

const parties: PartyType[] = [
  {
    id: 1,
    name: "Progressive Party",
    logo: "P",
    color: "bg-blue-500",
    manifestoLink: "#",
  },
  {
    id: 2,
    name: "Conservative Alliance",
    logo: "C",
    color: "bg-red-500",
    manifestoLink: "#",
  },
  {
    id: 3,
    name: "Green Future",
    logo: "G",
    color: "bg-green-500",
    manifestoLink: "#",
  },
  {
    id: 4,
    name: "People's Coalition",
    logo: "PC",
    color: "bg-yellow-500",
    manifestoLink: "#",
  },
  {
    id: 5,
    name: "Liberty Union",
    logo: "LU",
    color: "bg-purple-500",
    manifestoLink: "#",
  },
];

export function Step5Voting({ onNext }: Step5VotingProps) {
  const [selectedParty, setSelectedParty] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Cast Your Vote
      </h2>
      <p className="text-muted-foreground mb-6">
        Select the party you want to vote for. This is a secure and anonymous process.
      </p>

      <div className="space-y-6">
        <div className="space-y-3">
          {parties.map((party) => (
            <div
              key={party.id}
              className={cn(
                "border rounded-lg p-4 transition-all cursor-pointer",
                selectedParty === party.id
                  ? "border-primary bg-primary-50"
                  : "hover:border-primary/50 bg-white"
              )}
              onClick={() => setSelectedParty(party.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
                      party.color
                    )}
                  >
                    {party.logo}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{party.name}</h3>
                  <a
                    href={party.manifestoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Manifesto
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2",
                      selectedParty === party.id
                        ? "border-primary"
                        : "border-gray-300"
                    )}
                  >
                    {selectedParty === party.id && (
                      <div className="w-full h-full rounded-full bg-primary transform scale-75" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-md p-4">
          <p className="text-sm text-amber-800">
            Your vote is anonymous and cannot be traced back to you. Please make your selection carefully as you cannot change your vote once submitted.
          </p>
        </div>

        <Button
          onClick={onNext}
          disabled={selectedParty === null}
          className="w-full"
        >
          Cast Vote
        </Button>
      </div>
    </div>
  );
}

export function VotingIllustration() {
  return (
    <div className="flex justify-center items-center h-64">
      <Vote size={180} className="text-primary-500" />
    </div>
  );
}

export function VotingLeftContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">How Voting Works</h3>
      
      <div className="rounded-lg bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium">Select your preferred party</h4>
              <p className="text-sm text-muted-foreground">
                Click on the party card of your choice
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium">Verify your selection</h4>
              <p className="text-sm text-muted-foreground">
                Make sure the right party is selected before casting
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium">Click "Cast Vote"</h4>
              <p className="text-sm text-muted-foreground">
                Your vote will be recorded securely and anonymously
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              4
            </div>
            <div>
              <h4 className="font-medium">Complete verification</h4>
              <p className="text-sm text-muted-foreground">
                Verify your identity with face and fingerprint authentication
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary">Your vote is confidential</h4>
        <p className="text-sm text-muted-foreground mt-1">
          No one, including election officials, can see who you voted for.
        </p>
      </div>
    </div>
  );
}
