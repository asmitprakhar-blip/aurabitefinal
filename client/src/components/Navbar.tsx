import { Link, useLocation as useWouterLocation } from "wouter";
import { ShoppingBag, Menu, X, MapPin, ChevronDown, User, LogOut } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLocation } from "@/hooks/use-location";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocationModal } from "./LocationModal";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [routerLocation] = useWouterLocation();
  const { itemCount } = useCart();
  const { location, setLocation } = useLocation();
  const { user, logoutMutation, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);

  // Derived state
  const isAuthenticated = !!user;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/subscriptions", label: "Plans" },
    { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 hover:bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg text-white transition-all duration-500">
        {/* Survey Announcement Banner */}
        <div className="bg-gradient-to-r from-green-950 via-primary to-green-950 text-white px-2 py-1.5 sm:px-4 sm:py-2 text-center text-[10px] sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2">
          <span className="hidden sm:inline">✨ Help us shape the future of AuraBite!</span>
          <span className="sm:hidden">✨ Shape our future!</span>
          <a href="https://forms.gle/ecSNRegkMPqJrfZNA" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:text-green-200 transition-colors flex items-center gap-1">
            <span className="hidden sm:inline">Take our 1-min Survey</span>
            <span className="sm:hidden">Take Survey ➔</span>
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Location Selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-left hover:bg-slate-50 p-2 rounded-xl transition-colors"
            >
              <MapPin className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors" />
              <div>
                <div className="text-xs text-white/70">Deliver to</div>
                <div className="flex items-center gap-1 text-sm font-bold text-white group-hover:text-green-50 transition-colors">
                  {location ? (
                    <span className="max-w-[150px] truncate">{location}</span>
                  ) : (
                    "Getting location..."
                  )}
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <img src="/logo.png" alt="AuraBite" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] object-contain drop-shadow-lg" />
              <span className="text-2xl font-bold font-display tracking-tight text-white drop-shadow-md">
                Aura<span className="text-green-400">Bite</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-all duration-300 hover:text-green-400 hover:-translate-y-0.5 ${routerLocation === link.href ? "text-green-400 drop-shadow-md" : "text-white/90 drop-shadow-sm"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Removed Cart Icon */}

              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <div className="hidden md:flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-full">
                        {user?.profileImageUrl ? (
                          <img src={user.profileImageUrl} alt="" className="w-6 h-6 rounded-full" />
                        ) : (
                          <User className="w-5 h-5 text-slate-600" />
                        )}
                        <span className="text-sm font-medium text-slate-900 max-w-[100px] truncate">
                          {user?.firstName || user?.username || "User"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleLogout()}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        title="Logout"
                      >
                        <LogOut className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setIsSignModalOpen(true)} className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 cursor-pointer">
                      Sign In
                    </button>
                  )}
                </>
              )}

              <button onClick={() => { window.location.href = '/#plans'; }} className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-full font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer border border-green-400/50">
                Order Now
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-full hover:bg-slate-100"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {/* Mobile Location */}
                <button
                  onClick={() => {
                    setIsLocationModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-left"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-slate-500">Deliver to</div>
                    <div className="text-sm font-bold text-slate-900">
                      {location || "Select location"}
                    </div>
                  </div>
                </button>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${routerLocation === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-50"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {!isLoading && (
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-xl text-red-600 font-medium"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <button className="block w-full text-left px-4 py-3 rounded-xl bg-slate-900 text-white text-center font-bold cursor-pointer" onClick={() => { setIsOpen(false); setIsSignModalOpen(true); }}>
                        Sign In
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={setLocation}
      />

      {isSignModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative pointer-events-auto">
            <button
              onClick={() => setIsSignModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-500 mb-6">User accounts and authentication are currently being upgraded. Please check back later!</p>
            <button
              onClick={() => setIsSignModalOpen(false)}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
