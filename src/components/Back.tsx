import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Back() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-start mb-2">
      <Button
        variant="ghost"
        className="mb-6 px-3 group text-white transition-all duration-150 ease-in-out hover:bg-white hover:text-primary hover:border-primary"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back
      </Button>
    </div>
  );
}
