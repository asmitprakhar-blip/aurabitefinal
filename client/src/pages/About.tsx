export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Intro */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold font-display text-slate-900 dark:text-white">Our Story</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            AuraBite started with a simple mission: to serve premium, restaurant-quality food at fast-food speed. We believe that good food has an aura that brings people together.
          </p>
        </div>

        {/* Image */}
        <div className="rounded-3xl overflow-hidden aspect-video shadow-2xl shadow-slate-200">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600"
            alt="Kitchen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Fresh Ingredients", desc: "We source our produce locally every single morning." },
            { title: "Master Chefs", desc: "Our recipes are crafted by award-winning culinary experts." },
            { title: "Sustainable Packaging", desc: "100% eco-friendly packaging because we love our planet." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-secondary dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 transition-colors">
              <h3 className="text-xl font-bold font-display mb-3 text-primary">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-primary/5 to-emerald-50 dark:from-zinc-950 dark:to-zinc-900 rounded-3xl p-12 border border-primary/10 dark:border-zinc-800 transition-colors">
          <h2 className="text-3xl font-bold font-display mb-6 text-slate-900 dark:text-white text-center">Our Mission</h2>
          <p className="text-slate-700 dark:text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">
            At AuraBite, we're committed to transforming the way India eats. Our subscription meal plans deliver
            fresh, chef-prepared meals daily, making healthy eating convenient and affordable for everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          {[
            { label: "Active Subscribers", value: "10K+" },
            { label: "Meals Delivered", value: "500K+" },
            { label: "Cities", value: "15+" },
            { label: "Chef Partners", value: "50+" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary font-display">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center bg-secondary dark:bg-zinc-950 rounded-3xl p-12 border border-slate-200 dark:border-zinc-800 transition-colors">
          <h2 className="text-3xl font-bold font-display mb-6 text-slate-900 dark:text-white">Join Our Team</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            We are always looking for passionate people to join our kitchen and delivery crew.
            Be part of India's fastest-growing meal delivery service.
          </p>
          <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
            View Careers
          </button>
        </div>
      </div>
    </div>
  );
}
