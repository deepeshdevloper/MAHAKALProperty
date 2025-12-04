import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Layout } from "@/components/layout";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { scaleUp, buttonHover } from "@/lib/theme";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (isAuthenticated) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (login(password)) {
      setLocation("/admin");
    } else {
      setError("Invalid password. Hint: admin123");
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Login | JSM Properties</title>
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
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none transition-all font-medium"
                placeholder="••••••••"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
            </div>

            <motion.button 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
