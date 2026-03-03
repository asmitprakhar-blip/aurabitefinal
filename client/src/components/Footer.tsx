import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="AuraBite" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Aura<span className="text-primary">Bite</span>
              </span>
            </Link>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Premium food delivery experience delivering happiness to your doorstep. Taste the aura of perfection in every bite.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/aurabiteofficial/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-display mb-6 text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Subscriptions', 'Reviews', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Subscriptions' ? '/subscriptions' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                    {item === 'Home' ? 'Home' : item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold font-display mb-6 text-slate-900 dark:text-white">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Call Us</div>
                  <span>+91 7277775111</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Email Us</div>
                  <span>info@aurabiteofficial.com</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold font-display mb-6 text-slate-900 dark:text-white">Newsletter</h4>
            <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">Subscribe for latest updates and exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
              />
              <button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-3 transition-colors shadow-lg shadow-primary/20">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-zinc-800 pt-8 text-center text-slate-600 dark:text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} AuraBite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
