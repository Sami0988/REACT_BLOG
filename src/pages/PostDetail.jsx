import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Edit, Trash2, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import CommentList from '../components/Comments/CommentList';
import CommentForm from '../components/Comments/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { comments, fetchComments, currentPost, isLoading, error, fetchPost, deletePost, addComment } = usePostsStore();
  const { user } = useAuthStore();
  const { isDark } = useThemeStore();
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPost(id);
    fetchComments(id);
  }, [id]);

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const result = await deletePost(parseInt(id));
      if (result.success) {
        navigate('/dashboard');
      }
    }
  };

  const handleAddComment = async (content) => {
    setIsSubmittingComment(true);
    try {
      const result = await addComment(parseInt(id), content);
      if (result.success) return true;
      alert(result.error || 'Failed to add comment');
      return false;
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy • h:mm a');
    } catch {
      return 'Unknown date';
    }
  };

  const isAuthor = user && currentPost && user.id === currentPost.user_id;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
        <div className={`rounded-lg p-6 max-w-md mx-auto border ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
          <p className="mb-4">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="text-center py-12">
        <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Post not found</h1>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div data-aos="fade-right">
        <Link
          to="/"
          className={`inline-flex items-center transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Link>
      </div>

      <article
        className={`backdrop-blur-sm rounded-2xl shadow-xl border overflow-hidden ${isDark ? 'bg-gray-800/80 border-gray-700/50 text-white' : 'bg-white/80 border-gray-200/50 text-gray-900'}`}
        data-aos="fade-up"
      >
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={`https://ui-avatars.com/api/?name=${currentPost.author_name || 'Unknown'}`}
                alt={currentPost.author_name}
                className={`w-12 h-12 rounded-full border-2 ${isDark ? 'border-blue-400' : 'border-blue-200'}`}
              />
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {currentPost.author_name || 'Unknown Author'}
                </p>
                <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(currentPost.created_at)}
                </div>
              </div>
            </div>

            {isAuthor && (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/edit-post/${currentPost.id}`}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-900/20' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                  title="Edit post"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleDeletePost}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}
                  title="Delete post"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <h1 className={`text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {currentPost.title}
          </h1>
        </div>

        <div className="p-8">
          <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : 'prose-gray'}`}>
            {(currentPost?.description || '').split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <div
        className={`backdrop-blur-sm rounded-2xl shadow-xl border overflow-hidden ${isDark ? 'bg-gray-800/80 border-gray-700/50 text-white' : 'bg-white/80 border-gray-200/50 text-gray-900'}`}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Comments ({currentPost.comments?.length || 0})
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <CommentForm onSubmit={handleAddComment} isSubmitting={isSubmittingComment} />
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
