import React from 'react';
import { Heart, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">BlogHub</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A platform for writers and readers to connect and share stories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Popular Posts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Recent Posts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Top Writers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Categories</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:hover:text-white">FAQs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by BlogHub Team
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} BlogHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;