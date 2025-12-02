import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { fadeInUp, staggerList } from "@/lib/theme";

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us | Jai Shree Mahakal Property Solutions</title>
        <meta name="description" content="Our story, mission, and vision. Trusted real estate advisors in MP." />
      </Helmet>

      <div className="pt-20 pb-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">Our Legacy</h1>
              <div className="w-24 h-1 bg-saffron mx-auto rounded-full" />
            </motion.div>

            <motion.div variants={fadeInUp} className="prose prose-lg mx-auto mb-20">
              <p className="text-xl leading-relaxed text-gray-700 text-center font-medium">
                "Founded on the principles of Dharma and Service, Jai Shree Mahakal Property Solutions isn't just a real estate agency — we are guardians of your prosperity."
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <motion.div variants={fadeInUp} className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-gold-dark">The Beginning</h2>
                <p className="text-gray-600 leading-relaxed">
                  Starting from the holy city of Ujjain's inspiration, we established our roots in Vidisha with a simple mission: to bring transparency to the property market. Over the last decade, we have expanded to Bhopal, Raisen, and now serve clients across India.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe that buying a home is a spiritual journey as much as a financial one. It is about finding the space where your life unfolds.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative h-[400px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
                 {/* Placeholder for About Image */}
                 <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 to-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-serif text-4xl">Our Story Image</span>
                 </div>
              </motion.div>
            </div>

            <motion.div variants={staggerList} className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Mission", text: "To provide ethical, transparent, and high-value real estate solutions that empower our clients." },
                { title: "Vision", text: "To be the most trusted real estate partner in Central India, known for our unwavering integrity." },
                { title: "Values", text: "Truth (Satya), Service (Seva), and Excellence in every transaction we handle." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-serif font-bold text-saffron mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}