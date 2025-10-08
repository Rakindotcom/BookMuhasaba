import { useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import ImageSlideshow from './components/ImageSlideshow'
import About from './components/About'
import Pricing from './components/Pricing'
import OrderForm from './components/OrderForm'
import Contact from './components/Contact'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
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
    </div>
  )
}

export default App
