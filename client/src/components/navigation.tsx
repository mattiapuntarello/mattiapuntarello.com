import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import LanguageToggle from "@/components/language-toggle";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? "bg-white/98 backdrop-blur-sm" : "bg-white/95 backdrop-blur-sm"
        } border-b border-gray-100`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-secondary">
              Mattia Puntarello
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {t("navigation", "home")}
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {t("navigation", "portfolio")}
              </button>
              <button
                onClick={() => scrollToSection("history")}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {t("navigation", "history")}
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {t("navigation", "blog")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {t("navigation", "contact")}
              </button>
              <LanguageToggle />
            </div>
            <button
              className="md:hidden text-gray-600 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6">
          <div className="space-y-6">
            <button
              onClick={() => scrollToSection("home")}
              className="block text-lg text-gray-700 hover:text-primary transition-colors w-full text-left"
            >
              {t("navigation", "home")}
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="block text-lg text-gray-700 hover:text-primary transition-colors w-full text-left"
            >
              {t("navigation", "portfolio")}
            </button>
            <button
              onClick={() => scrollToSection("history")}
              className="block text-lg text-gray-700 hover:text-primary transition-colors w-full text-left"
            >
              {t("navigation", "history")}
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="block text-lg text-gray-700 hover:text-primary transition-colors w-full text-left"
            >
              {t("navigation", "blog")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block text-lg text-gray-700 hover:text-primary transition-colors w-full text-left"
            >
              {t("navigation", "contact")}
            </button>
            <div className="pt-4">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
