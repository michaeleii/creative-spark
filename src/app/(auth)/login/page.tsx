import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex h-dvh flex-col bg-[url('/bg.jpg')] bg-cover bg-top">
      <div className="z-10 flex h-full w-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-lg">
          <LoginForm />
        </div>
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.8))]" />
      </div>
    </div>
  );
}
