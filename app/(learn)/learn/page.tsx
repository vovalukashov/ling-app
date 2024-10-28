"use client";

import Progress from "@/app/(learn)/Progress";
import QuestionCard from "@/app/(learn)/QuestionCard";
import TranslatedCard from "@/app/(learn)/TranslatedCard";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Simulate } from "react-dom/test-utils";
import select = Simulate.select;

interface Card {
  questionCard: {
    word: string;
    sentence: string;
    audio: string;
  };
  translatedCard: {
    word: string;
    sentence: string;
  };
}

interface OnLearnCard extends Card {
  showCount: number;
  wordProgress: number;
}

const MOCK_DATA = {
  allCards: new Map([
    [
      "apple",
      {
        questionCard: {
          word: "apple",
          sentence: "I have an apple in my bag",
          audio: "test.mp3",
        },
        translatedCard: {
          word: "яблоко",
          sentence: "У меня есть яблоко в сумке",
        },
      },
    ],
    [
      "phone",
      {
        questionCard: {
          word: "phone",
          sentence: "I want this phone",
          audio: "test1.mp3",
        },
        translatedCard: {
          word: "телефон",
          sentence: "Я хочу этот телефон",
        },
      },
    ],
  ]),
  onLearnCards: new Map(),
  learnedCards: new Map(),
  dailyProgress: 0,
};

const LearnPage = () => {
  const allCards = useRef(MOCK_DATA.allCards);
  const onLearnCards = useRef(MOCK_DATA.onLearnCards);
  const learnedCards = useRef(MOCK_DATA.learnedCards);
  const [currentCard, setCurrentCard] = useState<OnLearnCard | null>(null);
  const [dailyProgress, setDailyProgress] = useState(MOCK_DATA.dailyProgress);
  const [typedWord, setTypedWord] = useState("");
  const [statusWord, setStatusWord] = useState<
    "correct" | "wrong" | "not-checked"
  >("not-checked");

  const syncData = async () => {};

  const setCard = (card: OnLearnCard) => {
    setCurrentCard({ ...card });
    onLearnCards.current.get(card.questionCard.word).showCount++;
  };

  const selectCard = () => {
    let isReachedCurrentCard = false;
    const firstCard = onLearnCards.current.values().next().value;

    if (!currentCard) {
      setCard(firstCard);
      return;
    }

    const lastCardKey = Array.from(onLearnCards.current.keys()).pop();
    for (const onLearnCardKey of onLearnCards.current.keys()) {
      if (isReachedCurrentCard) {
        setCard(onLearnCards.current.get(onLearnCardKey));
        return;
      }

      if (currentCard?.questionCard.word === onLearnCardKey) {
        isReachedCurrentCard = true;
      }

      if (onLearnCardKey === lastCardKey) {
        setCard(firstCard);
        return;
      }
    }
  };

  const loadMoreCards = () => {
    let currentQuantity = onLearnCards.current.size;
    const newCards = new Map();

    for (const [key, value] of allCards.current) {
      if (currentQuantity === 30) break;
      if (!onLearnCards.current.has(key) && !learnedCards.current.has(key)) {
        newCards.set(key, { ...value, showCount: 0, wordProgress: 0 });
        currentQuantity++;
      }
    }

    onLearnCards.current = new Map([...onLearnCards.current, ...newCards]);
  };

  const handleNextCard = async () => {
    setTypedWord("");
    setStatusWord("not-checked");

    await syncData();
    loadMoreCards();
    selectCard();
  };

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleCheck();
    };
    window.addEventListener("keydown", handleEnter, { passive: true });

    handleNextCard();

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") handleCheck();
    },
    [typedWord],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEnter, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [handleEnter]);

  const handleCheck = () => {
    if (!currentCard) return;
    if (typedWord === currentCard.questionCard.word) {
      setStatusWord("correct");
    } else {
      setStatusWord("wrong");
    }
  };

  useEffect(() => {
    if (!currentCard) return;

    if (statusWord === "correct") {
      const currentCardInOnLearnCards = onLearnCards.current.get(
        currentCard.questionCard.word,
      );

      currentCardInOnLearnCards.wordProgress += 1;

      setCurrentCard((prev) => {
        const updatedCard = { ...prev } as OnLearnCard;
        updatedCard.wordProgress += 1;
        return updatedCard;
      });
    } else if (statusWord === "wrong") {
      const currentCardInOnLearnCards = onLearnCards.current.get(
        currentCard.questionCard.word,
      );

      currentCardInOnLearnCards.wordProgress =
        currentCardInOnLearnCards.wordProgress === 0
          ? 0
          : currentCardInOnLearnCards.wordProgress - 1;

      setCurrentCard((prev) => {
        const updatedCard = { ...prev } as OnLearnCard;
        updatedCard.wordProgress =
          updatedCard.wordProgress === 0 ? 0 : updatedCard.wordProgress - 1;
        return updatedCard;
      });
    }

    if (statusWord === "correct" || statusWord === "wrong") {
      const currentCardInOnLearnCards = onLearnCards.current.get(
        currentCard.questionCard.word,
      );

      setDailyProgress((prev) => prev + 1);

      if (currentCardInOnLearnCards.wordProgress === 5) {
        onLearnCards.current.delete(currentCard.questionCard.word);
        learnedCards.current.set(currentCard.questionCard.word, currentCard);
      }
    }
  }, [statusWord]);

  return (
    <div className="flex flex-col gap-y-4 mt-5 w-full mx-4">
      <Progress dailyProgress={dailyProgress} />
      {currentCard && (
        <>
          <QuestionCard
            {...currentCard.questionCard}
            wordProgress={currentCard.wordProgress}
            status={statusWord}
            typedWord={typedWord}
            setTypedWord={setTypedWord}
            onNextCard={handleNextCard}
          />
          <TranslatedCard {...currentCard.translatedCard} />
          <Button
            variant="default"
            onClick={handleCheck}
            className={cn(
              (statusWord === "correct" || statusWord === "wrong") &&
                "pointer-events-none text-muted-foreground",
            )}
          >
            Проверить
          </Button>
        </>
      )}
    </div>
  );
};

export default LearnPage;
