import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PenTool, Plus, Edit, Trash2, Eye, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usePostsStore } from '../store/postsStore';
import { MOCK_POSTS, MOCK_USER } from '../utils/constants';
import { format } from 'date-fns';
import DeleteConfirmation from '../components/UI/DeleteConfirmation';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { userPosts, isLoading, error, fetchUserPosts, deletePost } = usePostsStore();

    const [postToDelete, setPostToDelete] = React.useState(null);

useEffect(() => {
  if (isAuthenticated) {
    usePostsStore.getState().fetchUserPosts();
  }
}, [isAuthenticated]);




  const handleDelete = async () => {
    const result = await deletePost(postToDelete.id);
    setPostToDelete(null);
    if (result.success) {
      toast.success('Post deleted successfully!');
    } else {
      toast.error(result.error);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Unknown date';
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        data-aos="fade-up"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <img
              src={user?.avatar || MOCK_USER.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name || MOCK_USER.name}!</h1>
              <p className="text-blue-100">Manage your posts and continue writing</p>
            </div>
          </div>
          
          <Link
            to="/create-post"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Write New Post
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-4">
              <PenTool className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{userPosts.length}</p>
              <p className="text-gray-600 dark:text-gray-300">Total Posts</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2K</p>
              <p className="text-gray-600 dark:text-gray-300">Total Views</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
              <p className="text-gray-600 dark:text-gray-300">Total Comments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Posts</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and edit your published content</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="p-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        ) : userPosts.length === 0 ? (
          <div className="text-center py-12">
            <PenTool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start sharing your thoughts with the world!
            </p>
            <Link
              to="/create-post"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {userPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link 
                      to={`/posts/${post.id}`}
                      className="block group"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                        {post?.description?.substring(0, 100) || 'No description available'}...
                      </p>
                    </Link>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Published {formatDate(post.createdAt)}</span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {Math.floor(Math.random() * 500) + 50} views
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments?.length || 0} comments
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                     to={`/edit-post/${post.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit post"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                       onClick={() => setPostToDelete(post)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

       <DeleteConfirmation
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;