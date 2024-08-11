import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100 ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <p className="text-sm">
          Desenvolvido por{" "}
          <Link
            className="underline"
            href="https://www.linkedin.com/in/lucas-alek/"
          >
            Lucas Álek
          </Link>
        </p>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
