import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout";
import { theme, fadeInUp, staggerList, scaleUp, buttonHover, cardHover } from "@/lib/theme";
import { ArrowRight, Map, Shield, TrendingUp, Bed, Bath, Maximize, MapPin, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useProperties } from "@/lib/property-context";
import stockImageBhopal from '@assets/stock_images/bhopal_city_landmark_352490aa.jpg';
import stockImageVidisha from '@assets/stock_images/vidisha_india_ancien_3af2e5ab.jpg';
import stockImageRaisen from '@assets/stock_images/raisen_fort_india_or_fa5b3019.jpg';

export default function Home() {
  const { properties, getImageUrl } = useProperties();
  const featuredProperties = properties.slice(0, 3);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <Layout>
      <Helmet>
        <title>Shanvi Property Solutions | Vidisha, Bhopal, Raisen</title>
        <meta name="description" content="Premium real estate services across Madhya Pradesh. Buy, sell, and invest in properties in Vidisha, Bhopal, and Raisen." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div style={{ y: y1, opacity: heroOpacity }} className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,153,51,0.18),_transparent_60%)]" />
          <motion.div style={{ y: y2, opacity: heroOpacity }} className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(226,181,82,0.18),_transparent_60%)]" />
          
          {/* Animated circles */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-saffron/10 rounded-full" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full" 
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-saffron/5 rounded-full" 
          />
          
          {/* Floating decorative elements */}
          <motion.div 
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-saffron/20 to-gold/20 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-gold/20 to-saffron/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="max-w-5xl mx-auto space-y-8"
          >
            <motion.div variants={scaleUp}>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-gradient-to-r from-saffron/10 to-gold/10 border border-saffron/20 text-saffron text-sm font-bold tracking-wider uppercase shadow-sm backdrop-blur-sm cursor-default"
              >
                <Sparkles className="w-4 h-4" />
                Devotion in Every Deal
              </motion.span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight text-gray-900 tracking-tight"
            >
              Find Your{" "}
              <span className="relative inline-block">
                <motion.span 
                  className="text-gradient-animated"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  Divine
                </motion.span>
                <motion.svg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                  className="absolute w-full h-4 -bottom-2 left-0 text-saffron/40" 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
                  <motion.path 
                    d="M0 5 Q 25 0 50 5 Q 75 10 100 5" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>{" "}
              Space
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Connecting you with premium properties across{" "}
              <motion.span whileHover={{ color: "#FF9933" }} className="font-semibold text-gray-900 transition-colors cursor-default">Vidisha</motion.span>,{" "}
              <motion.span whileHover={{ color: "#FF9933" }} className="font-semibold text-gray-900 transition-colors cursor-default">Bhopal</motion.span>, and{" "}
              <motion.span whileHover={{ color: "#FF9933" }} className="font-semibold text-gray-900 transition-colors cursor-default">Raisen</motion.span>.{" "}
              Experience a real estate journey rooted in trust and tradition.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/properties">
                <motion.button 
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="group px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-all shadow-lg flex items-center gap-2 justify-center hover:shadow-2xl hover:shadow-saffron/30 btn-shine"
                >
                  Explore Properties 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button 
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 border-2 border-gray-200 text-gray-900 font-bold rounded-full hover:bg-white hover:border-saffron/30 hover:shadow-lg transition-all flex items-center gap-2 justify-center backdrop-blur-sm"
                >
                  Book Consultation
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">Scroll</span>
          <motion.div 
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2"
          >
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-saffron rounded-full" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Latest Properties Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerList}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Latest Listings</h2>
              <p className="text-gray-600 max-w-xl text-lg">Explore our newest properties available for sale and rent.</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/properties" className="hidden md:flex items-center gap-2 text-saffron font-bold hover:text-black transition-colors group">
                View All Properties <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerList}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProperties.map((prop, index) => (
              <motion.div 
                key={prop.id}
                variants={fadeInUp}
                whileHover={{ y: -12, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group transition-all duration-500 hover:border-saffron/30 hover:shadow-2xl hover:shadow-saffron/10 card-hover-lift"
              >
                <div className="h-full flex flex-col">
                  <div className="h-72 relative overflow-hidden img-zoom">
                    <motion.img 
                      src={getImageUrl(prop.image)} 
                      alt={prop.title}
                      className="w-full h-full object-cover" 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 shadow-lg group-hover:bg-saffron group-hover:text-white transition-all duration-300"
                    >
                      {prop.type}
                    </motion.div>
                    
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-saffron to-amber-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg text-xl"
                      >
                        {prop.price}
                      </motion.span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-saffron transition-colors duration-300">{prop.title}</h3>
                      {prop.status === 'Sold' && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full"
                        >
                          SOLD
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 font-medium">
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin className="w-4 h-4 text-saffron" />
                      </motion.div>
                      {prop.location}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-100 mb-6 mt-auto">
                      {prop.type !== "Land" ? (
                        <>
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center gap-1"
                          >
                            <Bed className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors duration-300" />
                            <span className="text-xs font-bold text-gray-700">{prop.beds} Beds</span>
                          </motion.div>
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center gap-1"
                          >
                            <Bath className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors duration-300" />
                            <span className="text-xs font-bold text-gray-700">{prop.baths} Baths</span>
                          </motion.div>
                        </>
                      ) : (
                        <div className="col-span-2 flex items-center gap-2 text-gray-500 text-sm">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">Plot / Land</span>
                        </div>
                      )}
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <Maximize className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors duration-300" />
                        <span className="text-xs font-bold text-gray-700">{prop.area}</span>
                      </motion.div>
                    </div>

                    <Link href="/contact">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-center bg-gray-50 border border-gray-200 hover:bg-black hover:border-black hover:text-white text-gray-900 py-3 rounded-xl transition-all duration-300 font-bold tracking-wide btn-shine cursor-pointer"
                      >
                        View Details
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/properties" className="inline-flex items-center gap-2 text-saffron font-bold hover:text-black transition-colors">
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
            >
              Prime Locations
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 max-w-xl mx-auto text-lg"
            >
              Discover exclusive residential and commercial opportunities in the heart of Madhya Pradesh.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerList}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { name: "Bhopal", desc: "The City of Lakes", img: stockImageBhopal, link: "/city/bhopal" },
              { name: "Raisen", desc: "Historical Grandeur", img: stockImageRaisen, link: "/city/raisen" },
              { name: "Vidisha", desc: "Heritage & Harmony", img: stockImageVidisha, link: "/city/vidisha" },
            ].map((city, i) => (
              <Link key={i} href={city.link}>
                <motion.div 
                  variants={fadeInUp}
                  whileHover="hover"
                  initial="rest"
                  className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                  <motion.div 
                    variants={cardHover}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={city.img} 
                      alt={city.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  </motion.div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl font-serif font-bold text-white mb-2 drop-shadow-md">{city.name}</h3>
                    <p className="text-white/90 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium text-lg">
                      {city.desc}
                    </p>
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 w-fit px-6 py-3 rounded-full group-hover:bg-saffron group-hover:border-saffron group-hover:text-white transition-all duration-300">
                      View Properties <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="py-24 border-y border-gray-200 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,153,51,0.03),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerList}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: "Years Experience", value: "12+", icon: "🏆" },
              { label: "Properties Sold", value: "500+", icon: "🏠" },
              { label: "Happy Families", value: "450+", icon: "👨‍👩‍👧‍👦" },
              { label: "Cities Covered", value: "15+", icon: "📍" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={scaleUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-xl hover:border-saffron/20 transition-all duration-500 group"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  className="text-4xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <motion.h3 
                  className="text-4xl md:text-5xl font-serif font-bold text-gradient-animated mb-3"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] group-hover:text-saffron transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gradient-premium">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-md text-lg">Comprehensive real estate solutions tailored to your needs.</p>
            </div>
            <Link href="/services" className="text-saffron hover:text-gray-900 transition-colors flex items-center gap-2 mt-4 md:mt-0 font-bold group">
                View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerList}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Map, title: "Property Buying", desc: "Expert guidance to find your dream home or investment." },
              { icon: TrendingUp, title: "Investment Advisory", desc: "Data-driven insights for high-yield property investments." },
              { icon: Shield, title: "Legal Assistance", desc: "Complete support for documentation and legal compliance." },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-saffron/10 transition-colors duration-500" />
                
                <div className="w-16 h-16 bg-saffron/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-saffron text-saffron group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-saffron/30 group-hover:scale-110">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-saffron transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,153,51,0.08),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto glass-card p-16 rounded-[3rem] border border-white/60 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron via-gold to-saffron" />
             
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">Ready to find your <span className="text-saffron">sanctuary?</span></h2>
            <p className="text-gray-700 mb-10 text-xl font-medium max-w-2xl mx-auto">
              Whether you are looking for a home in Bhopal or land in Raisen, we are here to guide you.
            </p>
            <Link href="/contact">
              <motion.button 
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center justify-center px-10 py-5 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-colors shadow-xl text-lg"
              >
                Contact Us Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}