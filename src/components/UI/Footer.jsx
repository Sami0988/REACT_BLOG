import React from 'react';
import { Heart, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore'

const Footer = () => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t mt-16`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>BlogHub</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              A platform for writers and readers to connect and share stories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>Explore</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Popular Posts</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Recent Posts</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Top Writers</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Categories</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>About Us</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Careers</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Privacy Policy</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Help Center</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Contact Us</a></li>
              <li><a href="#" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>FAQs</a></li>
            </ul>
          </div>
        </div>
        
        <div className={`${isDark ? 'border-gray-800' : 'border-gray-200'} mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm flex items-center`}>
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by BlogHub Team
          </p>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm mt-4 md:mt-0`}>
            © {new Date().getFullYear()} BlogHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
