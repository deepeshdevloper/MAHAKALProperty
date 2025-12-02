import { useState } from "react";
import { Layout } from "@/components/layout";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon, 
  MapPin, 
  IndianRupee, 
  Bed, 
  Bath, 
  Maximize,
  Search,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock Data for initial state
const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "Luxury Villa with Garden",
    location: "Arera Colony, Bhopal",
    price: "1.5 Cr",
    type: "Residential",
    beds: 4,
    baths: 3,
    area: "2400 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop",
    status: "Available"
  },
  {
    id: 2,
    title: "Premium Commercial Space",
    location: "MP Nagar, Bhopal",
    price: "85 Lakh",
    type: "Commercial",
    beds: 0,
    baths: 1,
    area: "1200 sqft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    status: "Available"
  },
  {
    id: 3,
    title: "Modern Apartment",
    location: "Civil Lines, Vidisha",
    price: "35 Lakh",
    type: "Residential",
    beds: 2,
    baths: 2,
    area: "1100 sqft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop",
    status: "Sold"
  },
  {
    id: 4,
    title: "Agricultural Land",
    location: "Sanchi Road, Raisen",
    price: "45 Lakh",
    type: "Land",
    beds: 0,
    baths: 0,
    area: "2 Acres",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    status: "Available"
  }
];

const propertySchema = z.object({
  title: z.string().min(3, "Title is required"),
  location: z.string().min(3, "Location is required"),
  price: z.string().min(1, "Price is required"),
  type: z.enum(["Residential", "Commercial", "Land", "Industrial"]),
  beds: z.coerce.number().min(0),
  baths: z.coerce.number().min(0),
  area: z.string().min(1, "Area is required"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["Available", "Sold", "Pending"])
});

type PropertyForm = z.infer<typeof propertySchema>;

export default function AdminPage() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      location: "",
      price: "",
      type: "Residential",
      beds: 0,
      baths: 0,
      area: "",
      image: "",
      status: "Available"
    }
  });

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (property: any) => {
    setIsEditing(property.id);
    setIsAdding(false);
    setValue("title", property.title);
    setValue("location", property.location);
    setValue("price", property.price);
    setValue("type", property.type);
    setValue("beds", property.beds);
    setValue("baths", property.baths);
    setValue("area", property.area);
    setValue("image", property.image);
    setValue("status", property.status);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter(p => p.id !== id));
      toast({
        title: "Property Deleted",
        description: "The property has been removed from the listing.",
        variant: "destructive"
      });
    }
  };

  const onSubmit = (data: PropertyForm) => {
    if (isEditing) {
      setProperties(properties.map(p => 
        p.id === isEditing ? { ...p, ...data, id: isEditing } : p
      ));
      setIsEditing(null);
      toast({
        title: "Property Updated",
        description: "Changes have been saved successfully.",
      });
    } else {
      const newId = Math.max(...properties.map(p => p.id), 0) + 1;
      setProperties([{ ...data, id: newId, image: data.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop" }, ...properties]);
      setIsAdding(false);
      toast({
        title: "Property Added",
        description: "New property has been added to the listing.",
      });
    }
    reset();
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    reset();
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Dashboard | JSM Properties</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Property Management</h1>
              <p className="text-gray-600 mt-1">Manage your listings, add new properties, and track status.</p>
            </div>
            <button 
              onClick={() => { setIsAdding(true); setIsEditing(null); reset(); }}
              className="bg-saffron text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-saffron/90 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Property
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search properties by name or location..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">Showing {filteredProperties.length} properties</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Property List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {filteredProperties.map((property) => (
                  <motion.div 
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    layout
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:shadow-md transition-all"
                  >
                    <div className="sm:w-48 h-48 sm:h-auto relative bg-gray-200 shrink-0">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold text-white ${
                        property.status === 'Available' ? 'bg-green-500' : 
                        property.status === 'Sold' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}>
                        {property.status}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{property.type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 mb-4 text-sm">
                          <MapPin className="w-4 h-4 text-saffron" /> {property.location}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          {property.type !== "Land" && (
                            <>
                              <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.beds}</span>
                              <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.baths}</span>
                            </>
                          )}
                          <span className="flex items-center gap-1"><Maximize className="w-4 h-4" /> {property.area}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="text-xl font-bold text-saffron flex items-center">
                          <IndianRupee className="w-5 h-5" /> {property.price}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(property)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(property.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredProperties.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500">No properties found matching your search.</p>
                </div>
              )}
            </div>

            {/* Editor Panel */}
            <div className="lg:col-span-1">
              <AnimatePresence>
                {(isEditing || isAdding) && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        {isAdding ? "Add New Property" : "Edit Property"}
                      </h2>
                      <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                        <input 
                          {...register("title")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                          placeholder="e.g. Luxury Villa"
                        />
                        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input 
                          {...register("location")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                          placeholder="e.g. Arera Colony, Bhopal"
                        />
                        {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                          <input 
                            {...register("price")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                            placeholder="e.g. 1.5 Cr"
                          />
                          {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select 
                            {...register("type")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                          >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                            <option value="Industrial">Industrial</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
                          <input 
                            type="number"
                            {...register("beds")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
                          <input 
                            type="number"
                            {...register("baths")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                          <input 
                            {...register("area")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                            placeholder="sqft"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                          {...register("status")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                        >
                          <option value="Available">Available</option>
                          <option value="Pending">Pending</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input 
                            {...register("image")}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                            placeholder="https://..."
                          />
                        </div>
                        {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button 
                          type="button" 
                          onClick={handleCancel}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="flex-1 px-4 py-2 bg-saffron text-white rounded-lg hover:bg-saffron/90 transition-colors flex justify-center items-center gap-2"
                        >
                          <Save className="w-4 h-4" /> Save
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isEditing && !isAdding && (
                <div className="bg-saffron/5 border border-saffron/20 rounded-xl p-6 text-center">
                  <p className="text-saffron font-medium mb-4">Manage your real estate portfolio efficiently.</p>
                  <button 
                    onClick={() => { setIsAdding(true); reset(); }}
                    className="w-full bg-white text-saffron border border-saffron font-bold py-3 rounded-lg hover:bg-saffron hover:text-white transition-all"
                  >
                    Add New Property
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
