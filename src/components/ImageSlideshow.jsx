import React, { useState, useEffect } from 'react'

const ImageSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const images = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg']

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [images.length])

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            প্রোডাক্ট গ্যালারি
          </h2>
          <p className="text-lg text-gray-600">
            মুহাসাবা জার্নালের একাংশ দেখুন
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden slideshow-container">
            {/* Main Image Display */}
            <div
              className="relative h-[500px] md:h-[600px] flex items-center justify-center bg-gray-100 cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center p-4 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <img
                    src={`/${image}`}
                    alt={`মুহাসাবা জার্নাল - পেজ ${index + 1}`}
                    className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentSlide + 1} / {images.length}
              </div>
            </div>




          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageSlideshow