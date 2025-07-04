import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Users, MessageCircle, TrendingUp } from 'lucide-react';
import SearchBox from '../components/UI/SearchBox';
import PostList from '../components/Posts/PostList';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import Footer from '../components/UI/Footer';
import About from './About';
import { useThemeStore } from '../store/themeStore'; // adjust path if needed

const Home = () => {
  const { filteredPosts, isLoading, error, fetchPosts } = usePostsStore();
  const { isAuthenticated } = useAuthStore();
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    usePostsStore.getState().fetchPosts();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div
          className="max-w-4xl mx-auto"
          data-aos="fade-up"
        >
          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Welcome to{' '}
            <span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              style={{
                // keep gradient colors same, no dark mode change here
              }}
            >
              BlogHub
            </span>
          </h1>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-white' : 'text-gray-600'
            }`}
          >
            Discover amazing stories, share your thoughts, and connect with a community of passionate writers and readers.
          </p>

          {!isAuthenticated && (
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
              >
                <PenTool className="w-5 h-5 mr-2" />
                Start Writing Today
              </Link>
              <Link
                to="/login"
                className={`inline-flex items-center px-8 py-3 border-2 rounded-lg transition-colors ${
                  isDark
                    ? 'border-blue-400 text-white hover:bg-blue-900/30'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Join the Community
              </Link>
            </div>
          )}
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              10K+
            </h3>
            <p className={`${isDark ? 'text-white' : 'text-gray-600'}`}>Active Writers</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              50K+
            </h3>
            <p className={`${isDark ? 'text-white' : 'text-gray-600'}`}>Stories Published</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              100K+
            </h3>
            <p className={`${isDark ? 'text-white' : 'text-gray-600'}`}>Conversations</p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <SearchBox />

      {/* Featured Posts Section */}
      <section>
        <div
          className="flex items-center justify-between mb-8"
          data-aos="fade-up"
        >
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className={`${isDark ? 'text-white' : 'text-gray-900'} text-3xl font-bold`}>
              Latest Posts
            </h2>
          </div>

          {isAuthenticated && (
            <Link
              to="/create-post"
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Write Post
            </Link>
          )}
        </div>

        <PostList
          posts={filteredPosts}
          isLoading={isLoading}
          error={error}
        />
      </section>
      <About />
    </div>
  );
};

export default Home;
