import { protectServer } from "@/app/(auth)/utils";
import ProjectsSection from "./_components/projects-section";
import TemplateSection from "./_components/template-section";

export default async function Home() {
  await protectServer();
  return (
    <div className="mx-auto flex flex-col space-y-8 px-8">
      <TemplateSection />
      <ProjectsSection />
    </div>
  );
}
