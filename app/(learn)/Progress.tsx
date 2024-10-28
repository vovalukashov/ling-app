import { Progress as ProgressBar } from "@/components/ui/progress";

interface ProgressProps {
  dailyProgress: number;
}

const Progress: React.FC<ProgressProps> = ({ dailyProgress }) => {
  return <ProgressBar value={dailyProgress} />;
};

export default Progress;
