// src/services/usersService.ts
import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Replace with your Strapi backend URL

export const usersService = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  createUser: async (userData: any) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (id: string, userData: any) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },
};