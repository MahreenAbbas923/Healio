import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import yoga from '../assets/yoga.png';
import breathing from '../assets/breathing.png';
import img1 from '../assets/img1.png';
import anxiety from '../assets/anxiety.png';
import journaling from '../assets/Journling.png';
import mindHygiene from '../assets/mindHygine.png';
import mindWork from '../assets/mindWork.png';

const slides = [
  { img: yoga, quote: "Move gently. Let the body lead the mind." },
  { img: breathing, quote: "Breathe deeply. Anchor your attention to this moment." },
  { img: img1, quote: "Fix thought — steady the mind, soften the edges." }
];

const articles = [
  { img: anxiety, title: "Understanding Anxiety: Signs, Symptoms, and Solutions", date: "May 28, 2024" },
  { img: journaling, title: "The Power of Journaling for Mental Health", date: "May 25, 2024" },
  { img: mindHygiene, title: "Daily Hygiene: The Perfect Routine for Your Mind", date: "May 22, 2024" },
  { img: mindWork, title: "Breaking the Stigma: Talking About Mental Health at Work", date: "May 18, 2024" }
];

const AwarenessHub = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar openLogin={openLogin} openRegister={openRegister} />

      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Mental Health Awareness Hub</h1>
          <p className="text-xl mt-4 max-w-3xl mx-auto opacity-90">
            Explore resources, articles, and tools to support your mental wellness journey.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-12">

          {/* Mindfulness Slideshow */}
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden relative h-96 md:h-[40rem]">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === i ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${slide.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            ))}
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold text-purple-300 drop-shadow-2xl animate-fadeInUp">
                  {slides[currentSlide].quote}
                </h2>
                <p className="mt-6 text-xl text-purple-200">
                  Simple mindfulness practices to reduce daily stress and bring clarity.
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-2xl font-bold text-white">Mindfulness Techniques to Reduce Daily Stress</h3>
            </div>
          </article>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((art, i) => (
              <article key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                <img src={art.img} alt={art.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <span className="text-xs text-gray-500"><i className="fas fa-calendar mr-2"></i>{art.date}</span>
                  <h3 className="text-xl font-bold mt-3">{art.title}</h3>
                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {art.title.includes("Anxiety") && "Learn to recognize early signs..."}
                    {art.title.includes("Journaling") && "How writing your thoughts can help..."}
                    {art.title.includes("Hygiene") && "Simple habits that protect your..."}
                    {art.title.includes("Stigma") && "How to have open conversations..."}
                  </p>
                  <a href="#" className="mt-5 text-purple-600 font-medium hover:underline inline-flex items-center">
                    Read More <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Wellness Exercises */}
          <section className="mt-20">
            <h2 className="text-4xl font-bold text-center mb-12">Wellness Exercises</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "fa-wind", title: "Deep Breathing", time: "5 minutes" },
                { icon: "fa-om", title: "Meditation", time: "12 minutes" },
                { icon: "fa-pen-fancy", title: "Gratitude Journal", time: "8 minutes" },
                { icon: "fa-spa", title: "Muscle Relaxation", time: "20 minutes" }
              ].map((ex, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition border-t-4 border-purple-600">
                  <i className={`fas ${ex.icon} text-5xl text-purple-600 mb-4`}></i>
                  <h4 className="font-bold text-lg">{ex.title}</h4>
                  <p className="text-gray-600 text-sm mt-2">Guided session</p>
                  <span className="block text-xs text-gray-500 mt-3"><i className="fas fa-clock mr-1"></i>{ex.time}</span>
                  <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-purple-700 transition">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Calendar */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-calendar-alt text-purple-600"></i> Awareness Calendar
            </h3>
            <div className="space-y-4 text-sm">
              {["Oct 10 — World Mental Health Day", "Oct 12 — World Suicide Prevention Day", "Nov 14 — Children's Grief Awareness Day", "Dec 1 — World AIDS Day"].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <strong className="text-purple-600">{item.split(" — ")[0]}</strong>
                  <span className="text-gray-600 text-right">{item.split(" — ")[2]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Resources */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <i className="fas fa-link text-purple-600"></i> Quick Resources
            </h3>
            <ul className="space-y-4">
              {["Crisis Hotlines", "Find a Therapist", "Suicide Prevention", "Support Groups"].map((text, i) => (
                <li key={i}>
                  <a href="#" className="text-purple-600 font-medium hover:underline flex items-center gap-2">
                    <i className={`fas fa-${i===0?'phone':i===1?'user-md':i===2?'life-ring':'users'}`}></i>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold">Stay Informed</h3>
            <p className="text-sm mt-3 opacity-90">Get weekly mental health tips</p>
            <input type="email" placeholder="your.email@example.com" className="mt-6 w-full px-6 py-3 rounded-full text-gray-100" />
            <button className="mt-4 w-full bg-white text-purple-600 py-3 rounded-full font-bold hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </aside>
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Prioritize Your Mental Health?</h2>
        <div className="flex gap-6 justify-center flex-wrap mt-8">
          <button onClick={openRegister} className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100">
            Get Started Today
          </button>
          <a href="/" className="px-8 py-4 border-2 border-white rounded-full font-bold hover:bg-purple-700">
            Back to Home
          </a>
        </div>
      </section>

      <Footer />

      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onSwitchToRegister={openRegister} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} onSwitchToLogin={openLogin} />
    </>
  );
};

export default AwarenessHub;