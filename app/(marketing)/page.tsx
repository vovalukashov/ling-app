import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-4 mt-6">
      <h1 className="text-xl font-bold px-4 text-center">
        Изучай английский в контексте предложений
      </h1>
      <div className="mt-5">
        <ClerkLoading>
          <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Button size="lg" variant="default" className="w-full">
              <Link href="/learn">Продолжить обучение</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" variant="default" className="w-full">
                Начать
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="secondary" className="w-full mt-3">
                У меня уже есть аккаунт
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
      <div className="mt-5">
        <h2 className="text-lg font-bold">Как это работает?</h2>
        <p className="mt-2">
          Каждый день в случайном порядке показывается 100 карточек. Нужно
          вписать в пустое место в предложении нужное слово на английском. Как
          только карточка наберет 5 правильных ответов за все время,
          разблокируется новое слово.
        </p>
      </div>
    </div>
  );
}
