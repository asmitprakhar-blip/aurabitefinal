import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageCircle } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import CustomizeMeal from "@/pages/CustomizeMeal";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Reviews from "@/pages/Reviews";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Subscriptions from "@/pages/Subscriptions";
import OrderSuccess from "@/pages/OrderSuccess";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/Auth";

import { motion } from "framer-motion";
import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/menu/:id" component={CustomizeMeal} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/subscriptions" component={Subscriptions} />
        <Route path="/order-success" component={OrderSuccess} />

        <Route path="/auth" component={AuthPage} />
        <Route component={NotFound} />
      </Switch>
    </motion.div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />

              {/* WhatsApp Float Button */}
              <a
                href="https://wa.me/917277775111"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
              </a>
            </div>
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
