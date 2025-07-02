import React from 'react';
import PostCard from './PostCard';
import { FileText } from 'lucide-react';

const PostList = ({ posts, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div 
        className="text-center py-12"
        data-aos="fade-up"
      >
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 max-w-md mx-auto">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search terms or check back later for new content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard 
          key={post.id} 
          post={post} 
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default PostList;