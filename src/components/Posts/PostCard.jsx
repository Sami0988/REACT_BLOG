import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Heart, Share2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useThemeStore } from '../../store/themeStore';

const PostCard = ({ post, delay = 0 }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const isDark = useThemeStore((state) => state.isDark);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Unknown date';
    }
  };



  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <article 
  className={`
    group 
    ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-200'} 
    backdrop-blur-sm 
    rounded-2xl 
    shadow-lg 
    hover:shadow-xl 
    transition-all 
    duration-300 
    overflow-hidden 
    border 
    hover:transform 
    hover:-translate-y-2
  `}
  data-aos="fade-up"
>

      {/* Card Header */}
<div className={`p-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
  {/* Author Info */}
  <div className="flex items-center mb-4">
    <img
      src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
      alt={post.author_name}
      className={`w-10 h-10 rounded-full border-2 mr-3 ${isDark ? 'border-blue-400' : 'border-blue-200'}`}
    />
    <div className="flex-1">
      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {post.author_name || 'Unknown Author'}
      </p>
      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <Calendar className="w-4 h-4 mr-1" />
        {formatDate(post.created_at)}
      </div>
    </div>
  </div>

  {/* Post Title */}
  <Link to={`/posts/${post.id}`}>
    <h2 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors group-hover:text-blue-600 ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900'}`}>
      {post.title}
    </h2>
  </Link>

  {/* Description */}
  <p className={`mb-4 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
    {truncateContent(post.description)}
  </p>

  {/* Footer / Action Buttons */}
  <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setIsLiked(!isLiked)}
        className={`flex items-center space-x-1 text-sm transition-colors ${
          isLiked
            ? 'text-red-500 hover:text-red-600'
            : isDark
            ? 'text-gray-400 hover:text-red-400'
            : 'text-gray-500 hover:text-red-500'
        }`}
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        <span>{isLiked ? '1' : '0'}</span>
      </button>

      <div className={`flex items-center space-x-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <MessageCircle className="w-4 h-4" />
        <span>{post.comments?.length || 0}</span>
      </div>

      <button className={`flex items-center space-x-1 text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}>
        <Share2 className="w-4 h-4" />
      </button>
    </div>

    <Link
      to={`/posts/${post.id}`}
      className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
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
