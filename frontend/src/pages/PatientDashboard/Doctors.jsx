import React, { useState, useRef } from 'react';

const doctors = [
  {
    name: "Dr. Sarah Chen",
    title: "Clinical Psychologist",
    degree: "Ph.D. Harvard",
    experience: "12+ years",
    price: "$150",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600",
    tags: ["Anxiety", "Depression", "CBT"],
    about: "Compassionate psychologist specializing in anxiety and trauma.",
    education: ["Ph.D. Harvard", "M.A. Stanford"],
    certs: ["Licensed Psychologist", "EMDR Certified"],
    reviews: [
      { name: "Jessica L.", stars: 5, text: "Life-changing!" },
      { name: "Mark R.", stars: 5, text: "Incredibly caring" },
      { name: "Amy T.", stars: 5, text: "Best decision I made" }
    ]
  },
  {
    name: "Dr. Michael Torres",
    title: "Psychiatrist",
    degree: "MD Johns Hopkins",
    experience: "15+ years",
    price: "$220",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600",
    tags: ["ADHD", "Bipolar"],
    about: "Expert in medication management.",
    education: ["MD Johns Hopkins"],
    certs: ["Board Certified"],
    reviews: [
      { name: "Alex P.", stars: 5, text: "Finally stable" },
      { name: "Sam K.", stars: 5, text: "Great listener" }
    ]
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Family Therapist",
    degree: "LMFT Pepperdine",
    experience: "10+ years",
    price: "$140",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600",
    tags: ["Couples", "Family"],
    about: "Rebuilding family bonds.",
    education: ["M.A. Pepperdine"],
    certs: ["Gottman Certified"],
    reviews: [
      { name: "Carter Family", stars: 5, text: "Saved our marriage" },
      { name: "John D.", stars: 5, text: "Highly recommend" }
    ]
  },
];

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab('about');
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <>
      {/* Hero Carousel Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 overflow-hidden rounded-3xl">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-12">Meet Our Top Therapists</h1>

          <div className="relative">
            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            >
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="min-w-[360px] snap-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center hover:transform hover:-translate-y-4 transition-all duration-300"
                >
                  <img
                    src={doctor.img}
                    alt={doctor.name}
                    className="w-36 h-36 rounded-full object-cover border-6 border-white shadow-2xl mx-auto mb-6"
                  />
                  <h3 className="text-2xl font-bold mb-2">{doctor.name}</h3>
                  <p className="text-purple-300 mb-6">{doctor.title}</p>
                  <button
                    onClick={() => openModal(doctor)}
                    className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition"
                  >
                    Visit Profile
                  </button>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/40 transition text-2xl"
            >
              ‹
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/40 transition text-2xl"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-12 pb-20 text-center relative">
              <button
                onClick={closeModal}
                className="absolute top-6 right-8 text-3xl text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold text-slate-800 mt-8">{selectedDoctor.name}</h2>
              <p className="text-purple-600 text-xl font-medium mt-2">
                {selectedDoctor.title} • {selectedDoctor.degree}
              </p>

              <div className="flex justify-center gap-12 mt-10 flex-wrap">
                <div>
                  <h3 className="text-2xl font-bold text-purple-700">{selectedDoctor.experience}</h3>
                  <p className="text-gray-600">Experience</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-700">{selectedDoctor.rating} ★★★★★</h3>
                  <p className="text-gray-600">Rating</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-700">{selectedDoctor.price}</h3>
                  <p className="text-gray-600">Per Session</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {selectedDoctor.tags.map((tag, i) => (
                  <span key={i} className="bg-white text-purple-600 px-5 py-2 rounded-full border border-purple-200 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-purple-50 rounded-full p-2 max-w-md mx-auto -mt-8 relative z-10 shadow-lg">
              {['about', 'reviews', 'book'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-full font-semibold capitalize transition ${
                    activeTab === tab ? 'bg-purple-600 text-white' : 'text-purple-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-10 pt-12">
              {activeTab === 'about' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">About Dr. {selectedDoctor.name.split(' ')[1]}</h3>
                  <p className="text-gray-700 leading-relaxed mb-8">{selectedDoctor.about}</p>
                  <h4 className="font-bold text-purple-600 mb-3">Education</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                    {selectedDoctor.education.map((edu, i) => (
                      <li key={i}>{edu}</li>
                    ))}
                  </ul>
                  <h4 className="font-bold text-purple-600 mb-3">Certifications</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selectedDoctor.certs.map((cert, i) => (
                      <li key={i}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {selectedDoctor.reviews.map((review, i) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex justify-between items-center mb-3">
                        <strong>{review.name}</strong>
                        <span className="text-yellow-500">{'★'.repeat(review.stars)}</span>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'book' && (
                <div className="text-center py-12 bg-purple-50 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Healing?</h3>
                  <p className="text-gray-700 mb-8">
                    Dr. {selectedDoctor.name.split(' ')[1]} has openings this week
                  </p>
                  <button className="bg-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition">
                    Book Session Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Doctors;