import React, { useState, useRef } from 'react';

const doctors = [
  {
    name: "Dr. Sarah Chen",
    title: "Clinical Psychology",
    degree: "Ph.D. in Clinical Psychology, Harvard University",
    experience: "12 years",
    price: "$150",
    rating: 4.9,
    reviewCount: 127,
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600",
    tags: ["Anxiety Disorders", "Depression", "Cognitive Behavioral Therapy", "Mindfulness-Based Therapy", "Trauma Recovery"],
    about: "Dr. Sarah Chen is a compassionate and highly skilled clinical psychologist with over 12 years of experience helping individuals overcome anxiety, depression, and trauma. She uses evidence-based approaches including Cognitive Behavioral Therapy (CBT), EMDR, and mindfulness techniques to help her patients achieve lasting mental wellness.",
    education: ["Ph.D. in Clinical Psychology - Harvard University", "M.A. in Psychology - Stanford University", "B.A. in Psychology - Yale University"],
    certs: ["Licensed Clinical Psychologist", "EMDR Certified Therapist", "Certified CBT Practitioner"],
    location: "Downtown Medical Center",
    consultationType: "Video & In-person",
    available: true,
    reviews: [
      { name: "Anonymous Patient", verified: true, stars: 5, text: "Dr. Chen has been incredibly helpful in my journey with anxiety. Her approach is gentle yet effective, and I feel much more equipped to handle my challenges.", date: "September 2024" },
      { name: "Anonymous Patient", verified: true, stars: 5, text: "Professional, empathetic, and skilled. Dr. Chen created a safe space for me to work through my depression. Highly recommend!", date: "August 2024" },
      { name: "Anonymous Patient", verified: true, stars: 4, text: "Great experience overall. Dr. Chen is knowledgeable and patient. The CBT techniques she taught me have been very helpful.", date: "July 2024" }
    ]
  },
  {
    name: "Dr. Michael Torres",
    title: "Psychiatry",
    degree: "MD in Psychiatry, Johns Hopkins University",
    experience: "15 years",
    price: "$220",
    rating: 4.8,
    reviewCount: 98,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600",
    tags: ["ADHD", "Bipolar Disorder", "Medication Management", "Anxiety"],
    about: "Dr. Michael Torres is a board-certified psychiatrist specializing in medication management for ADHD, bipolar disorder, and anxiety. With 15 years of experience, he takes a holistic approach combining medication with therapy recommendations.",
    education: ["MD in Psychiatry - Johns Hopkins University", "Residency - Massachusetts General Hospital"],
    certs: ["Board Certified Psychiatrist", "ADHD Specialist Certification"],
    location: "Westside Clinic",
    consultationType: "Video & In-person",
    available: true,
    reviews: [
      { name: "Anonymous Patient", verified: true, stars: 5, text: "Finally found stability with Dr. Torres. He really listens and adjusts treatment as needed.", date: "October 2024" },
      { name: "Anonymous Patient", verified: true, stars: 5, text: "Great listener and very thorough. Highly recommend for anyone struggling with ADHD.", date: "September 2024" }
    ]
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Family Therapy",
    degree: "LMFT, Pepperdine University",
    experience: "10 years",
    price: "$140",
    rating: 4.9,
    reviewCount: 156,
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600",
    tags: ["Couples Therapy", "Family Counseling", "Relationship Issues", "Communication"],
    about: "Dr. Emily Rodriguez is a licensed marriage and family therapist dedicated to helping couples and families rebuild their bonds. She uses the Gottman Method and Emotionally Focused Therapy to help clients improve communication and strengthen relationships.",
    education: ["M.A. in Marriage and Family Therapy - Pepperdine University", "B.A. in Psychology - UCLA"],
    certs: ["Licensed Marriage and Family Therapist", "Gottman Level 3 Certified", "EFT Certified Therapist"],
    location: "Family Wellness Center",
    consultationType: "In-person only",
    available: true,
    reviews: [
      { name: "Anonymous Patient", verified: true, stars: 5, text: "Dr. Rodriguez saved our marriage. Her techniques really work!", date: "November 2024" },
      { name: "Anonymous Patient", verified: true, stars: 5, text: "Highly recommend for any couple going through a rough patch. She's amazing.", date: "October 2024" }
    ]
  },
];

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingType, setBookingType] = useState('video');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const carouselRef = useRef(null);

  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setActiveTab('about');
    setShowBookingSuccess(false);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setShowBookingSuccess(false);
  };

  const handleBookSession = () => {
    if (bookingDate && bookingTime) {
      setShowBookingSuccess(true);
      setTimeout(() => setShowBookingSuccess(false), 3000);
    }
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

      {/* Full Page Doctor Profile */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
          {/* Header Bar */}
          <div className="bg-purple-600 text-white py-4 px-6 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <button
                onClick={closeModal}
                className="flex items-center gap-2 text-white hover:text-purple-200 transition"
              >
                <i className="fas fa-arrow-left"></i>
                <span>Back to Doctors</span>
              </button>
              <h1 className="text-xl font-semibold">Doctor Profile</h1>
              <div className="w-24"></div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left - Image */}
                <div className="flex flex-col items-center">
                  <img
                    src={selectedDoctor.img}
                    alt={selectedDoctor.name}
                    className="w-40 h-40 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="font-bold text-lg">{selectedDoctor.rating}</span>
                    <span className="text-gray-500">({selectedDoctor.reviewCount} reviews)</span>
                  </div>
                  {selectedDoctor.available && (
                    <span className="mt-3 px-4 py-1.5 bg-green-100 text-green-600 font-medium rounded-full">
                      Available
                    </span>
                  )}
                </div>
                
                {/* Right - Info */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                  <p className="text-purple-600 text-lg font-medium">{selectedDoctor.title}</p>
                  <p className="text-gray-500 mt-1">{selectedDoctor.degree}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <i className="fas fa-clock text-purple-500 text-lg"></i>
                      <span>{selectedDoctor.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <i className="fas fa-map-marker-alt text-purple-500 text-lg"></i>
                      <span>{selectedDoctor.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <i className="fas fa-dollar-sign text-purple-500 text-lg"></i>
                      <span>{selectedDoctor.price} per session</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <i className="fas fa-video text-purple-500 text-lg"></i>
                      <span>{selectedDoctor.consultationType}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-3">Specializations</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.tags.map((tag, i) => (
                        <span key={i} className="px-4 py-2 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <button 
                      onClick={() => setActiveTab('book')}
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                      <i className="fas fa-calendar"></i>
                      Book Session
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                      <i className="fas fa-comment"></i>
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'book', label: 'Book Session' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-5 font-medium text-center transition ${
                      activeTab === tab.id 
                        ? 'text-purple-600 border-b-3 border-purple-600 bg-purple-50' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About {selectedDoctor.name}</h3>
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">{selectedDoctor.about}</p>
                    
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Education</h4>
                    <ul className="space-y-3 mb-8">
                      {selectedDoctor.education.map((edu, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <i className="fas fa-graduation-cap text-purple-500 mt-1 text-lg"></i>
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Certifications & Licenses</h4>
                    <ul className="space-y-3">
                      {selectedDoctor.certs.map((cert, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <i className="fas fa-certificate text-purple-500 mt-1 text-lg"></i>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Patient Reviews</h3>
                    <div className="space-y-5">
                      {selectedDoctor.reviews.map((review, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-gray-800">{review.name}</span>
                              {review.verified && (
                                <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">Verified</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-yellow-500 text-lg">{'★'.repeat(review.stars)}{'☆'.repeat(5-review.stars)}</span>
                              <span className="text-gray-400">{review.date}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 italic text-lg">"{review.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'book' && (
                  <div>
                    {showBookingSuccess ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <i className="fas fa-check text-4xl text-green-600"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">Booking Confirmed!</h3>
                        <p className="text-gray-600 text-lg">Your appointment with {selectedDoctor.name} has been scheduled.</p>
                        <p className="text-purple-600 font-semibold text-xl mt-3">{bookingDate} at {bookingTime}</p>
                        <button 
                          onClick={closeModal}
                          className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                        >
                          Back to Doctors
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Schedule Your Session</h3>
                        
                        <div className="space-y-8">
                          {/* Consultation Type */}
                          <div>
                            <label className="block font-medium text-gray-700 mb-3">Consultation Type</label>
                            <div className="grid grid-cols-2 gap-4">
                              <button
                                onClick={() => setBookingType('video')}
                                className={`p-6 rounded-xl border-2 transition text-center ${
                                  bookingType === 'video' 
                                    ? 'border-purple-600 bg-purple-50' 
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                              >
                                <i className="fas fa-video text-3xl text-purple-600 mb-3"></i>
                                <p className="font-semibold text-lg">Video Call</p>
                                <p className="text-gray-500">From anywhere</p>
                              </button>
                              <button
                                onClick={() => setBookingType('inperson')}
                                className={`p-6 rounded-xl border-2 transition text-center ${
                                  bookingType === 'inperson' 
                                    ? 'border-purple-600 bg-purple-50' 
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                              >
                                <i className="fas fa-hospital text-3xl text-purple-600 mb-3"></i>
                                <p className="font-semibold text-lg">In-Person</p>
                                <p className="text-gray-500">{selectedDoctor.location}</p>
                              </button>
                            </div>
                          </div>
                          
                          {/* Date Selection */}
                          <div>
                            <label className="block font-medium text-gray-700 mb-3">Select Date</label>
                            <input
                              type="date"
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                            />
                          </div>
                          
                          {/* Time Selection */}
                          <div>
                            <label className="block font-medium text-gray-700 mb-3">Select Time</label>
                            <div className="grid grid-cols-3 gap-4">
                              {availableTimes.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => setBookingTime(time)}
                                  className={`p-4 rounded-xl border-2 transition text-lg ${
                                    bookingTime === time 
                                      ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold' 
                                      : 'border-gray-200 hover:border-purple-300'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Price Summary */}
                          <div className="bg-purple-50 p-6 rounded-xl">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 text-lg">Session Fee</span>
                              <span className="text-2xl font-bold text-purple-600">{selectedDoctor.price}</span>
                            </div>
                          </div>
                          
                          {/* Book Button */}
                          <button
                            onClick={handleBookSession}
                            disabled={!bookingDate || !bookingTime}
                            className="w-full py-5 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Confirm Booking
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Doctors;