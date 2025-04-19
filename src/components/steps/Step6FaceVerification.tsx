
import { Button } from "@/components/ui/button";
import { Camera, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Step6FaceVerificationProps {
  onNext: () => void;
}

export function Step6FaceVerification({ onNext }: Step6FaceVerificationProps) {
  const [currentCapture, setCurrentCapture] = useState<number>(0);
  const [captures, setCaptures] = useState<string[]>(["", "", "", ""]);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const captureLabels = ["Front", "Left", "Right", "Upward"];
  const captureInstructions = [
    "Look straight at the camera",
    "Turn your head slightly to the left",
    "Turn your head slightly to the right",
    "Tilt your head slightly upward",
  ];

  useEffect(() => {
    if (cameraActive && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
        });
    }
    
    return () => {
      // Stop camera when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  const startCamera = () => {
    setCameraActive(true);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame on canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get data URL from canvas
      const dataUrl = canvas.toDataURL("image/png");
      
      // Update captures array
      const newCaptures = [...captures];
      newCaptures[currentCapture] = dataUrl;
      setCaptures(newCaptures);
      
      // Move to next capture or finish
      if (currentCapture < 3) {
        setCurrentCapture(currentCapture + 1);
      }
    }
  };

  const allCapturesComplete = captures.every((capture) => capture !== "");

  const handleSubmit = () => {
    // Stop the camera
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    
    // Proceed to next step
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Face Verification
      </h2>
      <p className="text-muted-foreground mb-6">
        Please capture facial images from different angles for verification.
      </p>

      <div className="space-y-6">
        {!cameraActive ? (
          <div className="text-center py-8">
            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="mb-6">
              We need to verify your identity with facial recognition. Please ensure you're in a well-lit area.
            </p>
            <Button 
              onClick={startCamera}
              className="mx-auto"
              size="lg"
            >
              Start Camera
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="bg-black relative rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 border-4 border-dashed border-white/50 pointer-events-none" />
                
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {captureLabels[currentCapture]}
                </div>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-md text-sm max-w-xs text-center">
                  {captureInstructions[currentCapture]}
                </div>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="grid grid-cols-4 gap-2">
                {captures.map((capture, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "aspect-square rounded-md overflow-hidden border-2",
                      currentCapture === index 
                        ? "border-primary" 
                        : capture 
                          ? "border-success-500" 
                          : "border-gray-200"
                    )}
                  >
                    {capture ? (
                      <img 
                        src={capture} 
                        alt={`Capture ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-muted-foreground text-xs">
                        {captureLabels[index]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              {!allCapturesComplete ? (
                <Button 
                  onClick={captureImage}
                  className="w-full"
                >
                  Capture {captureLabels[currentCapture]} Image
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Continue to Next Step
                </Button>
              )}
              
              {!allCapturesComplete && currentCapture > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setCurrentCapture(currentCapture - 1)}
                  className="w-full"
                >
                  Back to Previous Angle
                </Button>
              )}
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md space-y-3">
              <p className="text-sm font-medium">Guidelines for clear captures:</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 text-primary" />
                  Use a clear background
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 text-primary" />
                  No masks, hats, or sunglasses
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 text-primary" />
                  Good lighting is important
                </li>
                <li className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 text-primary" />
                  Ensure your face is centered in each frame
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function FaceVerificationIllustration() {
  return (
    <div className="flex justify-center items-center h-64">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="180"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-500"
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
  );
}

export function FaceVerificationLeftContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Face Verification Process</h3>
      
      <div className="rounded-lg bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium">Front View Capture</h4>
              <p className="text-sm text-muted-foreground">
                Look directly at the camera with a neutral expression
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium">Left Profile</h4>
              <p className="text-sm text-muted-foreground">
                Turn your head slightly to the left (about 45 degrees)
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium">Right Profile</h4>
              <p className="text-sm text-muted-foreground">
                Turn your head slightly to the right (about 45 degrees)
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary font-bold">
              4
            </div>
            <div>
              <h4 className="font-medium">Upward Angle</h4>
              <p className="text-sm text-muted-foreground">
                Tilt your chin upward slightly while facing the camera
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h4 className="font-medium text-primary">Privacy Protection</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Your facial data is encrypted and used only for this voting session. It's automatically deleted afterward.
        </p>
      </div>
    </div>
  );
}
