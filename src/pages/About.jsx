import React from 'react';
import { Users, BookOpen, Globe, Award } from 'lucide-react';
import Footer from '../components/UI/Footer';
import { useThemeStore } from '../store/themeStore';
const About = () => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={`min-h-screen flex flex-col `}>
      <main className="flex-grow">
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              About <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>BlogHub</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Our mission is to create a platform where writers and readers can connect, share ideas, and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Story</h2>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                <p>
                  BlogHub was founded in 2023 with a simple idea: to create a space where writers could share their stories without barriers and readers could discover content that matters to them.
                </p>
                <p>
                  What started as a small project has grown into a vibrant community of thousands of writers and readers from around the world.
                </p>
                <p>
                  We believe in the power of storytelling to connect people, share knowledge, and inspire change.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Values</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className={`${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} p-3 rounded-full`}>
                    <BookOpen className={`${isDark ? 'text-blue-400' : 'text-blue-600'} w-6 h-6`} />
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>Quality Content</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      We prioritize meaningful, well-crafted content that adds value to our community.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className={`${isDark ? 'bg-purple-900/30' : 'bg-purple-100'} p-3 rounded-full`}>
                    <Users className={`${isDark ? 'text-purple-400' : 'text-purple-600'} w-6 h-6`} />
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>Community First</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Our platform is built by and for our community of writers and readers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className={`${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'} p-3 rounded-full`}>
                    <Globe className={`${isDark ? 'text-indigo-400' : 'text-indigo-600'} w-6 h-6`} />
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>Diversity</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      We celebrate diverse voices and perspectives from around the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-8 md:p-12`}>
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
              <h2 className={`${isDark ? 'text-white' : 'text-gray-900'} text-3xl font-bold mb-6`}>Join Our Community</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xl mb-8`}>
                Whether you're a writer looking to share your stories or a reader looking for inspiration, BlogHub is the place for you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/register"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up Now
                </a>
                <a
                  href="/"
                  className={`${isDark ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-gray-700 border-gray-300 hover:bg-gray-50'} inline-flex items-center px-6 py-3 border rounded-lg transition-colors`}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
