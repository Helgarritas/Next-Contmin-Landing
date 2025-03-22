import BannerPage from "./components/BannerPage";
import ProjectsPage from "./components/ProjectsPage";
import SolutionsPage from "./components/SolutionsPage";
import AboutPage from "./components/AboutPage";
import IsoPage from "./components/IsoPage";

export default function Home() {
  return (
    <>
      <BannerPage/>
      <ProjectsPage/>
      <SolutionsPage/>
      <AboutPage/> 
      <IsoPage/> 
    </>
  );
}
