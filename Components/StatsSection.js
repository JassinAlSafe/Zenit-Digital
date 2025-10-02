import React from 'react';

const StatsSection = () => {
  return (
    <div className="bg-white min-h-screen flex items-center flex-col justify-center py-48 px-4 sm:px-6 lg:px-8">
      {/* Main heading section */}
      <div className="max-w-7xl mx-auto w-full flex justify-center lg:justify-end mb-20 lg:mb-16">
        <div className="text-center lg:text-left max-w-2xl lg:max-w-none">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-medium text-black leading-tight mb-8">
            We are award-winning strategic design<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>studios focusing on building bespoke<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>websites and brand identities that instill<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>trust, make an impact, and drive growth.
          </h1>
                     
          <div className="mt-8 lg:mt-12">
            <button className="inline-flex items-center text-base lg:text-lg font-medium text-black hover:text-gray-700 transition-colors border-b border-black hover:border-gray-700 pb-1">
              Let's Collaborate
              <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Years of Experience */}
          <div className="bg-gray-50 rounded-2xl lg:rounded-3xl p-8 sm:p-10 lg:p-12 text-left shadow-sm h-[320px] sm:h-[350px] lg:h-[400px] flex flex-col justify-center">
            <div className="mb-4 lg:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-custom-pink" fill="none" height="64" viewBox="0 0 64 64" width="64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd" id="hdrm-holgram-rocket" stroke="none" strokeWidth="1">
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="44" x2="56" y1="11" y2="11"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="35" x2="56" y1="15" y2="15"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="37" x2="46" y1="17" y2="17"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="35" x2="44" y1="21" y2="21"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="25" x2="27" y1="25" y2="25"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="40" x2="45" y1="13" y2="13"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="33" x2="36" y1="33" y2="33"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="29" x2="33" y1="37" y2="37"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="25" x2="38" y1="41" y2="41"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="23" x2="25" y1="43" y2="43"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="21" x2="23" y1="45" y2="45"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="16" x2="18" y1="45" y2="45"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="19" x2="21" y1="51" y2="51"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="14" x2="16" y1="56" y2="56"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="19" x2="21" y1="42" y2="42"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="9" x2="11" y1="47" y2="47"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="27" x2="31" y1="53" y2="53"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="5" x2="7" y1="55" y2="55"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="28" x2="38" y1="45" y2="45"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="27" x2="36" y1="49" y2="49"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="14" x2="24" y1="29" y2="29"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="11" x2="21" y1="33" y2="33"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="8" x2="18" y1="37" y2="37"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="31" x2="55" y1="19" y2="19"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="27" x2="53" y1="23" y2="23"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="16" x2="50" y1="27" y2="27"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="12" x2="47" y1="31" y2="31"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="9" x2="44" y1="35" y2="35"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="7" x2="16" y1="39" y2="39"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="20" x2="39" y1="39" y2="39"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="30" x2="38" y1="43" y2="43"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="27" x2="38" y1="47" y2="47"></line>
                  <line id="Line" stroke="currentColor" strokeWidth="2" x1="27" x2="34" y1="51" y2="51"></line>
                </g>
              </svg>
            </div>
            <div className="text-5xl sm:text-6xl lg:text-7xl font-medium text-black mb-4 lg:mb-8">
              15+
            </div>
          </div>

          {/* Projects Completed */}
          <div className="bg-gray-50 rounded-2xl lg:rounded-3xl p-8 sm:p-10 lg:p-12 text-left shadow-sm h-[320px] sm:h-[350px] lg:h-[400px] flex flex-col justify-center">
            <div className="mb-4 lg:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="text-5xl sm:text-6xl lg:text-7xl font-medium text-black mb-4 lg:mb-8">
              300+
            </div>
          </div>

          {/* Client Return Rate */}
          <div className="bg-gray-50 rounded-2xl lg:rounded-3xl p-8 sm:p-10 lg:p-12 text-left shadow-sm h-[320px] sm:h-[350px] lg:h-[400px] flex flex-col justify-center">
            <div className="mb-4 lg:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-5xl sm:text-6xl lg:text-7xl font-medium text-black mb-4 lg:mb-8">
              90%
            </div>
          </div>

          {/* New fourth stat */}
          <div className="bg-gray-50 rounded-2xl lg:rounded-3xl p-8 sm:p-10 lg:p-12 text-left shadow-sm h-[320px] sm:h-[350px] lg:h-[400px] flex flex-col justify-center">
            <div className="mb-4 lg:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="text-5xl sm:text-6xl lg:text-7xl font-medium text-black mb-4 lg:mb-8">
              40+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;