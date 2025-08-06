export default function CTA() {
  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto pb-24 text-center">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 md:p-16 text-white">
        <h2 className="text-3xl md:text-4xl font-medium mb-6">
          Ready to get started?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Let&apos;s discuss how we can help bring your vision to life and drive meaningful results for your business.
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
          Start Your Project
        </button>
      </div>
    </div>
  );
}