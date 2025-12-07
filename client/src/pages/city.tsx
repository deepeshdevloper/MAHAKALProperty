import { Helmet } from "react-helmet";
import { useRoute, Link } from "wouter";
import { Layout } from "@/components/layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { useProperties } from "@/lib/property-context";
import stockImageBhopal from '@assets/stock_images/bhopal_city_landmark_352490aa.jpg';
import stockImageVidisha from '@assets/stock_images/vidisha_india_ancien_3af2e5ab.jpg';
import stockImageRaisen from '@assets/stock_images/raisen_fort_india_or_fa5b3019.jpg';
import { fadeInUp, staggerList, cardHover } from "@/lib/theme";

// Mock Data
const CITY_DATA: Record<string, { title: string, desc: string, stats: any[], image: string }> = {
  bhopal: {
    title: "Bhopal",
    desc: "The City of Lakes offers a perfect blend of nature and modern infrastructure.",
    stats: [
      { label: "Avg Price/sqft", value: "₹3,500" },
      { label: "New Projects", value: "45+" },
      { label: "Rental Yield", value: "3.5%" },
    ],
    image: stockImageBhopal
  },
  vidisha: {
    title: "Vidisha",
    desc: "A historic city with rapidly growing residential and commercial hubs.",
    stats: [
      { label: "Avg Price/sqft", value: "₹2,200" },
      { label: "New Projects", value: "12+" },
      { label: "Growth Rate", value: "8.2%" },
    ],
    image: stockImageVidisha
  },
  raisen: {
    title: "Raisen",
    desc: "Emerging investment hotspot with scenic views and heritage.",
    stats: [
      { label: "Avg Price/sqft", value: "₹1,800" },
      { label: "Land Available", value: "High" },
      { label: "Appreciation", value: "10%" },
    ],
    image: stockImageRaisen
  }
};

export default function CityPage() {
  const [match, params] = useRoute("/city/:name");
  const cityName = params?.name?.toLowerCase() || "bhopal";
  const cityInfo = CITY_DATA[cityName] || CITY_DATA["bhopal"];
  const { properties, getImageUrl } = useProperties();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  // Filter properties by city (simple case-insensitive match)
  const cityProperties = properties.filter(
    p => (p.city?.toLowerCase() === cityName) || 
         p.location.toLowerCase().includes(cityName)
  );

  return (
    <Layout transparent={true}>
      <Helmet>
        <title>Real Estate in {cityInfo.title} | Shanvi Properties</title>
      </Helmet>

      {/* City Hero */}
      <div className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
           <div className="w-full h-full bg-black/40 absolute inset-0 z-10" />
           <img 
             src={cityInfo.image} 
             className="w-full h-full object-cover scale-110"
             alt={cityName}
           />
        </motion.div>
        
        <div className="relative z-20 text-center container px-4">
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-4 drop-shadow-lg tracking-tight"
          >
            {cityInfo.title}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium"
          >
            {cityInfo.desc}
          </motion.p>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border-y border-gray-200 bg-white shadow-sm relative z-30"
      >
        <div className="container mx-auto px-4 py-8 flex flex-wrap justify-center gap-8 md:gap-24">
          {cityInfo.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-saffron font-bold text-2xl md:text-3xl font-serif mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Listings */}
      <div className="py-24 container mx-auto px-4 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900">Featured Listings</h2>
          <button className="text-sm text-saffron border border-saffron/30 px-6 py-2 rounded-full hover:bg-saffron/10 transition-colors font-bold">
            Filter Properties
          </button>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerList}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cityProperties.map((prop) => (
            <motion.div 
              key={prop.id}
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              custom={cardHover}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium group transition-all duration-300 hover:border-saffron/30"
            >
              <motion.div variants={cardHover} className="h-full flex flex-col">
                <div className="h-72 relative overflow-hidden">
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
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                     <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-saffron transition-colors">{prop.title}</h3>
                     {prop.status === 'Sold' && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">SOLD</span>}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 font-medium">
                    <MapPin className="w-4 h-4 text-saffron" />
                    {prop.location}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-100 mb-6 mt-auto">
                    <div className="flex flex-col items-center gap-1">
                      <Bed className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                      <span className="text-xs font-bold text-gray-600">{prop.beds} Beds</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Bath className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                      <span className="text-xs font-bold text-gray-600">{prop.baths} Baths</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Maximize className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                      <span className="text-xs font-bold text-gray-600">{prop.area}</span>
                    </div>
                  </div>

                  <Link href="/contact" className="w-full block text-center bg-gray-50 border border-gray-200 hover:bg-black hover:border-black hover:text-white text-gray-900 py-4 rounded-xl transition-all font-bold tracking-wide">
                      View Details
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
          {cityProperties.length === 0 && (
            <div className="col-span-full text-center py-20">
               <p className="text-gray-500 text-lg">No properties listed in this city yet.</p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}