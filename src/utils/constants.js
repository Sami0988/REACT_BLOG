export const MOCK_POSTS = [
  {
    id: 1,
    title: "Getting Started with React 18",
    content: "React 18 introduces several new features including concurrent rendering, automatic batching, and new hooks. In this comprehensive guide, we'll explore how these features can improve your application's performance and user experience.",
    author: { name: "Sarah Johnson", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    comments: [
      {
        id: 1,
        content: "Great explanation! The concurrent rendering section was particularly helpful.",
        author: { name: "Mike Chen" },
        createdAt: "2024-01-15T14:20:00Z"
      },
      {
        id: 2,
        content: "Thanks for sharing this. Looking forward to implementing these features in my projects.",
        author: { name: "Emma Davis" },
        createdAt: "2024-01-15T16:45:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Modern CSS Techniques for Better UX",
    content: "Discover the latest CSS techniques that can transform your user interface. From CSS Grid and Flexbox to custom properties and container queries, we'll cover everything you need to create responsive, accessible designs.",
    author: { name: "Alex Rodriguez", avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150" },
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T09:15:00Z",
    comments: [
      {
        id: 3,
        content: "The container queries section blew my mind! Can't wait to use this in production.",
        author: { name: "Lisa Park" },
        createdAt: "2024-01-14T12:30:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "Building Scalable Node.js Applications",
    content: "Learn how to architect Node.js applications that can handle millions of users. We'll explore microservices, database optimization, caching strategies, and deployment best practices.",
    author: { name: "David Kim", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150" },
    createdAt: "2024-01-13T15:45:00Z",
    updatedAt: "2024-01-13T15:45:00Z",
    comments: []
  },
  {
    id: 4,
    title: "The Future of Web Development",
    content: "Exploring emerging trends in web development including WebAssembly, Progressive Web Apps, and the Jamstack architecture. What should developers focus on in 2024?",
    author: { name: "Maria Garcia", avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150" },
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-12T11:20:00Z",
    comments: [
      {
        id: 4,
        content: "WebAssembly is definitely the future! Great insights on performance benefits.",
        author: { name: "John Smith" },
        createdAt: "2024-01-12T13:10:00Z"
      },
      {
        id: 5,
        content: "PWAs have been game-changing for our mobile users.",
        author: { name: "Rachel Green" },
        createdAt: "2024-01-12T14:55:00Z"
      }
    ]
  }
];

export const MOCK_USER = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
};