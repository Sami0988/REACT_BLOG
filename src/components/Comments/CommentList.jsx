import React from 'react';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

const CommentList = ({ comments }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy • h:mm a');
    } catch {
      return 'Unknown date';
    }
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No comments yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <div 
          key={comment.id}
          className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-gray-900 dark:text-white">
                  {comment.user?.name || 'Anonymous'}
              </span>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(comment.created_at)} 

                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;