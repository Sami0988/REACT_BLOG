import { create } from 'zustand';
import api from '../utils/api';

export const usePostsStore = create((set, get) => ({
  posts: [],
  userPosts: [],
  currentPost: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  filteredPosts: [],

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterPosts();
  },

  filterPosts: () => {
    const { posts, searchQuery } = get();
    if (!searchQuery.trim()) {
      set({ filteredPosts: posts });
      return;
    }
    
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    set({ filteredPosts: filtered });
  },

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/posts');
      set({ 
        posts: response.data, 
        filteredPosts: response.data,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch posts', 
        isLoading: false 
      });
    }
  },

  fetchUserPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/my-posts');
      set({ userPosts: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch user posts', 
        isLoading: false 
      });
    }
  },

  fetchPost: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/posts/${id}`);
      set({ currentPost: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch post', 
        isLoading: false 
      });
    }
  },

  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/posts', postData);
      const newPost = response.data;
      set(state => ({ 
        posts: [newPost, ...state.posts],
        userPosts: [newPost, ...state.userPosts],
        filteredPosts: [newPost, ...state.filteredPosts],
        isLoading: false 
      }));
      return { success: true, post: newPost };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create post';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  updatePost: async (id, postData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/posts/${id}`, postData);
      const updatedPost = response.data;
      
      set(state => ({
        posts: state.posts.map(post => post.id === id ? updatedPost : post),
        userPosts: state.userPosts.map(post => post.id === id ? updatedPost : post),
        filteredPosts: state.filteredPosts.map(post => post.id === id ? updatedPost : post),
        currentPost: state.currentPost?.id === id ? updatedPost : state.currentPost,
        isLoading: false
      }));
      
      return { success: true, post: updatedPost };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update post';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  deletePost: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/posts/${id}`);
      set(state => ({
        posts: state.posts.filter(post => post.id !== id),
        userPosts: state.userPosts.filter(post => post.id !== id),
        filteredPosts: state.filteredPosts.filter(post => post.id !== id),
        isLoading: false
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete post';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  addComment: async (postId, content) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, { content });
      const newComment = response.data;
      
      set(state => ({
        currentPost: state.currentPost?.id === postId 
          ? { ...state.currentPost, comments: [...(state.currentPost.comments || []), newComment] }
          : state.currentPost
      }));
      
      return { success: true, comment: newComment };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add comment';
      return { success: false, error: message };
    }
  },

  clearError: () => set({ error: null }),
}));