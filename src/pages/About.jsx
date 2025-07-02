import React from 'react';
import { Users, BookOpen, Globe, Award } from 'lucide-react';
import Footer from '../components/UI/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-blue-600">BlogHub</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our mission is to create a platform where writers and readers can connect, share ideas, and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quality Content</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We prioritize meaningful, well-crafted content that adds value to our community.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Community First</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our platform is built by and for our community of writers and readers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                    <Globe className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Diversity</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We celebrate diverse voices and perspectives from around the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Join Our Community</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
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
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default About;