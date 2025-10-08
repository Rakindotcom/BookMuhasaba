import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    package: '',
    address: '',
    whatsapp: '',
    paymentMethod: '',
    paymentDetails: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Add order to Firestore
      await addDoc(collection(db, 'orders'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'pending'
      })
      
      alert('অর্ডার সফলভাবে জমা দেওয়া হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।')
      
      // Reset form
      setFormData({
        name: '',
        package: '',
        address: '',
        whatsapp: '',
        paymentMethod: '',
        paymentDetails: ''
      })
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('অর্ডার জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="order-form" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              এখনই অর্ডার করুন!
            </h2>
            <p className="text-lg text-gray-600">
              ফর্ম পূরণ করে অর্ডার করে ফেলুন ইনশাআল্লাহ!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  আপনার নামটি দিন ইনশাআল্লাহ *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                />
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  যে প্যাকটি সংগ্রহ করতে চান *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="package"
                      value="single"
                      onChange={handleChange}
                      className="mr-3"
                      required
                    />
                    <span>সিঙ্গেল - ১ পিস (৪৯০ টাকা)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="package"
                      value="family"
                      onChange={handleChange}
                      className="mr-3"
                      required
                    />
                    <span>ফ্যামিলি প্যাক - ৩ পিস (১,২০০ টাকা)</span>
                  </label>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  যে ঠিকানায় ডেলিভারি করতে হবে সেটার বিস্তারিত ঠিকানা ও ফোন নাম্বারটি দিন *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="সম্পূর্ণ ঠিকানা ও ফোন নাম্বার লিখুন"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  আপনার হোয়াট্সঅ্যাপ নাম্বারটি দিন *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ইংরেজিতে লিখুন (যেমন: 01XXXXXXXXX)"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  মূল্য পরিশোধ করতে চাচ্ছেন যে মাধ্যমে - সেন্ডমানি করবেন *
                </label>
                <div className="space-y-2">
                  {[
                    'বিকাশ - 01779049560 - Name: Jahid Hasan Milu',
                    'নগদ - 01779049560',
                    'রকেট - 01779049560',
                    'ব্যাংক একাউন্ট - ব্যাংক একাউন্ট নাম্বার উপরের ডিটেইলসে দেওয়া আছে',
                    'ক্যাশ অন ডেলিভারি'
                  ].map((method, index) => (
                    <label key={index} className="flex items-start">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        onChange={handleChange}
                        className="mr-3 mt-1"
                        required
                      />
                      <span className="text-base">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  যে ফোন নাম্বার বা ব্যাংক একাউন্ট থেকে মূল্য পরিশোধ করেছেন সেটা লিখুন
                </label>
                <input
                  type="text"
                  name="paymentDetails"
                  value={formData.paymentDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="পেমেন্ট ডিটেইলস বা 'ক্যাশ অন ডেলিভারি' লিখুন"
                />
                <p className="text-base text-gray-500 mt-2">
                  কষ্ট করে পেমেন্টের একটা স্ক্রিনশট দিয়েন আমাদের এই 01933-554982 ওয়াটসঅ্যাপ নাম্বারে
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'অর্ডার জমা দেওয়া হচ্ছে...' : 'অর্ডার সাবমিট করুন'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default OrderForm