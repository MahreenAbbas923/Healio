import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can connect this to your backend)
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help and answer any questions you might have. We look forward to hearing from you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg text-purple-700">
                      <FaMapMarkerAlt className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Our Location</h3>
                      <p className="text-gray-600">123 Health Street, Medical District<br />Auckland, New Zealand</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg text-purple-700">
                      <FaPhone className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Phone Number</h3>
                      <p className="text-gray-600">+64 9 123 4567</p>
                      <p className="text-gray-600">Emergency: 111</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg text-purple-700">
                      <FaEnvelope className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Email Address</h3>
                      <p className="text-gray-600">info@healio.com</p>
                      <p className="text-gray-600">support@healio.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      <span className="sr-only">Facebook</span>
                      <i className="fab fa-facebook text-2xl"></i>
                    </a>
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      <span className="sr-only">Twitter</span>
                      <i className="fab fa-twitter text-2xl"></i>
                    </a>
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      <span className="sr-only">Instagram</span>
                      <i className="fab fa-instagram text-2xl"></i>
                    </a>
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      <span className="sr-only">LinkedIn</span>
                      <i className="fab fa-linkedin text-2xl"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                    >
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-100 p-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Us on the Map</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.113370840102!2d174.768442315717!3d-36.85319997962782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47f7b8f5b8b5%3A0x1f1e3f3f3f3f3f3f!2sAuckland%20City%20Hospital!5e0!3m2!1sen!2snz!4v1620000000000!5m2!1sen!2snz"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Our Location on Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;