import { protectServer } from "@/app/(auth)/utils";
import Banner from "./_components/banner";

export default async function Home() {
  await protectServer();
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col space-y-6 pb-10">
      <Banner />
    </div>
  );
}
