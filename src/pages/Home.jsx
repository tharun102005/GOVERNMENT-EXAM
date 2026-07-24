import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import HeroSection from '../components/home/HeroSection';
import SearchSection from '../components/home/SearchSection';
import ExamCategories from '../components/home/ExamCategories';
import SubjectsSection from '../components/home/SubjectsSection';
import DashboardStats from '../components/home/DashboardStats';
import MockTestPreview from '../components/home/MockTestPreview';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <SearchSection />
        <ExamCategories />
        <SubjectsSection />
        <DashboardStats />
        <MockTestPreview />
        
        {/* Placeholder for future sections */}
        <div className="py-20 text-center text-slate-500">
          <p>More premium sections coming soon...</p>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
