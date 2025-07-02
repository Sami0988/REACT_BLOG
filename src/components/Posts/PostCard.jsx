import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, MessageCircle, Heart, Share2, Eye } from 'lucide-react';
import { format } from 'date-fns';

const PostCard = ({ post, delay = 0 }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Unknown date';
    }
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <article 
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:transform hover:-translate-y-2"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Card Header */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <img
            src={post.author?.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150`}
            alt={post.author?.name}
            className="w-10 h-10 rounded-full border-2 border-blue-200 dark:border-blue-400 mr-3"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">
              {post.author?.name || 'Unknown Author'}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        {/* Post Title */}
        <Link to={`/posts/${post.id}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Post Content Preview */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {truncateContent(post.content)}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{isLiked ? '1' : '0'}</span>
            </button>

            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments?.length || 0}</span>
            </div>

            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <Link
            to={`/posts/${post.id}`}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Read More</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;