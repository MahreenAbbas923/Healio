// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import mission from '../assets/mission.png';
import story from '../assets/ourStory.png';


const About = () => {
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

      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Healio</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Transforming mental health care through accessible, compassionate, and professional support worldwide.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At Healio, we believe that mental health is as important as physical health. Our mission is to make professional mental health care accessible to everyone, regardless of their background or circumstances.
            </p>
            <p className="text-lg text-gray-700">
              We connect patients with qualified mental health professionals, offer evidence-based resources, and provide 24/7 support to ensure no one faces their struggles alone.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={mission}
              alt="Mission"
              className="w-full max-w-md h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "fa-handshake", title: "Compassion", desc: "We approach every interaction with empathy and understanding." },
              { icon: "fa-shield-alt", title: "Trust & Privacy", desc: "Your data is protected with the highest security standards." },
              { icon: "fa-graduation-cap", title: "Excellence", desc: "Only licensed, qualified professionals join our platform." },
              { icon: "fa-globe", title: "Accessibility", desc: "Mental health care for everyone, everywhere." },
              { icon: "fa-lightbulb", title: "Innovation", desc: "Using latest tech to improve mental wellness." },
              { icon: "fa-users", title: "Community", desc: "A safe, supportive space for all." },
            ].map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition border-t-4 border-purple-600">
                <i className={`fas ${val.icon} text-4xl text-purple-600 mb-4`}></i>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-gray-700">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src={story}
              alt="Our Story"
              className="w-full max-w-2xl h-auto rounded-2xl object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              Healio was founded by mental health advocates, engineers, and doctors who saw how hard it was for people to get help.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Inspired by real struggles, we built a platform that combines professional care with modern technology.
            </p>
            <p className="text-lg text-gray-700">
              Today, we help thousands of people worldwide — and we’re just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-purple-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {["5000+", "200+", "50,000+", "98%"].map((num, i) => (
            <div key={i} className="bg-white py-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">{num}</div>
              <p className="text-lg font-semibold text-gray-700">
                {["Active Users", "Professionals", "Sessions Completed", "Satisfaction Rate"][i]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands who found peace with Healio.</p>
        <div className="flex gap-6 justify-center flex-wrap">
          <button onClick={openRegister} className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition">
            Get Started Today
          </button>
          <a href="/" className="px-8 py-4 border-2 border-white rounded-full font-bold hover:bg-purple-600 transition">
            Back to Home
          </a>
        </div>
      </section>

      <Footer />

      {/* Modals - Reusing the same ones from Home */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold">Welcome Back</h3>
              <button onClick={closeLogin} className="float-right text-3xl">&times;</button>
            </div>
            <div className="p-6">
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4" />
              <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg mb-4" />
              <button className="w-full py-3 bg-purple-600 text-white rounded-lg">Sign In</button>
              <p className="text-center mt-4">Don't have an account? <button onClick={() => { closeLogin(); openRegister(); }} className="text-purple-600 font-bold">Register</button></p>
            </div>
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold">Join Healio Today</h3>
              <button onClick={closeRegister} className="float-right text-3xl">&times;</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="First Name" className="p-3 border rounded-lg" />
                <input type="text" placeholder="Last Name" className="p-3 border rounded-lg" />
              </div>
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg mb-4" />
              <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg mb-4" />
              <select className="w-full p-3 border rounded-lg mb-4">
                <option>I am a...</option>
                <option>Patient</option>
                <option>Doctor</option>
              </select>
              <button className="w-full py-3 bg-purple-600 text-white rounded-lg">Create Account</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;