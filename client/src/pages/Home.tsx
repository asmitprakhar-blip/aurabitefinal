import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Star, Clock, Truck, ShieldCheck, Quote, Tag, Gift, CheckCircle, Zap, Leaf, Flame, Timer, PlayCircle, TrendingUp, Moon, Sun, ShoppingBag } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useMenu } from "@/hooks/use-menu";
import { MenuCard } from "@/components/MenuCard";
import { HeroSequence } from "@/components/HeroSequence";
import { useTheme } from "@/hooks/use-theme";

const subscriptionPlans = [
  {
    id: "lunch",
    name: "Lunch Plan",
    price: 2299,
    period: "30 days",
    meals: ["Lunch Only"],
  },
  {
    id: "dinner",
    name: "Dinner Plan",
    price: 2499,
    period: "30 days",
    meals: ["Dinner Only"],
  },
  {
    id: "lunch-dinner",
    name: "Lunch + Dinner",
    price: 3999,
    period: "30 days",
    meals: ["Lunch", "Dinner"],
    popular: true,
  },
  {
    id: "mega",
    name: "Mega Plan",
    price: 5999,
    period: "30 days",
    meals: ["Breakfast", "Lunch", "Dinner"],
  }
];

const offers = [
  {
    id: 1,
    title: "Free Delivery",
    subtitle: "Above ₹499",
    code: "FREEDEL",
    bgColor: "bg-green-500",
  },
  {
    id: 2,
    title: "₹75 Cashback",
    subtitle: "On first order",
    code: "CASH75",
    bgColor: "bg-emerald-500",
  },
  {
    id: 3,
    title: "20% OFF",
    subtitle: "On Subscriptions",
    code: "SUB20",
    bgColor: "bg-teal-500",
  }
];

const categories = [
  { id: 1, name: "Gourmet Burgers", icon: "🍔", color: "bg-orange-100 text-orange-600" },
  { id: 2, name: "Healthy Bowls", icon: "🥗", color: "bg-green-100 text-green-600" },
  { id: 3, name: "Premium Thalis", icon: "🍱", color: "bg-yellow-100 text-yellow-600" },
  { id: 4, name: "Desserts", icon: "🍰", color: "bg-pink-100 text-pink-600" },
];

const randomOrders = [
  { name: "Rahul S.", item: "Mega Plan Subscription", time: "Just now" },
  { name: "Priya K.", item: "Spicy Paneer Burger", time: "2 mins ago" },
  { name: "Amit J.", item: "Chicken Teriyaki Bowl", time: "5 mins ago" },
  { name: "Sneha M.", item: "Chocolate Lava Cake", time: "1 min ago" },
];

function LiveOrderNotification() {
  const [currentOrder, setCurrentOrder] = useState<typeof randomOrders[0] | null>(null);

  useEffect(() => {
    // Show an order shortly after load, then periodically
    const timeout = setTimeout(() => {
      const showOrder = () => {
        const order = randomOrders[Math.floor(Math.random() * randomOrders.length)];
        setCurrentOrder(order);
        setTimeout(() => setCurrentOrder(null), 4000); // Hide after 4 seconds
      };

      showOrder(); // initial show
      const interval = setInterval(showOrder, 15000); // Every 15 seconds
      return () => clearInterval(interval);
    }, 2000); // Wait 2s before first notification

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {currentOrder && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-4 right-4 md:left-6 md:right-auto md:w-80 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-4 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Someone just ordered</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{currentOrder.item}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{currentOrder.time} • by {currentOrder.name}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { data: menuItems } = useMenu();
  const featuredItems = menuItems?.filter(item => item.popular).slice(0, 3) || [];

  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  // Scrollytelling Refs
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress but keep it super snappy for real-time feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 25,
  });

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 bg-background text-foreground">
      <LiveOrderNotification />

      {/* Theme Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          className={`p-3 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 ${isDarkMode
            ? "bg-slate-800 text-yellow-400 hover:bg-slate-700 hover:shadow-yellow-400/20"
            : "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200"
            }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      <div className="fixed bottom-6 right-6 z-50 group">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 12 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-tr from-primary to-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/40 relative"
          onClick={() => alert("Congrats! You unlocked a secret discount: SECRET20")}
        >
          <Gift className="w-6 h-6 animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </motion.button>
        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 w-48 bg-white p-3 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform translate-y-2 group-hover:translate-y-0">
          <p className="text-xs font-bold text-slate-800">🎁 Mystery Gift!</p>
          <p className="text-[10px] text-slate-500">Tap to unlock a surprise.</p>
        </div>
      </div>

      {/* Scroll Sequence Wrapper: Height adjusted for better mobile scrolling */}
      <div ref={containerRef} className="relative h-[250vh] md:h-[400vh]">

        {/* Sticky Hero Section: Stays pinned while user scrolls */}
        <section className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HeroSequence progress={smoothProgress} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10" />
          </div>

          <div className="relative z-20 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 md:space-y-8 max-w-2xl pt-20 md:pt-0"
            >
              <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/40 text-white border border-white/10 backdrop-blur-md shadow-2xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium tracking-widest uppercase text-shadow-sm">Now Taking Pre-Orders</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.1] tracking-tight text-white drop-shadow-2xl mt-4 md:mt-0">
                The Art of <br />
                <span className="text-primary font-serif italic font-light">Fine Dining</span> <br />
                At Home
              </h1>

              <p className="text-lg md:text-xl text-slate-200 max-w-xl leading-relaxed font-light tracking-wide drop-shadow-lg">
                Transform your daily meals into extraordinary culinary experiences. Curated ingredients, masterchef recipes, and a commitment to absolute perfection, delivered directly to your table.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a href="#plans" className="w-full sm:w-auto">
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 w-full">
                    Explore Plans <ArrowRight className="w-5 h-5" />
                  </button>
                </a>
                <Link href="/reviews" className="w-full sm:w-auto">
                  <button className="px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 shadow-sm w-full">
                    Read Reviews
                  </button>
                </Link>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> <span className="text-white">4.9/5</span> Rating</div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"><ShieldCheck className="w-5 h-5 text-emerald-400" /> <span className="text-white">100% Organic</span></div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"><Timer className="w-5 h-5 text-orange-400" /> <span className="text-white">30 Min</span> Delivery</div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="bg-primary py-3 overflow-hidden select-none relative z-20 shadow-md border-b border-primary/20">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-white/90 font-bold text-xs md:text-sm tracking-widest uppercase">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" /> Flash Sale: 20% OFF Subscriptions</span>
              <span className="text-white/20">•</span>
              {featuredItems.length > 0 ? (
                featuredItems.map((item, idx) => (
                  <span key={`feat-${i}-${idx}`} className="flex items-center gap-8">
                    <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-300" /> Trending: {item.name}</span>
                    <span className="text-white/20">•</span>
                  </span>
                ))
              ) : (
                <>
                  <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Trending: Spicy Momos</span>
                  <span className="text-white/20">•</span>
                </>
              )}
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Priority Delivery</span>
              <span className="text-white/20">•</span>
            </div>
          ))}
          {/* Duplicate for infinite loop illusion */}
          {[...Array(10)].map((_, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-8 text-white/90 font-bold text-xs md:text-sm tracking-widest uppercase">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" /> Flash Sale: 20% OFF Subscriptions</span>
              <span className="text-white/20">•</span>
              {featuredItems.length > 0 ? (
                featuredItems.map((item, idx) => (
                  <span key={`dup-feat-${i}-${idx}`} className="flex items-center gap-8">
                    <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-300" /> Trending: {item.name}</span>
                    <span className="text-white/20">•</span>
                  </span>
                ))
              ) : (
                <>
                  <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Trending: Spicy Momos</span>
                  <span className="text-white/20">•</span>
                </>
              )}
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Priority Delivery</span>
              <span className="text-white/20">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Categories & Stories Section */}
      <section className="py-12 relative z-20 rounded-b-3xl shadow-sm transition-colors duration-500 bg-white dark:bg-black">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Story Highlights */}
          <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 no-scrollbar mb-8 snap-x">
            {[
              { img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80", name: "New Drops", ring: "from-purple-500 to-pink-500", href: "/menu" },
              { img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=150&q=80", name: "Chef Special", ring: "from-yellow-400 to-orange-500", href: "/menu" },
              { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=150&q=80", name: "Top Rated", ring: "from-green-400 to-emerald-600", href: "/menu" },
              { img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=150&q=80", name: "Healthy", ring: "from-blue-400 to-cyan-500", href: "/menu" },
              { img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=150&q=80", name: "Desserts", ring: "from-pink-400 to-rose-500", href: "/menu" },
            ].map((story, idx) => (
              <Link key={idx} href={story.href}>
                <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px] snap-center">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full p-[3px] bg-gradient-to-tr ${story.ring} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-slate-100">
                      <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-600 group-hover:text-primary tracking-wide uppercase">{story.name}</span>
                </div>
              </Link>
            ))}
            <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px] snap-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-all bg-slate-50">
                <PlayCircle className="w-8 h-8 opacity-50 group-hover:opacity-100" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-slate-400">Watch Reel</span>
            </div>
          </div>

          <h3 className="text-xl font-bold font-display mb-6 px-2 flex items-center gap-2 text-slate-900 dark:text-white">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Quick Cravings
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="group cursor-pointer border hover:border-primary/50 hover:shadow-lg transition-all p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 bg-slate-50 dark:bg-zinc-950 border-slate-100 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${cat.color} flex items-center justify-center text-xl md:text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div>
                  <div className="font-bold transition-colors group-hover:text-primary text-slate-800 dark:text-white">{cat.name}</div>
                  <div className="text-xs text-slate-400 font-medium whitespace-nowrap">Order Now</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers You'll Love */}
      <section className="py-24 relative overflow-hidden transition-colors duration-500 bg-white dark:bg-black">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-5 animate-pulse"><Leaf className="w-32 h-32 rotate-45" /></div>
        <div className="absolute bottom-20 right-10 opacity-5 animate-bounce duration-[3000ms]"><Flame className="w-24 h-24 text-orange-500" /></div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-slate-900 dark:text-white">Bestsellers You'll Love</h2>
            <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400">
              Discover our most loved dishes, crafted with passion and delivered with care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                View Full Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Aesthetic Survey Section */}
      <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-zinc-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 rounded-full blur-3xl saturate-150 animate-pulse pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-2xl border p-8 md:p-14 rounded-[2.5rem] shadow-2xl shadow-primary/5 text-center flex flex-col items-center transform hover:-translate-y-1 transition-transform duration-500 bg-white/70 dark:bg-black/60 border-white dark:border-white/10">
            <span className="text-4xl mb-4 bg-primary/10 p-4 rounded-full">✨</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight text-slate-900 dark:text-white">
              Help Us Create The <br /><span className="text-primary italic">Perfect Menu</span>
            </h2>
            <p className="max-w-xl mx-auto mb-8 md:text-lg text-slate-600 dark:text-slate-300">
              We are constantly evolving to serve you better. Take our 1-minute survey and help shape the future of AuraBite. Your feedback is our secret ingredient!
            </p>
            <a href="https://forms.gle/ecSNRegkMPqJrfZNA" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/30 active:scale-95 transition-all flex items-center gap-2 group text-base md:text-lg">
                Start 1-min Survey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="plans" className="py-16 border-y bg-secondary dark:bg-black border-stone-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white">Subscription Plans</h2>
              <p className="mt-1 text-slate-500 dark:text-slate-400">Monthly meal plans tailored for you</p>
            </div>
            <Link href="/subscriptions">
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                See All Plans <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="relative group">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 opacity-40 grayscale-[40%] select-none pointer-events-none blur-[2px] transition-all duration-700">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl md:rounded-2xl p-4 md:p-6 border transition-all relative flex flex-row md:flex-col justify-between items-center md:items-start bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800"
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 md:-top-3 md:left-1/2 md:-translate-x-1/2 md:right-auto bg-primary/50 text-white text-[9px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-bl-lg md:rounded-bl-none md:rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="flex flex-col flex-1">
                    <h4 className="font-bold mb-1 text-sm md:text-lg text-slate-900 dark:text-white">{plan.name}</h4>
                    <div className="hidden md:flex items-baseline gap-1 mb-3 opacity-50">
                      <span className="text-2xl font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">/{plan.period}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-0 md:mb-4 opacity-75 mt-0.5">
                      {plan.meals.map((meal) => (
                        <span
                          key={meal}
                          className="px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[9px] md:text-xs font-medium bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-400"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end md:w-full shrink-0 gap-1 md:gap-0">
                    <div className="flex md:hidden items-baseline gap-1 opacity-50">
                      <span className="text-base font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                    </div>
                    <button disabled className="px-3 md:px-0 md:w-full py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-[10px] md:text-sm mt-1 md:mt-0 whitespace-nowrap bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-slate-400">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
              <div className="backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border text-center max-w-md transform transition-all hover:scale-105 duration-500 bg-white/80 dark:bg-black/80 border-white/50 dark:border-white/10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase mb-4 shadow-sm">
                  <span className="animate-pulse h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Coming Soon
                </span>

                <h3 className="text-2xl font-display font-bold mb-3 text-slate-900 dark:text-white">
                  Premium Subscriptions
                </h3>

                <p className="mb-6 text-sm leading-relaxed px-4 text-slate-600 dark:text-slate-400">
                  We are preparing a fully customizable, chef-curated subscription experience.
                </p>

                <Link href="/subscriptions">
                  <button className="px-6 py-2.5 bg-green-950 text-white font-bold rounded-xl shadow-lg hover:bg-green-900 transition-all text-sm">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white">Special Offers</h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Grab these exclusive deals today</p>
          </div>

          <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-4 pb-4 snap-x snap-mandatory no-scrollbar px-1">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`${offer.bgColor} text-white rounded-2xl p-6 min-w-[280px] sm:min-w-[220px] shadow-lg snap-center shrink-0`}
              >
                <Tag className="w-8 h-8 mb-3" />
                <div className="font-bold text-xl">{offer.title}</div>
                <div className="text-sm opacity-90">{offer.subtitle}</div>
                <div className="mt-3 text-xs font-mono bg-white/20 px-3 py-1.5 rounded inline-block">
                  Use {offer.code}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-y bg-secondary dark:bg-black border-stone-100 dark:border-white/5">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Fast Delivery", desc: "Under 30 minutes or it's free." },
              { icon: ShieldCheck, title: "Quality Food", desc: "100% fresh ingredients daily." },
              { icon: Truck, title: "Easy Tracking", desc: "Live GPS tracking for your order." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl border transition-all text-center group bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Customers", value: "50K+" },
              { label: "Menu Items", value: "200+" },
              { label: "Average Rating", value: "4.9" },
              { label: "Avg Delivery", value: "30min" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 group">
                <div className="text-4xl md:text-5xl font-bold font-display group-hover:text-primary transition-colors text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-black">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Blob Backgrounds for visual flair */}
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-orange-400/5 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-slate-900 dark:text-white">Loved by Thousands</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">Don't just take our word for it. Here's what our foodies have to say.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Priya S.", role: "Loyal Customer", review: "AuraBite has transformed my meal prep routine! Fresh, delicious, and delivered on time every single day. The quality is unmatched.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
              { name: "Rahul M.", role: "Food Enthusiast", review: "The subscription plan is worth every rupee. Quality ingredients and amazing variety in the menu. I look forward to lunch every day!", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80" },
              { name: "Ananya K.", role: "Working Professional", review: "Best decision I made this year. No more skipping meals or ordering junk food! The packaging is also highly premium and eco-friendly.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 rounded-3xl border shadow-xl shadow-slate-200/40 dark:shadow-none relative group hover:-translate-y-2 transition-transform duration-300 bg-white dark:bg-zinc-950 border-slate-100 dark:border-white/5"
              >
                <div className="absolute -top-5 right-8 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transform group-hover:scale-110 transition-transform">
                  <Quote className="w-5 h-5 text-white" />
                </div>

                <div className="flex text-yellow-400 mb-6 gap-1">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current drop-shadow-sm" />)}
                </div>

                <p className="mb-8 italic text-lg leading-relaxed font-light text-slate-700 dark:text-slate-300">
                  "{testimonial.review}"
                </p>

                <div className="flex items-center gap-4 mt-auto border-t pt-6 border-slate-50 dark:border-white/5">
                  <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/10" />
                  <div>
                    <h4 className="font-bold text-base group-hover:text-primary transition-colors text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
