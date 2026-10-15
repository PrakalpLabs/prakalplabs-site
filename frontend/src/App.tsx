import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/Home";
import { AboutPage } from "@/pages/About";
import { ServicesPage } from "@/pages/Services";
import { ServiceDetailPage } from "@/pages/ServiceDetail";
import { ProjectsPage } from "@/pages/Projects";
import { ProjectDetailPage } from "@/pages/ProjectDetail";
import { ContactPage } from "@/pages/Contact";
import { AdminPage } from "@/pages/Admin";
import { PrivacyPage } from "@/pages/Privacy";
import { TermsPage } from "@/pages/Terms";
import { Button } from "@/components/ui/Button";

// Scroll to top automatically when route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFoundPage() {
  return (
    <div className="py-32 max-w-md mx-auto text-center px-4 space-y-4">
      <div className="text-6xl font-black font-mono text-[#7C5CFC]">404</div>
      <h1 className="text-2xl font-bold text-white">Route Not Found</h1>
      <p className="text-xs text-[#A5AFBF]">
        The requested URL path does not exist on the Prakalp Labs platform.
      </p>
      <div className="pt-2">
        <Button href="/" variant="primary">
          Return to Home
        </Button>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-shell min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
