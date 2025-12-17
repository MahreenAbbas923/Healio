import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import banner from '../assets/banner.png';
import bannerImg1 from '../assets/bannerImg1.png';
import bannerImg2 from '../assets/bannerImg2.png';

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50 pt-12 pb-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Your Journey to
            <br />
            <span className="text-purple-600">Mental Wellness</span>
            <br />
            Begins Here
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
            Healio brings you world-class psychologists and psychiatrists with complete privacy.
            Track your mood, book sessions instantly, and heal at your own pace.
          </p>
          <div className="flex gap-8 pt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600">
                10K+
              </div>
              <p className="text-sm text-gray-600 mt-2">Happy Users</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600">
                500+
              </div>
              <p className="text-sm text-gray-600 mt-2">Experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600">
                4.9★
              </div>
              <p className="text-sm text-gray-600 mt-2">Rating</p>
            </div>
          </div>
        </div>

        <div className="relative h-96 lg:h-full min-h-96">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-96 lg:w-96 lg:h-full bg-gradient-to-br from-purple-200 to-purple-400 rounded-3xl shadow-2xl overflow-hidden">
            <img src={banner} alt="Healing" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-12 -left-8 lg:left-0 w-48 h-48 bg-amber-100 rounded-3xl shadow-xl overflow-hidden border-4 border-white z-10">
            <img src={bannerImg1} alt="Therapist" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 lg:right-10 w-40 h-56 bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl shadow-2xl overflow-hidden">
            <img src={bannerImg2} alt="Support" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-1/2 -right-10 text-9xl text-purple-300 opacity-30">
            <i className="fas fa-brain"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        How Healio Supports Your Mental Wellness
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <div className="text-4xl text-purple-600 mb-4">
            <i className="fas fa-user-md"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Professionals</h3>
          <p className="text-gray-700">
            Connect with qualified psychologists and psychiatrists through our comprehensive directory.
          </p>
        </div>
        <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <div className="text-4xl text-purple-600 mb-4">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
          <p className="text-gray-700">
            Monitor your mental wellness journey with intuitive graphical health trackers.
          </p>
        </div>
        <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <div className="text-4xl text-purple-600 mb-4">
            <i className="fas fa-book-open"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Awareness Hub</h3>
          <p className="text-gray-700">
            Access educational content, research, and resources to promote mental health awareness.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const MotivationalSection = () => (
  <section className="py-20 bg-purple-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">You Are Not Alone</h2>
          <p className="text-lg text-gray-700 mb-8">
            Mental health challenges affect millions of people worldwide, but seeking help is a sign of strength, not
            weakness. Every step you take towards better mental wellness matters, and Healio is here to support you
            every step of the way.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1 in 4</div>
              <div className="text-sm text-gray-700">People experience mental health issues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">80%</div>
              <div className="text-sm text-gray-700">Improve with early intervention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-700">Support available when you need it</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-7xl text-purple-600">
            <i className="fas fa-hands-helping"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQs = [
  {
    question: 'Is my information kept private?',
    answer:
      'Yes. All conversations are confidential and protected. We only store what is needed to provide your care.',
  },
  {
    question: 'Can I talk to a professional immediately?',
    answer: 'You can request an urgent callback or schedule the next available slot with a licensed professional.',
  },
  {
    question: 'Do you support insurance or discounts?',
    answer:
      'We offer flexible pricing options and periodically share discount codes. Check your dashboard for eligibility.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-3">Quick answers to common questions about how Healio works.</p>
        </div>

        <div className="space-y-4">
          {FAQs.map((item, index) => (
            <div key={item.question} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                <span className="text-purple-600 text-xl font-bold">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && <div className="px-5 pb-5 text-gray-700 bg-white">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-6">Ready to Take the First Step?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Join thousands of individuals who have found support and healing through Healio. Your mental wellness matters,
        and we're here to help you thrive.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full cursor-pointer transition-all duration-300 bg-white text-purple-600 hover:bg-gray-100"
        >
          <i className="fas fa-rocket"></i> Get Started Today
        </a>
        <a
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full cursor-pointer transition-all duration-300 border-2 border-white text-white hover:bg-purple-600"
        >
          <i className="fas fa-sign-in-alt"></i> Already Have an Account?
        </a>
        <a
          href="/patient-dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full cursor-pointer transition-all duration-300 bg-purple-800 text-white hover:bg-purple-900 border-2 border-white"
        >
          <i className="fas fa-user"></i> Patient Dashboard
        </a>
        <a
          href="/doctor-dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full cursor-pointer transition-all duration-300 bg-pink-500 text-white hover:bg-pink-600 border-2 border-white"
        >
          <i className="fas fa-user-md"></i> Doctor Dashboard
        </a>
      </div>
    </div>
  </section>
);

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);

  useEffect(() => {
    const closeModals = (e) => {
      if (e.target.classList.contains('fixed')) {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
      }
    };
    window.addEventListener('click', closeModals);
    return () => window.removeEventListener('click', closeModals);
  }, []);

  return (
    <>
      <Navbar openLogin={openLogin} openRegister={openRegister} />
      <HeroSection />
      <FeaturesSection />
      <MotivationalSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onSwitchToRegister={openRegister} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} onSwitchToLogin={openLogin} />
    </>
  );
};

export default Home;

