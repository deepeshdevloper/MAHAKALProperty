import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { fadeInUp, staggerList, cardHover, buttonHover } from "@/lib/theme";
import { Home, Building, Briefcase, Key, FileText, Search, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    id: 1,
    title: "Residential Sales",
    desc: "Helping you find the perfect home for your family in prime locations.",
    icon: Home,
  },
  {
    id: 2,
    title: "Commercial Real Estate",
    desc: "Strategic office spaces and retail outlets to grow your business.",
    icon: Building,
  },
  {
    id: 3,
    title: "Land & Plots",
    desc: "Premium plots in developing areas with high appreciation potential.",
    icon: Map,
  },
  {
    id: 4,
    title: "Property Management",
    desc: "Complete care for your assets, from maintenance to tenant management.",
    icon: Key,
  },
  {
    id: 5,
    title: "Legal Consultation",
    desc: "Hassle-free documentation and verification services.",
    icon: FileText,
  },
  {
    id: 6,
    title: "Market Analysis",
    desc: "In-depth reports and valuation services for informed decision making.",
    icon: Search,
  },
];

// Helper component for icon since Lucide icons are components
function Map(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}

export default function Services() {
  return (
    <Layout>
      <Helmet>
        <title>Services | Shanvi Property Solutions</title>
        <meta name="description" content="Our comprehensive real estate services including buying, selling, legal advice, and property management." />
      </Helmet>

      <div className="pt-24 pb-32 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="text-center mb-20"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">Our Expertise</motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We offer end-to-end real estate solutions designed to make your property journey smooth and successful.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                custom={cardHover}
                className="bg-white border border-gray-100 p-10 rounded-[2rem] hover:border-saffron/30 hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <motion.div variants={cardHover} className="h-full flex flex-col">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-saffron transition-all duration-300 border border-gray-100 group-hover:border-saffron group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                    <service.icon className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg flex-grow">
                    {service.desc}
                  </p>
                  <div className="flex items-center text-saffron font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-32 p-16 rounded-[3rem] bg-[radial-gradient(circle_at_center,#FF9933,#E2B552)] text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white drop-shadow-sm">Need a custom solution?</h3>
              <p className="mb-10 text-white/90 max-w-2xl mx-auto font-medium text-xl">We understand that every requirement is unique. Let's discuss how we can help you achieve your goals.</p>
              <Link href="/contact">
                <motion.button 
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="inline-block px-10 py-4 bg-white text-saffron font-bold rounded-full hover:bg-gray-50 transition-colors shadow-lg text-lg"
                >
                  Get a Free Consultation
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}