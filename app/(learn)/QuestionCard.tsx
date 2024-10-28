import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProgressWord from "@/app/(learn)/ProgressWord";
import { cn } from "@/lib/utils";
import { ChangeEvent, FC, useCallback, useEffect, useRef } from "react";

interface QuestionCardProps {
  word: string;
  wordProgress: number;
  sentence: string;
  typedWord: string;
  audio: string;
  setTypedWord: (word: string) => void;
  status: "correct" | "wrong" | "not-checked";
  onNextCard: () => void;
}

const QuestionCard: FC<QuestionCardProps> = ({
  word,
  wordProgress,
  sentence,
  typedWord,
  audio,
  setTypedWord,
  status = "not-checked",
  onNextCard,
}) => {
  const splitSentence = sentence.split(word);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if ((status === "correct" || status === "wrong") && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    }
  }, [status]);

  const handleNextCard = () => {
    setTimeout(() => {
      onNextCard();
    }, 1000);
  };

  useEffect(() => {
    audioRef.current?.addEventListener("ended", handleNextCard, { once: true });

    return () => {
      audioRef.current?.removeEventListener("ended", handleNextCard);
    };
  }, [word]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTypedWord(e.target.value);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <ProgressWord value={wordProgress} />
        </CardHeader>
        <CardContent>
          <audio src={audio} ref={audioRef} />
          <p>
            {splitSentence.map((partOfSentence: string, index: number) => (
              <span key={index}>
                <span>{partOfSentence}</span>
                {index !== splitSentence.length - 1 && (
                  <input
                    type="text"
                    className={cn(
                      "w-[100px] border-b outline-none px-2",
                      status === "correct" && "border-green-500 text-green-500",
                      status === "wrong" &&
                        "border-red-500 text-red-500 pointer-events-none",
                    )}
                    onInput={handleInput}
                    value={
                      status === "wrong" || status === "correct"
                        ? word
                        : typedWord
                    }
                  />
                )}
              </span>
            ))}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;
