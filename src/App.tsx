import { useState } from 'react';
import { Clock, Hammer, Menu, X, ArrowRight, CheckCircle, Camera, FileText, Smile, PenTool, Zap, Droplets, Ruler, Mail, Copy, Check } from 'lucide-react';
import IntakeForm from './IntakeForm';
import './index.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactEmail = 'info@handyonthespot.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenBooking = () => {
    setShowBooking(true);
    setIsMenuOpen(false);
  };

  const services = [
    { icon: <PenTool className="h-6 w-6" />, title: "Drywall & Painting", desc: "Patching holes, color matching, and full room painting." },
    { icon: <Zap className="h-6 w-6" />, title: "Light Electrical", desc: "Replacing fixtures, outlets, switches, and ceiling fans." },
    { icon: <Droplets className="h-6 w-6" />, title: "Plumbing", desc: "Leaky faucets, running toilets, drain clog removal, and disposal replacement." },
    { icon: <Hammer className="h-6 w-6" />, title: "General Assembly", desc: "Furniture assembly, mounting TVs, hanging shelves." },
    { icon: <Ruler className="h-6 w-6" />, title: "Carpentry Repairs", desc: "Door adjustments, trim repair, cabinet hardware." },
    { icon: <CheckCircle className="h-6 w-6" />, title: "Honey-Do Lists", desc: "Group small tasks together for a half-day rate." },
  ];

  return (
    <div className="min-h-screen font-inter text-slate-800 bg-white">
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 rounded-xl shadow-md group-hover:shadow-orange-glow transition-all duration-300">
                <Hammer className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                HandyOnTheSpot<span className="text-orange-500">.com</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200">How it Works</a>
              <a href="#services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200">Services</a>
              <button
                onClick={handleOpenBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none">
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-premium-lg p-6 flex flex-col gap-5">
             <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors">How it Works</a>
             <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors">Services</a>
             <button
                onClick={handleOpenBooking}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-semibold text-lg transition-all shadow-md"
              >
                Book Now
              </button>
          </div>
        )}
      </nav>

      {/* --- CONTACT BANNER --- */}
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Have questions before booking?</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2 transition-colors"
              >
                {contactEmail}
              </a>
              <button
                onClick={copyToClipboard}
                className="group flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-slate-600 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 opacity-90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731117-104f2a8d23e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 md:py-36 lg:py-48">
          <div className="lg:w-2/3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-orange-400/30 text-orange-300 font-semibold text-sm mb-8 shadow-lg backdrop-blur-md">
              <Clock className="h-4 w-4" />
              <span>72-Hour Service Guarantee</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
              Get a Professional Handyman in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">72 Hours or Less.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl leading-relaxed font-medium">
              Stop waiting weeks for a callback. We provide vetted, reliable professionals for your home repair needs quickly. Simply describe the job, upload photos, and we handle the rest.
            </p>

            {/* Contact Info */}
            <div className="mb-10 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-4 shadow-lg">
              <div className="flex items-center gap-2 text-slate-200">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="font-medium">Questions?</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-orange-300 hover:text-orange-200 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                >
                  {contactEmail}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="group flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg transition-all duration-200"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-300" />
                      <span className="text-xs font-medium text-green-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-200 group-hover:text-white transition-colors" />
                      <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={handleOpenBooking}
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-orange-glow hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1 flex justify-center items-center gap-2"
              >
                Get Your Quote <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#services" className="px-8 py-4 rounded-xl font-semibold text-white border-2 border-slate-600 hover:bg-white/10 hover:border-slate-500 transition-all text-center">
                View Our Services
              </a>
            </div>

            <p className="mt-8 text-base text-slate-400 flex flex-wrap items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" /> <span className="font-medium">No hidden fees</span>
              <span className="mx-2">•</span>
              <CheckCircle className="h-5 w-5 text-green-400" /> <span className="font-medium">Licensed & Insured</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">We've simplified home repair. No more calling around and leaving voicemails.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10"></div>

            {/* Step 1 */}
            <div className="text-center">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-premium relative">
                <Camera className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">1. Snap & Upload</h3>
              <p className="text-lg text-slate-600 leading-relaxed">Take a few photos of your repair needs and upload them through our secure portal.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-premium relative">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">2. Get an Estimate</h3>
              <p className="text-lg text-slate-600 leading-relaxed">We will review your project, ask any necessary clarifying questions, and send a comprehensive quote.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-premium relative">
                <Smile className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">3. Job Done</h3>
              <p className="text-lg text-slate-600 leading-relaxed">Approve the quote, pick a time slot, and our vetted pro fixes it—guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">From small "honey-do" lists to specialized repairs, we have you covered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-premium hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center mb-5 text-orange-600 group-hover:shadow-md transition-shadow">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block bg-gradient-to-br from-blue-600 to-blue-700 text-white p-10 rounded-3xl max-w-4xl w-full relative overflow-hidden shadow-premium-lg">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-3">Have a project not listed here?</h3>
                  <p className="text-blue-100 text-lg">If it's in a home, we can probably fix it. Send us the details!</p>
                </div>
                <button
                  onClick={handleOpenBooking}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-orange-glow hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Get a Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 rounded-xl shadow-md">
                  <Hammer className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">
                  HandyOnTheSpot<span className="text-orange-500">.com</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md mb-6">
                Professional home repair services delivered quickly and reliably. Your trusted partner for all home maintenance needs.
              </p>
              <div className="flex items-center gap-3 text-slate-400">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-medium">Licensed & Insured</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Services</a></li>
                <li><button onClick={handleOpenBooking} className="text-slate-400 hover:text-white transition-colors">Book Now</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Get Started</h3>
              <button
                onClick={handleOpenBooking}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg w-full"
              >
                Get a Quote
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} HandyOnTheSpot. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Serving communities with excellence since 2024
            </p>
          </div>
        </div>
      </footer>

      {/* --- BOOKING MODAL --- */}
      {showBooking && (
        <IntakeForm 
          onCancel={() => setShowBooking(false)} 
        />
      )}

    </div>
  );
};

export default App;