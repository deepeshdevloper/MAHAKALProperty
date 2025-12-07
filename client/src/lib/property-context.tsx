import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { apiRequest, getUploadsUrl } from './api';

export type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  type: "Residential" | "Commercial" | "Land" | "Industrial";
  beds: number;
  baths: number;
  area: string;
  image: string;
  status: "Available" | "Sold" | "Pending";
  city?: string;
};

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  addProperty: (property: FormData) => Promise<Property>;
  updateProperty: (id: number, property: FormData) => Promise<Property>;
  deleteProperty: (id: number) => Promise<void>;
  getImageUrl: (path: string) => string;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiRequest('/api/properties');
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const addProperty = async (formData: FormData): Promise<Property> => {
    const response = await apiRequest('/api/properties', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to add property');
    }
    const newProperty = await response.json();
    setProperties(prev => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = async (id: number, formData: FormData): Promise<Property> => {
    const response = await apiRequest(`/api/properties/${id}`, {
      method: 'PUT',
      body: formData
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to update property');
    }
    const updatedProperty = await response.json();
    setProperties(prev => prev.map(p => p.id === id ? updatedProperty : p));
    return updatedProperty;
  };

  const deleteProperty = async (id: number): Promise<void> => {
    const response = await apiRequest(`/api/properties/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to delete property');
    }
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const getImageUrl = (path: string) => getUploadsUrl(path);

  return (
    <PropertyContext.Provider value={{ properties, loading, error, fetchProperties, addProperty, updateProperty, deleteProperty, getImageUrl }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
}
