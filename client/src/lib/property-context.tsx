import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  city?: string; // Optional for filtering
};

// Initial Mock Data
const INITIAL_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Luxury Villa with Garden",
    location: "Arera Colony, Bhopal",
    price: "₹1.5 Cr",
    type: "Residential",
    beds: 4,
    baths: 3,
    area: "2400 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
    city: "bhopal"
  },
  {
    id: 2,
    title: "Premium Commercial Space",
    location: "MP Nagar, Bhopal",
    price: "₹85 Lakh",
    type: "Commercial",
    beds: 0,
    baths: 1,
    area: "1200 sqft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
    city: "bhopal"
  },
  {
    id: 3,
    title: "Modern Apartment",
    location: "Civil Lines, Vidisha",
    price: "₹35 Lakh",
    type: "Residential",
    beds: 2,
    baths: 2,
    area: "1100 sqft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop",
    status: "Sold",
    city: "vidisha"
  },
  {
    id: 4,
    title: "Agricultural Land",
    location: "Sanchi Road, Raisen",
    price: "₹45 Lakh",
    type: "Land",
    beds: 0,
    baths: 0,
    area: "2 Acres",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
    city: "raisen"
  }
];

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, "id">) => void;
  updateProperty: (id: number, property: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or default
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('jsm-properties');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load properties from localStorage", e);
    }
    return INITIAL_PROPERTIES;
  });

  // Save to localStorage whenever properties change
  useEffect(() => {
    try {
      localStorage.setItem('jsm-properties', JSON.stringify(properties));
    } catch (e) {
      console.error("Failed to save properties to localStorage", e);
    }
  }, [properties]);

  const addProperty = (property: Omit<Property, "id">) => {
    const newId = Math.max(...properties.map(p => p.id), 0) + 1;
    setProperties([{ ...property, id: newId }, ...properties]);
  };

  const updateProperty = (id: number, updatedFields: Partial<Property>) => {
    setProperties(properties.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty }}>
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
