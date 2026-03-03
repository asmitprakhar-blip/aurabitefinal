
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Loader2, MessageCircle, Phone, Mail } from "lucide-react";

export default function Contact() {
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
  });

  const onSubmit = (data: InsertMessage) => {
    const subject = encodeURIComponent(`Contact from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\nEmail: ${data.email}`);
    window.location.href = `mailto:info@aurabiteofficial.com?subject=${subject}&body=${body}`;
    form.reset();
  };

  const isPending = false;

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold font-display text-center mb-4 text-slate-900 dark:text-white">Get in Touch</h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-16 max-w-xl mx-auto">
          Have questions about our meal plans or need help with your order? We're here to help!
        </p>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-secondary dark:bg-zinc-950 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-6 transition-colors">
              <h3 className="text-2xl font-bold font-display mb-4 text-slate-900 dark:text-white">Contact Info</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Call Us</h4>
                    <p className="text-slate-600 dark:text-slate-400">+91 7277775111</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Email Us</h4>
                    <p className="text-slate-600 dark:text-slate-400">info@aurabiteofficial.com</p>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/917277775111"
              target="_blank"
              className="block w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
            </a>

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-primary/5 to-emerald-50 dark:from-zinc-950 dark:to-zinc-900 p-8 rounded-2xl border border-primary/10 dark:border-zinc-800 transition-colors">
              <h4 className="text-xl font-bold font-display mb-4 text-slate-900 dark:text-white">Delivery Hours</h4>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p className="flex justify-between">
                  <span className="font-medium">Breakfast</span>
                  <span>7:00 AM - 10:00 AM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Lunch</span>
                  <span>12:00 PM - 3:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Dinner</span>
                  <span>7:00 PM - 10:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-secondary dark:bg-zinc-950 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 transition-colors">
            <h3 className="text-2xl font-bold font-display mb-6 text-slate-900 dark:text-white">Send a Message</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                <input
                  {...form.register("name")}
                  className="w-full bg-white dark:bg-zinc-900 rounded-lg px-4 py-3 border border-slate-200 dark:border-zinc-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="Your Name"
                />
                {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  {...form.register("email")}
                  type="email"
                  className="w-full bg-white dark:bg-zinc-900 rounded-lg px-4 py-3 border border-slate-200 dark:border-zinc-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="your@email.com"
                />
                {form.formState.errors.email && <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  {...form.register("message")}
                  className="w-full bg-white dark:bg-zinc-900 rounded-lg px-4 py-3 border border-slate-200 dark:border-zinc-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[150px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="How can we help you?"
                />
                {form.formState.errors.message && <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 transition-all"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
