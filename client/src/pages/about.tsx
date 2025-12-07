import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { fadeInUp, staggerList, scaleUp, cardHover } from "@/lib/theme";
import officeImage from '@assets/generated_images/real_estate_office_storefront_with_signage.png';

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us | Shanvi Property Solutions</title>
        <meta name="description" content="Our story, mission, and vision. Trusted real estate advisors in MP." />
      </Helmet>

      <div className="pt-24 pb-32 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <span className="text-saffron font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 relative inline-block">
                Our Legacy
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-saffron rounded-full" />
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} className="prose prose-xl mx-auto mb-24 text-center max-w-3xl">
              <p className="leading-relaxed text-gray-700 font-medium italic relative">
                <span className="text-6xl text-saffron/20 absolute -top-8 -left-8 font-serif">"</span>
                Founded on the principles of Dharma and Service, Shanvi Property Solutions isn't just a real estate agency — we are guardians of your prosperity.
                <span className="text-6xl text-saffron/20 absolute -bottom-12 -right-8 font-serif">"</span>
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <motion.div variants={fadeInUp} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">The Beginning</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Starting from the holy city of Ujjain's inspiration, we established our roots in Vidisha with a simple mission: to bring transparency to the property market. Over the last decade, we have expanded to Bhopal, Raisen, and now serve clients across India.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Our Philosophy</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We believe that buying a home is a spiritual journey as much as a financial one. It is about finding the space where your life unfolds. Every brick, every corner holds a promise of a future.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={scaleUp} 
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
              >
                 <img 
                   src={officeImage} 
                   alt="Shanvi Property Solutions Office" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                 <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="font-serif text-2xl font-bold mb-2">Headquarters</p>
                    <p className="opacity-90">Serving with devotion since 2012</p>
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
                  whileHover="hover"
                  initial="rest"
                  custom={cardHover}
                  className="bg-white p-10 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <motion.div variants={cardHover} className="h-full flex flex-col">
                    <div className="w-12 h-12 bg-saffron/10 rounded-xl mb-6 flex items-center justify-center group-hover:bg-saffron transition-colors">
                      <span className="text-2xl font-serif font-bold text-saffron group-hover:text-white">{i + 1}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-saffron transition-colors">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}