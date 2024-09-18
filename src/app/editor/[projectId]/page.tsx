import { protectServer } from "@/app/(auth)/utils";
import Editor from "./_components/editor";

export default async function EditorProjectIdPage() {
  await protectServer();
  return <Editor />;
}
