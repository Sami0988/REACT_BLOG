import React from 'react';
import { Search } from 'lucide-react';



const SearchBox = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
 
  return (
    <div 
      className="relative max-w-md mx-auto mb-8"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search posts, authors, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default SearchBox;