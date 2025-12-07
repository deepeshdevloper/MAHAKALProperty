import { Helmet } from "react-helmet";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle, MapPin, Phone, Mail, Send } from "lucide-react";
import { fadeInUp, staggerList, scaleUp, buttonHover } from "@/lib/theme";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Please tell us more about your inquiry"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | Shanvi Property Solutions</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerList}
            className="grid md:grid-cols-2 gap-16 items-start"
          >
            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-12">
              <div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">Get in Touch</h1>
                <p className="text-gray-600 text-xl leading-relaxed">
                  Ready to start your real estate journey? Visit our office or drop us a message. We are here to serve you with devotion.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { 
                    icon: MapPin, 
                    title: "Head Office", 
                    content: "Shop No. 52, Bajrang Market, BHEL, Bhopal, Pin Code: 462022" 
                  },
                  { 
                    icon: UsersIcon, 
                    title: "Contact Persons", 
                    content: "Rahul Singh\nRajesh Kushwaha: +91 9039627923" 
                  },
                  { 
                    icon: Phone, 
                    title: "Phone / WhatsApp", 
                    content: "+91 92430 23754" 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 group cursor-default"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-gray-200 text-saffron shrink-0 shadow-sm group-hover:bg-saffron group-hover:text-white transition-all duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-lg mb-1 group-hover:text-saffron transition-colors">{item.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line text-lg">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              variants={scaleUp}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-200 shadow-2xl relative overflow-hidden"
            >
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 text-center p-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6"
                  >
                    <CheckCircle className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Request Sent!</h3>
                  <p className="text-gray-600 mb-8 text-lg">Our team will contact you shortly.</p>
                  <button onClick={() => setIsSuccess(false)} className="text-saffron font-bold text-lg hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : null}

              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Your Name</label>
                    <input 
                      {...register("name")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none transition-all font-medium"
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-red-500 text-xs font-bold">{errors.name.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                    <input 
                      {...register("phone")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none transition-all font-medium"
                      placeholder="+91 9000000000"
                    />
                    {errors.phone && <span className="text-red-500 text-xs font-bold">{errors.phone.message}</span>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                  <input 
                    {...register("email")}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none transition-all font-medium"
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs font-bold">{errors.email.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none transition-all resize-none font-medium"
                    placeholder="I'm interested in..."
                  />
                  {errors.message && <span className="text-red-500 text-xs font-bold">{errors.message.message}</span>}
                </div>

                <motion.button 
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white font-bold py-5 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg text-lg"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Message <Send className="w-4 h-4" /></>}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

// Helper for Users icon since it wasn't imported
function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}