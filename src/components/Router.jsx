import React, { useState, useEffect } from 'react'
import Hero from './Hero'
import Features from './Features'
import ImageSlideshow from './ImageSlideshow'
import About from './About'
import Pricing from './Pricing'
import OrderForm from './OrderForm'
import Contact from './Contact'
import FloatingWhatsApp from './FloatingWhatsApp'
import Admin from './Admin'

const Router = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    const navigate = (path) => {
        window.history.pushState({}, '', path)
        setCurrentPath(path)
    }

    if (currentPath === '/admin') {
        return <Admin />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <Hero />
            <Features />
            <ImageSlideshow />
            <About />
            <Pricing />
            <OrderForm />
            <Contact />
            <FloatingWhatsApp />

            {/* Admin Access Button - Hidden in bottom right */}
            <button
                onClick={() => navigate('/admin')}
                className="fixed bottom-4 right-20 bg-gray-800 text-white p-2 rounded-full opacity-20 hover:opacity-100 transition-opacity z-50"
                title="Admin Access"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
            </button>
        </div>
    )
}

export default Router