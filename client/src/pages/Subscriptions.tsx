import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const subscriptionPlans = [
  {
    id: "dinner-only",
    name: "Dinner Plan",
    price: 2499,
    period: "30 days",
    description: "Dinner Only",
    meals: ["Dinner"],
    features: [
      "Daily dinner delivery",
      "Chef-curated menu",
      "Free delivery",
      "Skip/pause anytime"
    ],
    popular: false,
    color: "bg-secondary"
  },
  {
    id: "lunch-dinner",
    name: "Lunch + Dinner",
    price: 3999,
    period: "30 days",
    description: "Lunch & Dinner",
    meals: ["Lunch", "Dinner"],
    features: [
      "Daily lunch & dinner",
      "Premium ingredients",
      "Free delivery",
      "Skip/pause anytime",
      "Weekly menu variety"
    ],
    popular: true,
    color: "bg-primary/10"
  },
  {
    id: "lunch-only",
    name: "Lunch Plan",
    price: 2299,
    period: "30 days",
    description: "Lunch Only",
    meals: ["Lunch"],
    features: [
      "Daily lunch delivery",
      "Office-friendly packaging",
      "Free delivery",
      "Skip/pause anytime"
    ],
    popular: false,
    color: "bg-secondary"
  },
  {
    id: "mega-plan",
    name: "Mega Plan",
    price: 5999,
    period: "30 days",
    description: "Breakfast + Lunch + Dinner",
    meals: ["Breakfast", "Lunch", "Dinner"],
    features: [
      "All 3 meals daily",
      "Premium chef menu",
      "Priority delivery",
      "Free delivery",
      "Skip/pause anytime",
      "Exclusive recipes",
      "Nutritionist support"
    ],
    popular: false,
    color: "bg-gradient-to-br from-green-50 to-emerald-50"
  }
];

export default function Subscriptions() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-green-950 dark:text-white">
            Subscription Plans
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose a meal plan that fits your lifestyle. Fresh, delicious meals delivered daily to your doorstep.
          </p>
        </div>

        <div className="relative group">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 opacity-40 grayscale-[40%] select-none pointer-events-none blur-[2px] transition-all duration-700">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl md:rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden ${plan.color} dark:bg-zinc-950 dark:from-zinc-950 dark:to-zinc-900 shadow-sm flex flex-row md:flex-col items-center md:items-stretch transition-colors`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 md:left-0 md:right-0 bg-primary/50 text-white text-center py-1 md:py-1 px-3 md:px-0 text-[10px] md:text-xs font-bold uppercase rounded-bl-lg md:rounded-bl-none">
                    Most Popular
                  </div>
                )}

                <div className={`p-4 md:p-6 flex-1 flex flex-col md:block w-full ${plan.popular ? "pt-8 md:pt-10" : ""}`}>
                  <h3 className="text-lg md:text-xl font-bold text-green-950 dark:text-white font-display mb-1 md:mb-1">
                    {plan.name}
                  </h3>

                  <div className="hidden md:flex items-baseline gap-1 mb-2 opacity-50">
                    <span className="text-3xl font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">/{plan.period}</span>
                  </div>

                  <p className="hidden md:block text-slate-600 dark:text-slate-400 text-sm mb-4">{plan.description}</p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-4 opacity-75">
                    {plan.meals.map((meal) => (
                      <span
                        key={meal}
                        className="px-2 py-0.5 md:px-3 md:py-1 bg-white dark:bg-zinc-900 rounded-full text-[10px] md:text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800"
                      >
                        {meal}
                      </span>
                    ))}
                  </div>

                  <ul className="hidden md:block space-y-2 mb-6 opacity-75">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Check className="w-4 h-4 text-green-500/50 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-end shrink-0 pr-4 md:pr-6 md:pb-6 md:px-6 w-auto md:w-full gap-2 md:gap-0">
                  <div className="flex md:hidden items-baseline gap-1 opacity-50">
                    <span className="text-xl font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px]">/{plan.period}</span>
                  </div>
                  <button disabled className="px-4 md:px-0 w-full py-1.5 md:py-3 rounded-lg md:rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 font-bold text-[11px] md:text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                    Coming Soon Model
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white/50 dark:border-white/10 text-center max-w-lg transform transition-all hover:scale-105 duration-500">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6 shadow-sm border border-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Currently in Development
              </span>

              <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                A New Era of <br /><span className="text-primary italic">Dining</span>
              </h3>

              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium">
                We are meticulously crafting our subscription delivery model to bring you an unparalleled, chef-curated experience straight to your door.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-5 py-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full sm:w-auto text-sm bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => alert("You've been added to the waitlist!")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-green-950 text-white font-bold rounded-xl shadow-lg hover:bg-green-900 transition-all text-sm whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-emerald-50 dark:from-zinc-950 dark:to-zinc-900 rounded-2xl p-8 text-center border border-primary/10 dark:border-white/5 shadow-sm transition-colors">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Need a Custom Plan?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Contact us for corporate meal plans, special dietary requirements, or custom schedules.
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 bg-green-950 text-white rounded-xl font-bold hover:bg-green-900 transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
