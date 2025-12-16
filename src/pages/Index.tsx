import { HeroSection } from '@/components/HeroSection';
import { ChatWindow } from '@/components/ChatWindow';
import { Footer } from '@/components/Footer';
import { Space3DBackground } from '@/components/Space3DBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      {/* Background layer */}
      <div className="absolute inset-0">
        <Space3DBackground />
      </div>

      {/* Content layer */}
      <div className="relative container mx-auto px-4 py-16 md:py-24" style={{ zIndex: 10 }}>
        <HeroSection />
        <ChatWindow />
        <Footer />
      </div>
    </div>
  );
};

export default Index;