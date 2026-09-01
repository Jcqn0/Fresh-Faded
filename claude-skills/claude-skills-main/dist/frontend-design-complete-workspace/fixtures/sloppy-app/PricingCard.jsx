export default function PricingCard({ plan, price, features, popular }) {
  return (
    <div
      className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        popular
          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
          : 'bg-white border border-gray-100'
      }`}
    >
      {popular && (
        <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium mb-4">
          ✨ Most Popular
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2">{plan}</h3>
      <div className="text-4xl font-bold mb-6">
        ${price}
        <span className="text-base font-normal opacity-70">/mo</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span>✅</span> {f}
          </li>
        ))}
      </ul>
      <button
        className={`w-full rounded-full py-3 font-semibold transition-all duration-300 ${
          popular
            ? 'bg-white text-purple-600 hover:bg-gray-50'
            : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90'
        }`}
      >
        Get Started
      </button>
    </div>
  );
}
