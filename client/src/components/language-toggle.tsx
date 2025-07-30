import { Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "it" ? "en" : "it");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === "it" ? "EN" : "IT"}
      </span>
    </Button>
  );
}