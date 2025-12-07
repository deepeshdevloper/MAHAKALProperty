import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Layout } from "@/components/layout";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2, User } from "lucide-react";
import { scaleUp, buttonHover } from "@/lib/theme";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/admin");
    }
  }, [isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-saffron" />
        </div>
      </Layout>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const success = await login(username, password);
    
    if (success) {
      setLocation("/admin");
    } else {
      setError("Invalid credentials. Use admin/admin123");
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Login | Shanvi Properties</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4 text-saffron">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-500 mt-2">Enter your secure credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none transition-all font-medium"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none transition-all font-medium"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
            </div>

            <motion.button 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
