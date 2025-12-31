const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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
}

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

  // Create new item
  create: async (item: Omit<Item, 'id' | 'date'>): Promise<Item> => {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to create item');
    const data = await response.json();
    return { ...data, id: data._id };
  },

  // Update item
  update: async (id: string, item: Partial<Item>): Promise<Item> => {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to update item');
    const data = await response.json();
    return { ...data, id: data._id };
  },

  // Delete item
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete item');
  },

  // Search items
  search: async (query: string): Promise<Item[]> => {
    const response = await fetch(`${API_BASE_URL}/items/search/query?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search items');
    const data = await response.json();
    return data.map((item: any) => ({ ...item, id: item._id }));
  },
};
