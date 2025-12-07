import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Search, Filter, ArrowRight } from "lucide-react";
import { useProperties } from "@/lib/property-context";
import { Link } from "wouter";
import { useState } from "react";
import { fadeInUp, staggerList, cardHover } from "@/lib/theme";

export default function PropertiesPage() {
  const { properties, getImageUrl } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <Helmet>
        <title>All Properties | Shanvi Properties</title>
        <meta name="description" content="Browse our complete collection of premium properties in Bhopal, Vidisha, and Raisen." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="text-center mb-12"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">Our Properties</motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our handpicked selection of residential and commercial properties suited for every need.
            </motion.p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-[1.5rem] shadow-lg border border-gray-100 mb-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by location or property name..." 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {["All", "Residential", "Commercial", "Land", "Industrial"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    typeFilter === type 
                      ? "bg-black text-white shadow-md" 
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Listings Grid */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((prop) => (
              <motion.div 
                key={prop.id}
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                custom={cardHover}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium group transition-all duration-300 hover:border-saffron/30"
              >
                <motion.div variants={cardHover} className="h-full flex flex-col">
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={getImageUrl(prop.image)} 
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 shadow-sm">
                      {prop.type}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-saffron text-white font-bold px-4 py-2 rounded-lg shadow-lg text-lg">
                        {prop.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                       <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-saffron transition-colors">{prop.title}</h3>
                       {prop.status === 'Sold' && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">SOLD</span>}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 font-medium">
                      <MapPin className="w-4 h-4 text-saffron" />
                      {prop.location}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-100 mb-6 mt-auto">
                      {prop.type !== "Land" ? (
                        <>
                          <div className="flex flex-col items-center gap-1">
                            <Bed className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                            <span className="text-xs font-bold text-gray-600">{prop.beds} Beds</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <Bath className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                            <span className="text-xs font-bold text-gray-600">{prop.baths} Baths</span>
                          </div>
                        </>
                      ) : (
                         <div className="col-span-2 flex items-center gap-2 text-gray-500 text-sm">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Plot / Land</span>
                         </div>
                      )}
                      <div className="flex flex-col items-center gap-1">
                        <Maximize className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                        <span className="text-xs font-bold text-gray-600">{prop.area}</span>
                      </div>
                    </div>

                    <Link href="/contact" className="w-full block text-center bg-gray-50 border border-gray-200 hover:bg-black hover:border-black hover:text-white text-gray-900 py-3 rounded-xl transition-all font-bold tracking-wide">
                        View Details
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {filteredProperties.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
                 <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
                 <p className="text-gray-500">Try adjusting your search or filters.</p>
                 <button 
                   onClick={() => { setSearchTerm(""); setTypeFilter("All"); }}
                   className="mt-4 text-saffron font-bold hover:underline"
                 >
                   Clear Filters
                 </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
