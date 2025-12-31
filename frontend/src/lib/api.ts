const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Auth helpers
const getAuthToken = () => localStorage.getItem('token');

const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface Item {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  status: 'lost' | 'found' | 'claimed';
  date: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

// Auth API
export const authApi = {
  signup: async (data: { name: string; email: string; password: string; phone?: string }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    const result = await response.json();
    localStorage.setItem('token', result.token);
    return result;
  },

  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    const result = await response.json();
    localStorage.setItem('token', result.token);
    return result;
  },

  logout: async (): Promise<void> => {
    const token = getAuthToken();
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { ...getAuthHeaders() },
      });
    }
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
    if (!response.ok) {
      throw new Error('Failed to get user');
    }
    const data = await response.json();
    return data.user;
  },

  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },
};

// Upload API
export const uploadApi = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: { ...getAuthHeaders() },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload image');
    }

    const data = await response.json();
    return data.imageUrl;
  },
};

// Items API
export const itemsApi = {
  // Get all items
  getAll: async (): Promise<Item[]> => {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    const data = await response.json();
    return data.map((item: any) => ({ ...item, id: item._id }));
  },

  // Get single item
  getById: async (id: string): Promise<Item> => {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) throw new Error('Failed to fetch item');
    const data = await response.json();
    return { ...data, id: data._id };
  },

  // Create new item (requires auth)
  create: async (item: Omit<Item, 'id' | 'date' | 'contactName' | 'contactEmail' | 'user'> & { contactPhone: string }): Promise<Item> => {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create item');
    }
    const data = await response.json();
    return { ...data, id: data._id };
  },

  // Update item (requires auth)
  update: async (id: string, item: Partial<Item>): Promise<Item> => {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update item');
    }
    const data = await response.json();
    return { ...data, id: data._id };
  },

  // Delete item (requires auth)
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete item');
    }
  },

  // Search items
  search: async (query: string): Promise<Item[]> => {
    const response = await fetch(`${API_BASE_URL}/items/search/query?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search items');
    const data = await response.json();
    return data.map((item: any) => ({ ...item, id: item._id }));
  },
};
