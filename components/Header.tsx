import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b-[1px] flex justify-between items-center h-[5rem]">
      <h1 className="text-2xl font-bold">Ling app</h1>
      <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="lg" variant="default">
              Войти
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </header>
  );
};

export default Header;
