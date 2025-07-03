import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Edit, Trash2, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import CommentList from '../components/Comments/CommentList';
import CommentForm from '../components/Comments/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {comments, fetchComments, currentPost, isLoading, error, fetchPost, deletePost, addComment } = usePostsStore();
  const { user } = useAuthStore();
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPost(id); // ✅ using real API
  }, [id]);

    useEffect(() => {
    fetchComments(id);
  }, [id]);

  console.log("this is from project details",comments)

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
      if (result.success) {
        return true;
      } else {
        alert(result.error || 'Failed to add comment');
        return false;
      }
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
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
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
      {/* Back Button */}
      <div data-aos="fade-right">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Link>
      </div>

      {/* Post Content */}
      <article 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={`https://ui-avatars.com/api/?name=${currentPost.author_name || 'Unknown'}`}
                alt={currentPost.author_name}
                className="w-12 h-12 rounded-full border-2 border-blue-200 dark:border-blue-400"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {currentPost.author_name || 'Unknown Author'}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(currentPost.created_at)}
                </div>
              </div>
            </div>

            {isAuthor && (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/edit-post/${currentPost.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit post"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleDeletePost}
                  className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete post"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {currentPost.title}
          </h1>
        </div>

        {/* Post Body */}
        <div className="p-8">
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            {(currentPost?.description || '').split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Comments ({currentPost.comments?.length || 0})
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <CommentForm 
            onSubmit={handleAddComment}
            isSubmitting={isSubmittingComment}
          />
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
