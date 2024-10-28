import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressWordProps {
  value: number;
}

const ProgressWord: React.FC<ProgressWordProps> = ({ value }) => {
  return (
    <div className="flex gap-x-1">
      {[...Array(4)].map((_, index) => (
        <Star
          key={index}
          className={cn("w-3 h-3", index < value && "fill-accent-foreground")}
        />
      ))}
      <Star className="w-3 h-3" />
    </div>
  );
};

export default ProgressWord;
