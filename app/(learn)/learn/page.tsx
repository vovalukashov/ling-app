"use client";

import Progress from "@/app/(learn)/Progress";
import QuestionCard from "@/app/(learn)/QuestionCard";
import TranslatedCard from "@/app/(learn)/TranslatedCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MOCK_DATA = {
  questionCard: {
    word: "apple",
    wordProgress: 0,
    sentence: "I have an apple in my bag",
    audio: "test.mp3",
  },
  translatedCard: {
    word: "яблоко",
    sentence: "У меня есть яблоко в сумке",
  },
  dailyProgress: 0,
};

const LearnPage = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [typedWord, setTypedWord] = useState("");
  const [statusWord, setStatusWord] = useState<
    "correct" | "wrong" | "not-checked"
  >("not-checked");
  const [audioPlay, setAudioPlay] = useState(false);

  const handelCheck = () => {
    if (typedWord.toLowerCase() === data.questionCard.word) {
      setData((prev) => ({
        ...prev,
        questionCard: {
          ...prev.questionCard,
          wordProgress: prev.questionCard.wordProgress + 1,

          dailyProgress: (prev.dailyProgress += 1),
        },
      }));
      setStatusWord("correct");
    } else {
      setData((prev) => ({
        ...prev,
        questionCard: {
          ...prev.questionCard,
          wordProgress:
            prev.questionCard.wordProgress === 0
              ? 0
              : prev.questionCard.wordProgress - 1,
        },
        dailyProgress: (prev.dailyProgress += 1),
      }));

      setStatusWord("wrong");
    }
    setAudioPlay(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handelCheck();
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-y-4 mt-5 w-full mx-4">
      <Progress dailyProgress={data.dailyProgress} />
      <QuestionCard
        {...data.questionCard}
        status={statusWord}
        typedWord={typedWord}
        setTypedWord={setTypedWord}
        audioPlay={audioPlay}
      />
      <TranslatedCard {...data.translatedCard} />
      <Button
        variant="default"
        onClick={handelCheck}
        className={cn(
          (statusWord === "correct" || statusWord === "wrong") &&
            "pointer-events-none text-muted-foreground",
        )}
      >
        Проверить
      </Button>
    </div>
  );
};

export default LearnPage;
