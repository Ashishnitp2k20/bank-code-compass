import { Link } from "react-router-dom";
import { Building2, HelpCircle, Lightbulb, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-bank-100 dark:bg-bank-900 p-2 rounded-lg mr-3">
              <svg
                className="h-6 w-6 text-bank-600 dark:text-bank-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-bank-800 dark:text-white">
              Bank Code Compass
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('faqs')}
                className="text-gray-600 dark:text-gray-300 hover:text-bank-600 dark:hover:text-bank-400 transition-colors"
              >
                FAQs
              </button>
              <button
                onClick={() => scrollToSection('use-cases')}
                className="text-gray-600 dark:text-gray-300 hover:text-bank-600 dark:hover:text-bank-400 transition-colors"
              >
                Use Cases
              </button>
              <button
                onClick={() => scrollToSection('online-banking-awareness')}
                className="text-gray-600 dark:text-gray-300 hover:text-bank-600 dark:hover:text-bank-400 transition-colors"
              >
                Security Guide
              </button>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
