import { ModeToggle } from "@/components/ui/toggle-mode-theme";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex items-center justify-center flex-col gap-2 h-screen w-screen">
      <div className="flex items-center justify-center w-1/2 h-1/2 bg-background border-2 border-border rounded-md">
        <div className="flex w-full h-1/2 rounded-md justify-around">
          <Link
            href={"/create-room"}
            className="flex w-1/4 text-center text items-center justify-center bg-muted rounded-md border-2 
            hover:text-primary transition-colors"
          >
            Создать комнату
          </Link>
          <Link
            href={"/room"}
            className="flex w-1/4 text-center items-center justify-center bg-muted rounded-md border-2 
            hover:text-secondary transition-colors"
          >
            Войти в комнату
          </Link>

          <Link
            href={"/booking-room"}
            className="flex w-1/4 text-center items-center justify-center bg-muted rounded-md border-2 
            hover:text-accent transition-colors"
          >
            Запланировать встречу
          </Link>
        </div>
      </div>
      <ModeToggle />
    </section>
  );
}
