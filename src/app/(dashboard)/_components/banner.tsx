import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Banner() {
  return (
    <div className="flex aspect-[5/1] min-h-[248px] items-center gap-x-6 rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5] p-6 text-white">
      <div className="hidden size-28 items-center justify-center rounded-full bg-white md:flex">
        <div className="flex size-20 items-center justify-center rounded-full bg-white">
          <Sparkles className="h-20 fill-[#0073ff] text-[#0073ff]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Visualize your ideas with The Drawing Board
        </h1>
        <p className="mb-2 text-sm">
          Turn your inspiration into design in no time with AI.
        </p>
        <Button variant="secondary" className="w-[160px] items-center gap-x-2">
          <span>Start creating</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
