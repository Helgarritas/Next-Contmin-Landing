import BannerPage from "./components/BannerPage";
import CollaborationPage from "./components/CollaborationPage";
import ProjectsPage from "./components/ProjectsPage";
import SolutionsPage from "./components/SolutionsPage";
import EquipmentPage from "./components/EquipmentPage";
import AboutPage from "./components/AboutPage";
import FormPage from "./components/FormPage";
import IsoPage from "./components/IsoPage";
import ValuePropositionPage from "./components/ValuePropositionPage";
import { Particles } from "@/components/magicui/particles";

export default function Home() {
  return (
    <>
      <BannerPage/>
      <div className="relative">
        {/* <CollaborationPage/> */}
        <ValuePropositionPage/>
        {/* <ProjectsPage/> */}
        <AboutPage/> 
        <SolutionsPage/>
        {/* <EquipmentPage/> */}
        <FormPage/> 
        <Particles className="absolute top-0 left-0 w-full h-full -z-10"/>
      </div>
    </>
  );
}
