import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function PanIndia() {
  return (
    <Layout>
      <Helmet>
        <title>Pan-India Presence | JSM Properties</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Across the Nation</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expanding our footprint beyond Madhya Pradesh. Delivering excellence in every major city.
          </p>
        </div>

        {/* Interactive Map Placeholder */}
        <div className="container mx-auto px-4 mb-20">
          <div className="relative w-full h-[400px] md:h-[600px] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex items-center justify-center group">
            {/* Stylized Map Graphic */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/India_map_en.svg/1200px-India_map_en.svg.png')] bg-center bg-contain bg-no-repeat" />
            
            {/* Animated Pins */}
            {[
              { top: "45%", left: "48%", label: "Bhopal" },
              { top: "43%", left: "49%", label: "Vidisha" },
              { top: "28%", left: "45%", label: "Delhi" },
              { top: "65%", left: "40%", label: "Mumbai" },
              { top: "70%", left: "55%", label: "Hyderabad" },
            ].map((pin, i) => (
              <motion.div
                key={i}
                className="absolute cursor-pointer"
                style={{ top: pin.top, left: pin.left }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                <div className="relative group/pin">
                  <MapPin className="w-8 h-8 text-saffron fill-saffron/20 drop-shadow-md animate-bounce" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    {pin.label}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="z-10 text-center">
              <p className="text-gray-400 font-mono text-sm">Interactive Map View</p>
              <p className="text-saffron text-xs mt-2">Hover over regions to explore</p>
            </div>
          </div>
        </div>

        {/* Region Cards */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["North India", "Central India", "West India", "South India"].map((region, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{region}</h3>
                <p className="text-gray-500 text-sm">View 15+ Projects</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}