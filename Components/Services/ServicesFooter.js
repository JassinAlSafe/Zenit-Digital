export default function ServicesFooter() {
  return (
    <footer className="bg-[#B4A5FF] text-white min-h-screen rounded-t-3xl">
      {/* Header with contact info and navigation */}
      <div className="services-footer px-4 md:px-8 max-w-7xl mx-auto pt-32 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <a
              href="mailto:hello@zenitdigital.se"
              className="group block mb-6 transition-all duration-300 hover:scale-[1.02] transform-gpu"
            >
              <h2 className="text-3xl md:text-4xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500">
                hello@zenitdigital.se
              </h2>
              <div className="h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0 group-hover:w-full transition-all duration-500 mt-2 rounded-full"></div>
            </a>
            <div className="text-lg space-y-2 text-gray-300">
              <p className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Gothenburg, Sweden
              </p>
           
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            <a
              href="/contact"
              className="group relative text-lg font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:scale-105 transform-gpu"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/join"
              className="group relative text-lg font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:scale-105 transform-gpu"
            >
              <span className="relative z-10">Join Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-lg font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:scale-105 transform-gpu"
            >
              <span className="relative z-10">Instagram</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-lg font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:scale-105 transform-gpu"
            >
              <span className="relative z-10">LinkedIn</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="pb-16 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-px bg-gray-800/30 rounded-3xl overflow-hidden min-h-80 lg:min-h-96 w-full shadow-2xl border border-gray-700/50 backdrop-blur-xl relative">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5 rounded-3xl"></div>
            {/* Cases Section */}
            <div className="text-white lg:rounded-l-3xl flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 hover:flex-[2.2] group cursor-pointer relative overflow-hidden backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/25 border-r border-white/10">
              {/* Video Background */}
              <video
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/cases-poster.jpg"
                aria-label="Showcasing our portfolio cases"
              >
                {/* Multiple source formats for browser compatibility */}
                <source src="/videos/cases-showcase.webm" type="video/webm" />
                <source src="/videos/cases-showcase.mp4" type="video/mp4" />

                {/* Fallback for browsers that don't support video */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <p className="text-white text-lg">
                    Your browser doesn't support video playback
                  </p>
                </div>
              </video>

              {/* Video Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>

              {/* Hover Enhancement Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Content wrapper with proper z-index */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
                <div className="mb-8 transform group-hover:scale-105 transition-transform duration-700">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-lg">
                    Cases
                  </h3>
                  <p className="text-lg text-white/90 font-medium drop-shadow-md">
                    Showtime
                  </p>
                </div>

                {/* Spacer to push floating elements to bottom */}
                <div className="flex-1"></div>

                {/* Video Controls Indicator (appears on hover) */}
                <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-medium">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-6 left-6 opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-20">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg"></div>
                </div>
              </div>

              <div className="absolute top-20 right-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700 delay-150 z-20">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full"></div>
                </div>
              </div>

              <div className="absolute bottom-16 left-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700 delay-300 z-20">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-8 md:p-12 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 hover:flex-[2.2] group cursor-pointer relative overflow-hidden hover:shadow-2xl hover:shadow-gray-500/25 border-x border-white/10">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              {/* Interactive particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-ping"></div>
              <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:animate-ping"></div>
              <div className="relative z-10">
                {/* Normal state - compact */}
                <div className="group-hover:hidden transform group-hover:scale-105 transition-transform duration-700">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    Services
                  </h3>
                  <p className="text-lg text-gray-300 font-medium">
                    What to do
                  </p>
                </div>

                {/* Hover state - expanded */}
                <div className="hidden group-hover:flex flex-col h-full animate-in fade-in duration-700">
                  {/* Main title in center */}
                  <div className="flex-1 flex items-center">
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-in slide-in-from-left-8 duration-700">
                      Services
                    </h3>
                  </div>

                  {/* Bottom content layout - positioned at very bottom */}
                  <div className="flex flex-col gap-2">
                    <div className="flex-shrink-0">
                      <p className="text-xl text-gray-300 font-medium animate-in slide-in-from-left-8 duration-700 delay-150">
                        What to do
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-gray-200 font-medium animate-in slide-in-from-right-8 duration-700 delay-300">
                        What we are extra good at.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learn Section */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white p-8 md:p-12 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 hover:flex-[2.2] group cursor-pointer relative overflow-hidden hover:shadow-2xl hover:shadow-teal-500/25 border-x border-white/10">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              {/* Interactive particles effect */}
              <div className="absolute top-6 right-6 w-2 h-2 bg-emerald-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-ping"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-teal-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:animate-ping"></div>
              <div className="relative z-10">
                {/* Normal state - compact */}
                <div className="group-hover:hidden transform group-hover:scale-105 transition-transform duration-700">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors duration-500">
                    Learn
                  </h3>
                  <p className="text-lg text-teal-100 font-medium group-hover:text-teal-50 transition-colors duration-500">
                    Our blog
                  </p>
                </div>

                {/* Hover state - expanded */}
                <div className="hidden group-hover:flex flex-col h-full animate-in fade-in duration-700">
                  {/* Main title in center */}
                  <div className="flex-1 flex items-center">
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-in slide-in-from-left-8 duration-700">
                      Learn
                    </h3>
                  </div>

                  {/* Bottom content layout - positioned at very bottom */}
                  <div className="flex items-end justify-between gap-6 pt-4">
                    <div className="flex-shrink-0">
                      <p className="text-xl text-teal-100 font-medium animate-in slide-in-from-left-8 duration-700 delay-150">
                        Our blog
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-lg text-teal-50 font-medium animate-in slide-in-from-right-8 duration-700 delay-300">
                        Insights, tutorials, and industry trends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white lg:rounded-r-3xl p-8 md:p-12 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 hover:flex-[2.2] group cursor-pointer relative overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 border-l border-white/10">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              {/* Interactive particles effect */}
              <div className="absolute top-5 right-5 w-2 h-2 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-ping"></div>
              <div className="absolute bottom-5 left-5 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:animate-ping"></div>
              <div className="relative z-10">
                {/* Normal state - compact */}
                <div className="group-hover:hidden transform group-hover:scale-105 transition-transform duration-700">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors duration-500">
                    Team
                  </h3>
                  <p className="text-lg text-purple-100 font-medium group-hover:text-purple-50 transition-colors duration-500">
                    Who we are
                  </p>
                </div>

                {/* Hover state - expanded */}
                <div className="hidden group-hover:flex flex-col h-full animate-in fade-in duration-700">
                  {/* Main title in center */}
                  <div className="flex-1 flex items-center">
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-in slide-in-from-left-8 duration-700">
                      Team
                    </h3>
                  </div>

                  {/* Bottom content layout - positioned at very bottom */}
                  <div className="flex items-end justify-between gap-6 pt-4">
                    <div className="flex-shrink-0">
                      <p className="text-xl text-purple-100 font-medium animate-in slide-in-from-left-8 duration-700 delay-150">
                        Who we are
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-lg text-purple-50 font-medium animate-in slide-in-from-right-8 duration-700 delay-300">
                        Meet the creative minds behind the magic.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
