import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeInUp, staggerList } from "@/lib/theme";

export default function PanIndia() {
  return (
    <Layout>
      <Helmet>
        <title>Pan-India Presence | Shanvi Properties</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center mb-12">
          <motion.div 
             initial="hidden"
             animate="visible"
             variants={staggerList}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Across the Nation</motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-xl">
              Expanding our footprint beyond Madhya Pradesh. Delivering excellence in every major city.
            </motion.p>
          </motion.div>
        </div>

        {/* Interactive Map Placeholder */}
        <div className="container mx-auto px-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] md:h-[700px] bg-white rounded-[2.5rem] border border-gray-200 shadow-2xl overflow-hidden flex items-center justify-center group"
          >
            {/* Stylized Map Graphic */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/India_map_en.svg/1200px-India_map_en.svg.png')] bg-center bg-contain bg-no-repeat scale-90 md:scale-100 transition-transform duration-1000 group-hover:scale-105" />
            
            {/* Animated Pins */}
            {[
              { top: "45%", left: "48%", label: "Bhopal" },
              { top: "43%", left: "49%", label: "Vidisha" },
              { top: "28%", left: "45%", label: "Delhi" },
              { top: "65%", left: "40%", label: "Mumbai" },
              { top: "70%", left: "55%", label: "Hyderabad" },
              { top: "35%", left: "35%", label: "Jaipur" },
              { top: "80%", left: "50%", label: "Bangalore" },
            ].map((pin, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer"
                style={{ top: pin.top, left: pin.left }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                <div className="relative group/pin flex flex-col items-center">
                  <MapPin className="w-8 h-8 md:w-10 md:h-10 text-saffron fill-saffron/20 drop-shadow-md animate-bounce" />
                  <div className="absolute -top-10 md:-top-12 bg-black text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/pin:opacity-100 transition-all whitespace-nowrap shadow-xl transform translate-y-2 group-hover/pin:translate-y-0">
                    {pin.label}
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"></div>
                  </div>
                  <div className="w-3 h-3 bg-saffron/30 rounded-full absolute bottom-0 animate-ping" />
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
              <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-2">Interactive Map View</p>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-saffron text-sm font-bold"
              >
                Hover over regions to explore
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Region Cards */}
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { region: "North India", cities: "Delhi, Jaipur, Lucknow" }, 
              { region: "Central India", cities: "Bhopal, Indore, Vidisha" }, 
              { region: "West India", cities: "Mumbai, Pune, Ahmedabad" }, 
              { region: "South India", cities: "Bangalore, Hyderabad, Chennai" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="p-8 border border-gray-200 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-saffron/5 hover:to-transparent transition-all cursor-pointer shadow-sm hover:shadow-xl group"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-saffron transition-colors">{item.region}</h3>
                <p className="text-gray-500 font-medium mb-4">{item.cities}</p>
                <div className="flex items-center text-saffron font-bold text-sm">
                  <span>View Projects</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}