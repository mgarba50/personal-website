"use client";

import React, { useState } from 'react';

export default function MusaAllamaHome() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-slate-50 text-slate-800 antialiased selection:bg-[#d4af37] selection:text-white min-h-screen font-sans">
      
      {/* Navigation */}
      <nav className="bg-[#0f172a] text-white fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d4af37] text-[#0f172a] flex items-center justify-center font-bold text-xl rounded-sm font-serif">MA</div>
              <span className="font-serif font-bold text-xl tracking-wide hidden sm:block">MUSA ALLAMA</span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#executive" className="hover:text-[#d4af37] transition text-sm uppercase tracking-wider font-semibold">Executive Desk</a>
              <a href="#canon" className="hover:text-[#d4af37] transition text-sm uppercase tracking-wider font-semibold">The Canon</a>
              <a href="#madrasa" className="hover:text-[#d4af37] transition text-sm uppercase tracking-wider font-semibold">The Madrasa</a>
              <a href="#advisory" className="hover:text-[#d4af37] transition text-sm uppercase tracking-wider font-semibold">Advisory</a>
              <a href="#contact" className="bg-[#d4af37] text-[#0f172a] px-5 py-2 rounded-sm font-bold hover:bg-yellow-500 transition text-sm uppercase tracking-wider shadow-md">Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#d4af37] focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1e293b] border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#executive" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-[#d4af37]">Executive Desk</a>
              <a href="#canon" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-[#d4af37]">The Canon</a>
              <a href="#madrasa" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-[#d4af37]">The Madrasa</a>
              <a href="#advisory" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-[#d4af37]">Advisory</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-[#d4af37]">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {}
      <header className="relative bg-[#0f172a] text-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-3/5 text-center lg:text-left">
            <div className="inline-block bg-[#1e293b] border border-[#d4af37]/30 px-4 py-1 rounded-full text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-6">
              Institutional Digital Headquarters
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
              Knowledge. Strategy. <br />
              <span className="text-[#d4af37] italic">Agriculture & Publishing.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              MusaAllama.com is the institutional headquarters for premium books, targeted courses, strategic advisory, agro-industrial intelligence, and practical transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#canon" className="bg-[#d4af37] text-[#0f172a] px-8 py-4 rounded-sm font-bold text-lg hover:bg-yellow-500 transition shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center">
                Explore The Books
              </a>
              <a href="#advisory" className="bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-white/10 transition border border-white/20 flex items-center justify-center">
                Book Strategic Session
              </a>
            </div>
          </div>
          
          {/* Founder Portrait */}
          <div className="lg:w-2/5 flex justify-center" id="executive">
            <div className="relative w-72 h-80 lg:w-80 lg:h-96">
              <div className="absolute inset-0 border-2 border-[#d4af37] transform translate-x-4 translate-y-4 rounded-sm"></div>
              <div className="absolute inset-0 bg-[#1e293b] overflow-hidden rounded-sm border border-gray-700 shadow-2xl flex items-center justify-center group">
                <img 
                  src="/images/musa-portrait.webp" 
                  alt="Musa Allama — engineer, scholar, publisher, and strategist" 
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition duration-500"
                  loading="eager"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent p-4 pt-12">
                  <h3 className="text-[#d4af37] font-bold text-xl mb-1 font-serif">Musa Allama</h3>
                  <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Engineer · Scholar · Publisher · Strategist</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {}
      <section id="canon" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#d4af37] font-bold tracking-widest uppercase text-sm mb-2">Phase 1 Revenue Activation</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4 font-serif">The Canon</h3>
            <p className="text-gray-600 text-lg">Practical books for agriculture, agrochemical sales, Chinese trade communication, and profitable enterprise-building.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Book 1 */}
            <div className="bg-slate-50 rounded-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col group">
              <div className="h-72 bg-gray-100 relative p-6 flex items-center justify-center">
                {/* REPLACE WITH ACTUAL BOOK COVER */}
                <img src="https://placehold.co/400x600/e2e8f0/1e293b?text=The+Modern+Farmer\nCover" alt="The Modern Farmer" className="h-full w-auto object-contain shadow-lg group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 right-4 bg-[#0f172a] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Bestseller</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">Agriculture / Agribusiness</div>
                <h4 className="text-xl font-bold text-[#0f172a] mb-3 font-serif">The Modern Farmer</h4>
                <p className="text-gray-600 text-sm mb-6 flex-grow">A practical blueprint for profitable agriculture in Africa: science, business, technology, profit, and legacy.</p>
                
                <div className="bg-white p-4 rounded border border-gray-100 mb-6 text-sm shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Launch Price:</span>
                    <span className="font-bold text-[#0f172a]">NGN 3,500</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 line-through">Standard Price:</span>
                    <span className="text-gray-400 line-through">NGN 5,000</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-100 mt-2">
                    <span className="text-[#0f172a] font-semibold">PDF + Checklist:</span>
                    <span className="font-bold text-[#d4af37]">NGN 7,500</span>
                  </div>
                </div>
                <button className="w-full bg-[#0f172a] text-white py-3 font-bold hover:bg-slate-800 transition rounded-sm shadow-md">Buy PDF</button>
              </div>
            </div>

            {/* Book 2 */}
            <div className="bg-slate-50 rounded-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col group">
              <div className="h-72 bg-gray-100 relative p-6 flex items-center justify-center">
                {/* REPLACE WITH ACTUAL BOOK COVER */}
                <img src="https://placehold.co/400x600/e2e8f0/1e293b?text=Agrochemical+Sales\nCover" alt="Agrochemical Sales Field Guide" className="h-full w-auto object-contain shadow-lg group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">Technical Selling</div>
                <h4 className="text-xl font-bold text-[#0f172a] mb-3 font-serif">Agrochemical Sales Field Guide</h4>
                <p className="text-gray-600 text-sm mb-6 flex-grow">A complete technical and commercial manual for selling herbicides, insecticides, fungicides, and crop protection products.</p>
                
                <div className="bg-white p-4 rounded border border-gray-100 mb-6 text-sm shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Launch Price:</span>
                    <span className="font-bold text-[#0f172a]">NGN 5,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 line-through">Standard Price:</span>
                    <span className="text-gray-400 line-through">NGN 7,500</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-100 mt-2">
                    <span className="text-[#0f172a] font-semibold">PDF + Templates:</span>
                    <span className="font-bold text-[#d4af37]">NGN 12,000</span>
                  </div>
                </div>
                <button className="w-full bg-[#0f172a] text-white py-3 font-bold hover:bg-slate-800 transition rounded-sm shadow-md">Buy PDF</button>
              </div>
            </div>

            {/* Book 3 */}
            <div className="bg-slate-50 rounded-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col group">
              <div className="h-72 bg-gray-100 relative p-6 flex items-center justify-center">
                {/* REPLACE WITH ACTUAL BOOK COVER */}
                <img src="https://placehold.co/400x600/e2e8f0/1e293b?text=Chinese+For\nAgrochemicals\nCover" alt="Chinese for Agrochemical Professionals" className="h-full w-auto object-contain shadow-lg group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">Trade / Importation</div>
                <h4 className="text-xl font-bold text-[#0f172a] mb-3 font-serif">Chinese for Agrochemicals</h4>
                <p className="text-gray-600 text-sm mb-6 flex-grow">A practical Mandarin field manual for importers, translators, sales experts, and supplier negotiators.</p>
                
                <div className="bg-white p-4 rounded border border-gray-100 mb-6 text-sm shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Launch Price:</span>
                    <span className="font-bold text-[#0f172a]">NGN 7,500</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 line-through">Standard Price:</span>
                    <span className="text-gray-400 line-through">NGN 10,000</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-100 mt-2">
                    <span className="text-[#0f172a] font-semibold">PDF + Phrases:</span>
                    <span className="font-bold text-[#d4af37]">NGN 15,000</span>
                  </div>
                </div>
                <button className="w-full bg-[#0f172a] text-white py-3 font-bold hover:bg-slate-800 transition rounded-sm shadow-md">Buy PDF</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="madrasa" className="py-24 bg-[#0f172a] text-white border-t-4 border-[#d4af37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#d4af37] font-bold tracking-widest uppercase text-sm mb-2">Practical Learning & Strategy</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif">The Madrasa & Advisory</h3>
            <p className="text-gray-400 text-lg">Move from study to execution with targeted courses and private institutional planning sessions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-t-2 border-t-blue-400">
              <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center mb-6 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
              </div>
              <h4 className="text-2xl font-bold mb-3 font-serif">Chinese for Importers</h4>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">A 5-week practical business Chinese course for importers, agrochemical professionals, and procurement teams. Certificate included.</p>
              <div className="text-2xl font-bold text-white mb-6">NGN 25,000</div>
              <button className="w-full bg-transparent border border-white/30 text-white py-3 font-bold hover:bg-white hover:text-[#0f172a] transition rounded-sm">View Course Details</button>
            </div>

            {/* Advisory */}
            <div className="bg-white/10 backdrop-blur-md border border-[#d4af37]/30 p-8 rounded-sm transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t-2 border-t-[#d4af37] relative transform md:-translate-y-4">
              <div className="absolute -top-3 right-4 bg-[#d4af37] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center mb-6 text-[#d4af37]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-2xl font-bold mb-3 font-serif">Strategic Session</h4>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">A private 60-90 minute working session for business, publishing, education, agriculture, or institutional planning.</p>
              <div className="text-2xl font-bold text-[#d4af37] mb-6">NGN 50,000</div>
              <button className="w-full bg-[#d4af37] text-[#0f172a] py-3 font-bold hover:bg-yellow-500 transition rounded-sm shadow-md">Book Your Session</button>
            </div>

            {/* Membership */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-t-2 border-t-emerald-400">
              <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center mb-6 text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h4 className="text-2xl font-bold mb-3 font-serif">Eternal Circle</h4>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">Private membership for serious learners, clients, and institutional supporters who need deeper access and continuous advisory.</p>
              <div className="text-2xl font-bold text-white mb-6">NGN 15,000 <span className="text-sm font-normal text-gray-500">/ month</span></div>
              <button className="w-full bg-transparent border border-white/30 text-white py-3 font-bold hover:bg-white hover:text-[#0f172a] transition rounded-sm">Join The Circle</button>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4 font-serif">Institutional Divisions</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">A publishing house, academy, advisory firm, and archive integrated into one unified platform.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 text-center hover:border-[#d4af37] transition-colors group">
              <div className="mx-auto w-10 h-10 text-gray-400 group-hover:text-[#d4af37] transition-colors mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h4 className="font-bold text-[#0f172a] mb-2 font-serif">The Canon</h4>
              <p className="text-xs text-gray-500">Books, manuals, diwans, and strategic print products.</p>
            </div>
            
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 text-center hover:border-[#d4af37] transition-colors group">
              <div className="mx-auto w-10 h-10 text-gray-400 group-hover:text-[#d4af37] transition-colors mb-4">
                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              </div>
              <h4 className="font-bold text-[#0f172a] mb-2 font-serif">The Madrasa</h4>
              <p className="text-xs text-gray-500">Courses and certifications for practical learning.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 text-center hover:border-[#d4af37] transition-colors group">
              <div className="mx-auto w-10 h-10 text-gray-400 group-hover:text-[#d4af37] transition-colors mb-4">
                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              </div>
              <h4 className="font-bold text-[#0f172a] mb-2 font-serif">Agro Command</h4>
              <p className="text-xs text-gray-500">Hydroponics, chemicals, and procurement intelligence.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 text-center hover:border-[#d4af37] transition-colors group">
              <div className="mx-auto w-10 h-10 text-gray-400 group-hover:text-[#d4af37] transition-colors mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="font-bold text-[#0f172a] mb-2 font-serif">Gallifrey Digital</h4>
              <p className="text-xs text-gray-500">Corporate ICT, web platforms, and compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0f172a] rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 lg:p-16 text-white flex flex-col justify-center">
              <div className="text-[#d4af37] font-bold tracking-widest uppercase text-sm mb-3">Free Practical Resources</div>
              <h3 className="text-3xl font-bold mb-4 font-serif">Start your transformation today.</h3>
              <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                Download our highly curated guides and checklists. Whether you need to negotiate with Chinese suppliers, start a hydroponics farm, or package your knowledge into a digital product, these free resources bridge the gap between intent and action.
              </p>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#d4af37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  10 Chinese Phrases for Importers
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#d4af37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Hydroponics Starter Checklist
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#d4af37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Agrochemical Sales Checklist
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#d4af37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Knowledge to Digital Product Blueprint
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 bg-gray-50 p-10 lg:p-16 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-[#0f172a] mb-6 font-serif">Request Your Resource</h4>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-shadow" placeholder="Engr. Musa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-shadow" placeholder="musa@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Resource</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none bg-white transition-shadow">
                    <option>10 Chinese Phrases Every Importer Should Know</option>
                    <option>Hydroponics Starter Checklist</option>
                    <option>Agrochemical Sales Field Guide Preview</option>
                    <option>Modern Farmer Profit Checklist</option>
                    <option>How to Turn Your Knowledge into a Digital Product</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-[#d4af37] text-[#0f172a] py-4 font-bold text-lg hover:bg-yellow-500 transition rounded-sm shadow-md mt-4">
                  Send Me The Resource
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">Your data is secure. Join the Institutional Dispatch.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer id="contact" className="bg-[#0f172a] text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#d4af37] text-[#0f172a] flex items-center justify-center font-bold text-sm rounded-sm font-serif">MA</div>
                <span className="font-serif font-bold tracking-wide">MUSA ALLAMA</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Office of the Principal<br />Maiduguri · Nigeria</p>
              <p className="text-gray-400 text-xs italic">A private institution of knowledge, strategy, publishing, agriculture, and practical transformation.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-[#d4af37] mb-4 uppercase text-xs tracking-wider">Institution</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Executive Desk</a></li>
                <li><a href="#" className="hover:text-white transition">Executive Dossier</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#d4af37] mb-4 uppercase text-xs tracking-wider">Knowledge</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#canon" className="hover:text-white transition">The Canon</a></li>
                <li><a href="#madrasa" className="hover:text-white transition">The Madrasa</a></li>
                <li><a href="#" className="hover:text-white transition">Living Library</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#d4af37] mb-4 uppercase text-xs tracking-wider">Legal & Compliance</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2026 MusaAllama.com. All Rights Reserved. Nigeria / Global advisory available.</p>
            <p className="mt-4 md:mt-0 text-center md:text-right max-w-xl">
              Disclaimer: Content on MusaAllama.com does not replace legal, financial, medical, regulatory, or professional advice. Consult qualified professionals before making regulated decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}