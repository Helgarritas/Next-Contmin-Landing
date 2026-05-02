import BannerPage from "./components/BannerPage";
import AboutPage from "./components/AboutPage";
import ValuePropositionPage from "./components/ValuePropositionPage";

import dynamic from "next/dynamic";
import ParticlesBackground from "@/components/ParticlesBackground";

const SolutionsPage = dynamic(() => import("./components/SolutionsPage"));
const FormPage = dynamic(() => import("./components/FormPage"));

export default function Home() {
  return (
    <>
      <BannerPage/>
      <div className="relative">
        <ValuePropositionPage/>

        <AboutPage /> 
        <SolutionsPage/>
        <FormPage /> 
        <ParticlesBackground />
      </div>
    </>
  );
}
