import React from 'react'

const Contact = () => {
  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            যোগাযোগ করুন
          </h2>
          <p className="text-lg text-gray-300">
            যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* WhatsApp Contact */}
          <div className="bg-green-600 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">WhatsApp</h3>
            <p className="text-lg mb-4">যেকোনো তথ্যের জন্য আমাদের ওয়াটসঅ্যাপে মেসেজ দিন:</p>
            <a 
              href="https://wa.me/8801933554982" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              +8801933554982
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">গুরুত্বপূর্ণ তথ্য:</h3>
              <ul className="text-left space-y-2 max-w-2xl mx-auto">
                <li>অর্ডার করার পর আমরা ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করব</li>
                <li>ঢাকার ভিতরে ১-২ দিন, ঢাকার বাইরে ২-৩ দিনে ডেলিভারি</li>
                <li>পেমেন্টের স্ক্রিনশট অবশ্যই WhatsApp এ পাঠান</li>
                <li>ক্যাশ অন ডেলিভারি সুবিধা উপলব্ধ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-600 text-center">
        <p className="text-gray-400">
          © 2025 মুহাসাবা জার্নাল - Divine Consultancy. সকল অধিকার সংরক্ষিত।
        </p>
      </div>
    </section>
  )
}

export default Contact