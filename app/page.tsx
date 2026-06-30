import Link from "next/link";
import { Logo } from "@/app/components/ui/logo";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-3xl bg-card p-8 shadow-[0_8px_30px_rgba(33,26,20,0.08)] text-center">
        <div className="flex justify-center mb-6">
          <Logo size="lg" withWordmark={false} />
        </div>
        <h1 className="text-2xl font-bold text-foreground">QuickBite</h1>
        <p className="text-sm text-muted-foreground mt-2 mb-8">Food delivery made easier</p>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-sm hover:brightness-105"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold border border-border text-foreground hover:bg-muted/60"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
