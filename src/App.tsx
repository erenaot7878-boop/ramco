import { useEffect, useRef, useState } from 'react';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { Nav } from './components/Nav';
import { RouterProvider, useRouter } from './lib/router';
import { ContactPage } from './pages/ContactPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { LocationPage } from './pages/LocationPage';
import { PricingPage } from './pages/PricingPage';
import { StayPage } from './pages/StayPage';

function AppShell() {
  const { path } = useRouter();
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsNavScrolled(false);
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [path]);

  const renderPage = () => {
    switch (path) {
      case '/stay':
        return <StayPage />;
      case '/pricing':
        return <PricingPage />;
      case '/experiences':
        return <ExperiencesPage />;
      case '/gallery':
        return <GalleryPage />;
      case '/location':
        return <LocationPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-[#122318]">
      {/* Skip to main content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-[#14341F] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#FFFFFF]"
      >
        Skip to main content
      </a>

      {/* Top sentinel observed to toggle solid Forest nav on Home hero scroll */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-16 w-px"
      />

      <Nav isScrolled={isNavScrolled} />

      <main id="main-content" className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      <MobileActionBar />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
