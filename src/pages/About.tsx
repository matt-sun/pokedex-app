function About() {
  return (
    <div className="mx-auto my-2 sm:my-4 md:my-8 max-w-4xl min-w-xs">
      {/* Hero Section */}
      <div
        className="border rounded-xl shadow-sm dark:shadow-gray-700 mb-4 md:mb-6 bg-gradient-to-br from-pokemon-boston-red to-red-400 dark:from-red-900 dark:to-red-700/20"
        style={{
          animation: "var(--animate-fade-in-down)",
          animationDelay: `${Math.random() * 0.5}s`,
          opacity: 0,
        }}
      >
        <div className="p-4 sm:p-6 md:p-8 text-center">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-6 text-pokemon-yellow dark:text-pokemon-gold drop-shadow-lg">
            About This Project
          </h1>
          <div className="bg-gray-200/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              This project is a Pokedex App built with React and TypeScript as a
              newbie developer coming from Vanilla Javascript and ExpressJS.{" "}
              <br />
              <br />I wanted to create a simple yet functional application that
              would push me to learn more about React, TypeScript, caching,
              testing, and deployment on modern apps. <br />
              <br />
              This app was made with little AI assistance, aside from design
              choices and some code snippets generated to optimize my already
              exisiting code.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div
        className="border rounded-xl shadow-sm mb-4 md:mb-6 dark:shadow-gray-700"
        style={{
          animation: "var(--animate-fade-in-right)",
          animationDelay: `${Math.random() * 0.5}s`,
          opacity: 0,
        }}
      >
        <div className="p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4 sm:mb-6 md:mb-8 text-pokemon-blue">
            Tech Stack
          </h2>

          {/* Core Technologies */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-boston-red flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">🔥</span> Core
              Technologies
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 md:gap-4">
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-fire/10 to-pokemon-fire/5 border border-pokemon-fire/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-fire rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    React (Vite)
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Modern React framework
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-blue/10 to-pokemon-blue/5 border border-pokemon-blue/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-blue rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    TypeScript
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Strict mode, no any
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Styling & UI */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-water flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">🎨</span>{" "}
              Styling & UI
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 md:gap-4">
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-water/10 to-pokemon-water/5 border border-pokemon-water/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-water rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Tailwind CSS
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Utility-first CSS framework
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-electric/10 to-pokemon-electric/5 border border-yellow-500/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-electric rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Shadcn/UI
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Beautiful component library
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Infrastructure */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-grass flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">🛠️</span> Tools
              & Infrastructure
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 md:gap-4">
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-grass/10 to-pokemon-grass/5 border border-pokemon-grass/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-grass rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    React Router
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    v6.3 routing
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-psychic/10 to-pokemon-psychic/5 border border-pokemon-psychic/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-psychic rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    ESLint + Prettier
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Code quality tools
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-rock/10 to-pokemon-rock/5 border border-pokemon-rock/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-rock rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    IndexedDB
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Client-side caching
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-fighting/10 to-pokemon-fighting/5 border border-pokemon-fighting/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-fighting rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Jest + RTL
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Testing framework
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-steel/10 to-pokemon-steel/5 border border-pokemon-steel/20 rounded-lg p-4 md:col-span-2 lg:col-span-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-steel rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Vercel
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Deployment platform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Goals Section */}
      <div
        className="border rounded-xl shadow-sm mb-4 md:mb-6 dark:shadow-gray-700"
        style={{
          animation: "var(--animate-fade-in-left)",
          animationDelay: `${Math.random() * 0.5}s`,
          opacity: 0,
        }}
      >
        <div className="p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4 sm:mb-6 md:mb-8 text-pokemon-blue">
            Learning Goals
          </h2>

          {/* Development Skills */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-grass flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">🚀</span>{" "}
              Development Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-3 md:gap-4">
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-grass/10 to-pokemon-grass/5 border border-pokemon-grass/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-grass rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Modular React Architecture
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Build maintainable, scalable codebases
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-fire/10 to-pokemon-fire/5 border border-pokemon-fire/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-fire rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    TypeScript Proficiency
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Apply strict type safety across the app
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-water flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">⚙️</span>{" "}
              Technical Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-3 md:gap-4">
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-water/10 to-pokemon-water/5 border border-pokemon-water/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-water rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    API Integration
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Efficiently cache external data sources
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-electric/10 to-pokemon-electric/5 border border-yellow-500/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-electric rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Responsive Design
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Reusable UI components & layouts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality & Polish */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-psychic flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">✨</span>{" "}
              Quality & Polish
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-3 md:gap-4">
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-psychic/10 to-pokemon-psychic/5 border border-pokemon-psychic/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-psychic rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Modern Theming
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Light/dark mode with UI primitives
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gradient-to-r from-pokemon-fairy/10 to-pokemon-fairy/5 border border-pokemon-fairy/20 rounded-lg p-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-fairy rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    Testing Coverage
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Automated tests for core logic
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution Section */}
      <div
        className="border rounded-xl shadow-sm dark:shadow-gray-700 bg-gradient-to-br from-pokemon-blue to-pokemon-water/80 dark:from-blue-900 dark:to-blue-600/10"
        style={{
          animation: "var(--animate-fade-in-up)",
          animationDelay: `${Math.random() * 0.5}s`,
          opacity: 0,
        }}
      >
        <div className="p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4 sm:mb-6 md:mb-8 text-pokemon-yellow dark:text-pokemon-gold">
            Attribution & Thanks
          </h2>

          {/* API & Data */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-yellow dark:text-pokemon-gold flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">📊</span> Data &
              API
            </h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-yellow dark:bg-pokemon-gold rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    <a
                      href="https://pokeapi.co/"
                      className="text-pokemon-yellow dark:text-pokemon-gold hover:text-white underline decoration-2 underline-offset-2 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PokeAPI
                    </a>
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-200">
                    Free and open Pokémon data and images
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* UI & Components */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-pokemon-yellow dark:text-pokemon-gold flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">🎨</span> UI &
              Components
            </h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pokemon-yellow dark:bg-pokemon-gold rounded-full mt-1 flex-shrink-0 shadow-sm"></div>
                <div>
                  <span className="font-semibold block text-xs sm:text-sm md:text-base">
                    <a
                      href="https://ui.shadcn.com/"
                      className="text-pokemon-yellow dark:text-pokemon-gold hover:text-white underline decoration-2 underline-offset-2 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shadcn/UI
                    </a>
                  </span>
                  <span className="text-[0.7rem] sm:text-xs md:text-sm text-gray-200">
                    Beautiful and accessible component library
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
