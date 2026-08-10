import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import StatsCounter from "@/components/home/StatsCounter";
import NewsSection from "@/components/home/NewsSection";
import ProgramsPreview from "@/components/home/ProgramsPreview";
import AdmissionsSection from "@/components/home/AdmissionsSection";
import StudentServices from "@/components/home/StudentServices";
import ResearchHighlights from "@/components/home/ResearchHighlights";
import InternationalSection from "@/components/home/InternationalSection";
import AlumniShowcase from "@/components/home/AlumniShowcase";
import CampusGallery from "@/components/home/CampusGallery";

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <StatsCounter />
      <NewsSection />
      <ProgramsPreview />
      <AdmissionsSection />
      <StudentServices />
      <ResearchHighlights />
      <InternationalSection />
      <AlumniShowcase />
      <CampusGallery />
    </Layout>
  );
};

export default Index;
