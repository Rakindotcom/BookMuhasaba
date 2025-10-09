import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import Toast from './Toast'
import { useToast } from '../hooks/useToast'

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    package: 'single',
    paymentMethod: 'cod'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const packages = {
    single: { price: 420, name: 'সিঙ্গেল প্যাক - ১টি প্ল্যানার', quantity: 1, shipping: 70 },
    family: { price: 1200, name: 'ফ্যামিলি প্যাক - ৩টি প্ল্যানার', quantity: 3, shipping: 0 }
  }

  const selectedPackage = packages[formData.package]
  const subtotal = selectedPackage.price
  const shippingCost = selectedPackage.shipping
  const total = subtotal + shippingCost

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
        packageDetails: selectedPackage,
        subtotal,
        shippingCost,
        total,
        createdAt: serverTimestamp(),
        status: 'pending'
      })

      showToast('অর্ডার সফলভাবে জমা দেওয়া হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।', 'success')

      // Reset form
      setFormData({
        name: '',
        address: '',
        mobile: '',
        package: 'single',
        paymentMethod: 'cod'
      })
    } catch (error) {
      console.error('Error submitting order:', error)
      showToast('অর্ডার জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="order-form" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">
             অর্ডার করুন
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Product & Form */}
            <div className="space-y-8">
              {/* Product Section */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex-1">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                      মুহাসাবা জার্নাল - দ্য মুসলিম হ্যাবিট ট্র্যাকার
                    </h3>

                    {/* Package Selection */}
                    <div className="space-y-4">
                      <h4 className="text-2xl font-semibold text-gray-700">প্যাকেজ নির্বাচন করুন:</h4>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 cursor-pointer">
                          <input
                            type="radio"
                            name="package"
                            value="single"
                            checked={formData.package === 'single'}
                            onChange={handleChange}
                            className="mr-4 w-5 h-5"
                          />
                          <div className="flex-1">
                            <span className="text-xl font-medium">সিঙ্গেল প্যাক - ১টি প্ল্যানার</span>
                            <div className="text-2xl font-bold text-green-600">৳৪২০</div>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border-2 border-yellow-300 bg-yellow-50 rounded-lg hover:border-yellow-400 cursor-pointer">
                          <input
                            type="radio"
                            name="package"
                            value="family"
                            checked={formData.package === 'family'}
                            onChange={handleChange}
                            className="mr-4 w-5 h-5"
                          />
                          <div className="flex-1">
                            <span className="text-xl font-medium">ফ্যামিলি প্যাক - ৩টি প্ল্যানার</span>
                            <div className="text-2xl font-bold text-orange-600">৳১,২০০ - ডেলিভারি চার্জ ফ্রি!</div>
                            <div className="text-xl text-green-600 font-semibold">২৭০ টাকা সেইভ!</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      আপনার নাম লিখুন *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="আপনার নাম লিখুন"
                    />
                    {!formData.name && (
                      <p className="text-red-500 text-xl mt-1">আপনার নাম লিখুন is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      বিস্তারিত ঠিকানা দিন, যেখানে পণ্যটি রিসিভ করতে চান *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-5 py-4 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="বিস্তারিত ঠিকানা লিখুন"
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      আপনার মোবাইল নাম্বার লিখুন *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="মোবাইল নাম্বার লিখুন"
                    />
                  </div>

                  {/* Shipping */}
                  <div className="pt-4">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">Shipping</h4>
                    <div className="space-y-3">
                      {formData.package === 'single' && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-blue-700 font-semibold text-xl">
                            ডেলিভারি চার্জ: ৳৭০ (সারাদেশে)
                          </p>
                        </div>
                      )}
                      {formData.package === 'family' && (
                        <div className="p-4 bg-green-100 rounded-lg">
                          <p className="text-green-700 font-semibold text-xl">
                            ফ্যামিলি প্যাক - ডেলিভারি চার্জ ফ্রি!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
              <h3 className="text-4xl font-bold text-gray-800 mb-8">Your order</h3>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center pb-3 border-b-2">
                  <span className="font-medium text-xl">Product</span>
                  <span className="font-medium text-xl">Subtotal</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl">{selectedPackage.name}</span>
                    {formData.package === 'family' && (
                      <div className="text-xl text-green-600 font-semibold">ফ্যামিলি প্যাক অফার</div>
                    )}
                  </div>
                  <span className="text-xl">৳{subtotal.toLocaleString()}</span>
                </div>

                {shippingCost > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xl">ডেলিভারি চার্জ</span>
                    <span className="text-xl">৳{shippingCost}</span>
                  </div>
                )}

                {formData.package === 'family' && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-xl">ডেলিভারি চার্জ (ফ্রি)</span>
                    <span className="text-xl">৳0</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t-2">
                  <span className="font-medium text-xl">Subtotal</span>
                  <span className="text-xl">৳{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-3xl font-bold pt-3 border-t-2">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mr-4 w-5 h-5"
                  />
                  <span className="font-medium text-xl">সম্পূর্ণ ক্যাশ অন ডেলিভারি</span>
                </div>
                <p className="text-xl text-gray-600 ml-6">
                  শতভাগ নিশ্চিত হয়ে অর্ডার করুন প্লিজ। ফেইক অর্ডারে আমরা ক্ষতিগ্রস্ত হই।
                </p>
              </div>

  
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-5 px-10 rounded-lg font-semibold text-2xl hover:from-green-700 hover:to-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'অর্ডার জমা দেওয়া হচ্ছে...' : `অর্ডার করুন ৳${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={toast.duration}
      />
    </section>
  )
}

export default OrderForm