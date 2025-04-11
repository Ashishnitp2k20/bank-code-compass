import { Link } from "react-router-dom";
import { Building2, Github, Twitter, Linkedin, Mail, Shield, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-bank-600 to-bank-800 dark:from-gray-900 dark:to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Bank Code Compass</h3>
            <p className="text-white/80 dark:text-gray-300">
              Your trusted companion for accurate bank details and IFSC codes. We provide reliable and up-to-date information for all your banking needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#faqs" className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#use-cases" className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 dark:border-gray-700 text-center text-white/60 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bank Code Compass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
