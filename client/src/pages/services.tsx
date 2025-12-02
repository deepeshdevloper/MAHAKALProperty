import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { fadeInUp, staggerList } from "@/lib/theme";
import { Home, Building, Briefcase, Key, FileText, Search } from "lucide-react";

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
        <title>Services | Jai Shree Mahakal Property Solutions</title>
        <meta name="description" content="Our comprehensive real estate services including buying, selling, legal advice, and property management." />
      </Helmet>

      <div className="pt-20 pb-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Expertise</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer end-to-end real estate solutions designed to make your property journey smooth and successful.
            </p>
          </div>

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
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl hover:border-saffron/50 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-saffron transition-colors border border-gray-100 group-hover:border-saffron">
                  <service.icon className="w-6 h-6 text-gray-700 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.desc}
                </p>
                <button className="text-saffron text-sm font-bold uppercase tracking-wider hover:text-gray-900 transition-colors flex items-center gap-2">
                  Learn More <span className="text-lg">→</span>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Strip */}
          <div className="mt-24 p-12 rounded-3xl bg-gradient-to-r from-saffron to-yellow-500 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-serif font-bold mb-4 text-black">Need a custom solution?</h3>
            <p className="mb-8 text-black/80 max-w-xl mx-auto font-medium">We understand that every requirement is unique. Let's discuss how we can help you achieve your goals.</p>
            <a href="/contact" className="inline-block px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg">
              Get a Free Consultation
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}