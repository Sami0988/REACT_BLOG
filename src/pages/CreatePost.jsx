import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PenTool, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usePostsStore } from '../store/postsStore';
import { toast } from 'react-toastify';

const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(50, 'Description must be at least 50 characters'),
});

const CreatePost = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { createPost, isLoading, error, clearError } = usePostsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchedDescription = watch('description', '');

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data) => {
    try {
      const result = await createPost(data);
      if (result.success) {
        toast.success("🎉 Post created successfully!");
        navigate('/dashboard');
      } else {
        toast.error("❌ Failed to create post. Please try again.");
      }
    } catch (error) {
      toast.error("🚨 An unexpected error occurred.");
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div 
        className="flex items-center justify-between"
        data-aos="fade-right"
      >
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        
        <div className="flex items-center space-x-3">
          <PenTool className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Post
          </h1>
        </div>
      </div>

      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8"
        data-aos="fade-up"
      >
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-lg"
              placeholder="Enter an engaging title for your post..."
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {watchedDescription.length} characters
              </span>
            </div>
            <textarea
              id="description"
              rows={15}
              {...register('description')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              placeholder="Write a meaningful description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Publishing...
                </div>
              ) : (
                'Publish Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
