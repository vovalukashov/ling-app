import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TranslatedCardProps {
  word: string;
  sentence: string;
}

const TranslatedCard: React.FC<TranslatedCardProps> = ({ word, sentence }) => {
  return (
    <Card>
      <CardHeader>{word}</CardHeader>
      <CardContent>{sentence}</CardContent>
    </Card>
  );
};

export default TranslatedCard;
