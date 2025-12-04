import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { PropertyProvider } from "@/lib/property-context";
import { AuthProvider } from "@/lib/auth-context";

import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import CityPage from "@/pages/city";
import PanIndia from "@/pages/pan-india";
import Contact from "@/pages/contact";
import AdminPage from "@/pages/admin";
import PropertiesPage from "@/pages/properties";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/properties" component={PropertiesPage} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/pan-india" component={PanIndia} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={Login} />
        <Route path="/city/:name" component={CityPage} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PropertyProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </PropertyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;