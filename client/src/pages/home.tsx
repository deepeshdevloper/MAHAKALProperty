import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { theme, fadeInUp, staggerList, cardHover } from "@/lib/theme";
import { ArrowRight, Map, Shield, TrendingUp, Users, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useProperties } from "@/lib/property-context";
import stockImageBhopal from '@assets/stock_images/bhopal_city_landmark_352490aa.jpg';
import stockImageVidisha from '@assets/stock_images/vidisha_india_ancien_3af2e5ab.jpg';
import stockImageRaisen from '@assets/stock_images/raisen_fort_india_or_fa5b3019.jpg';

export default function Home() {
  const { properties } = useProperties();
  const featuredProperties = properties.slice(0, 3); // Show latest 3

  return (
    <Layout>
      <Helmet>
        <title>Jai Shree Mahakal Property Solutions | Vidisha, Bhopal, Raisen</title>
        <meta name="description" content="Premium real estate services across Madhya Pradesh. Buy, sell, and invest in properties in Vidisha, Bhopal, and Raisen." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,153,51,0.1),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(226,181,82,0.1),_transparent_50%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.span 
              variants={fadeInUp} 
              className="inline-block py-1 px-3 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-sm font-medium tracking-wider uppercase"
            >
              Devotion in Every Deal
            </motion.span>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900"
            >
              Find Your <span className="text-gradient-gold">Divine</span> Space
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Connecting you with premium properties across Vidisha, Bhopal, and Raisen. 
              Experience a real estate journey rooted in trust and tradition.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/properties" className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center hover:shadow-xl hover:shadow-saffron/20">
                  Explore Properties <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-gray-200 text-gray-900 font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 justify-center">
                  Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-saffron/0 via-saffron/50 to-saffron/0" />
        </motion.div>
      </section>

      {/* Latest Properties Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Latest Listings</h2>
              <p className="text-gray-600 max-w-xl">Explore our newest properties available for sale and rent.</p>
            </div>
            <Link href="/properties" className="hidden md:flex items-center gap-2 text-saffron font-bold hover:text-black transition-colors">
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium group transition-all duration-300"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={prop.image} 
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
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                     <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-saffron transition-colors">{prop.title}</h3>
                     {prop.status === 'Sold' && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">SOLD</span>}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 font-medium">
                    <MapPin className="w-4 h-4 text-saffron" />
                    {prop.location}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-100 mb-6">
                    {prop.type !== "Land" ? (
                      <>
                        <div className="flex flex-col items-center gap-1">
                          <Bed className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                          <span className="text-xs font-medium text-gray-600">{prop.beds} Beds</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Bath className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                          <span className="text-xs font-medium text-gray-600">{prop.baths} Baths</span>
                        </div>
                      </>
                    ) : (
                       <div className="col-span-2 flex items-center gap-2 text-gray-500 text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Plot / Land</span>
                       </div>
                    )}
                    <div className="flex flex-col items-center gap-1">
                      <Maximize className="w-5 h-5 text-gray-400 group-hover:text-saffron transition-colors" />
                      <span className="text-xs font-medium text-gray-600">{prop.area}</span>
                    </div>
                  </div>

                  <Link href="/contact" className="w-full block text-center bg-gray-50 border border-gray-200 hover:bg-saffron hover:border-saffron hover:text-white text-gray-900 py-3 rounded-xl transition-all font-bold tracking-wide">
                      View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/properties" className="inline-flex items-center gap-2 text-saffron font-bold hover:text-black transition-colors">
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Prime Locations</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Discover exclusive residential and commercial opportunities in the heart of Madhya Pradesh.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerList}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  className="group relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                  <motion.div 
                    variants={cardHover}
                    className="absolute inset-0"
                  >
                    <img 
                      src={city.img} 
                      alt={city.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Stronger gradient for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                  </motion.div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-serif font-bold text-white mb-2 drop-shadow-md">{city.name}</h3>
                    <p className="text-white/90 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium drop-shadow-sm leading-relaxed">
                      {city.desc}
                    </p>
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 w-fit px-6 py-3 rounded-full hover:bg-saffron hover:border-saffron hover:text-white transition-all duration-300">
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
      <section className="py-20 border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Experience", value: "12+" },
              { label: "Properties Sold", value: "500+" },
              { label: "Happy Families", value: "450+" },
              { label: "Cities Covered", value: "15+" },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-saffron mb-2">{stat.value}</h3>
                <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-md">Comprehensive real estate solutions tailored to your needs.</p>
            </div>
            <Link href="/services" className="text-saffron hover:text-gray-900 transition-colors flex items-center gap-2 mt-4 md:mt-0">
                View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Map, title: "Property Buying", desc: "Expert guidance to find your dream home or investment." },
              { icon: TrendingUp, title: "Investment Advisory", desc: "Data-driven insights for high-yield property investments." },
              { icon: Shield, title: "Legal Assistance", desc: "Complete support for documentation and legal compliance." },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-premium transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-saffron/5 rounded-bl-full -mr-4 -mt-4 group-hover:bg-saffron/10 transition-colors" />
                
                <div className="w-14 h-14 bg-saffron/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-saffron text-saffron group-hover:text-white transition-colors shadow-sm">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-saffron transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-saffron/10 to-purple-100/50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto glass-card p-12 rounded-3xl border border-white/60 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Ready to find your sanctuary?</h2>
            <p className="text-gray-700 mb-8 text-lg font-medium">
              Whether you are looking for a home in Bhopal or land in Raisen, we are here to guide you.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg">
                Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}