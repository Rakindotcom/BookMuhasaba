import React from 'react'

const Contact = () => {
  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            যোগাযোগ করুন
          </h2>
          <p className="text-2xl text-gray-300">
            যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* WhatsApp Contact */}
          <div className="bg-green-600 p-10 rounded-lg text-center">
            <h3 className="text-4xl font-bold mb-6">WhatsApp</h3>
            <p className="text-2xl mb-6">যেকোনো তথ্যের জন্য আমাদের ওয়াটসঅ্যাপে মেসেজ দিন</p>
            <a 
              href="https://wa.me/8801933554982" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-colors"
            >
              +8801933554982
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-gray-700 p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-6">গুরুত্বপূর্ণ তথ্য</h3>
              <ul className="text-left space-y-3 max-w-2xl mx-auto text-xl">
                মুহাসাবা জার্নালটি হাতে পেয়ে  হোয়াটসঅ্যাপ গ্রুপে জয়েন করে ফেলবেন। সেখানে বাকি সকল আপডেট পাবেন ইনশাআল্লাহ।
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-600 text-center">
        <p className="text-xl text-gray-400">
          © 2025 মুহাসাবা জার্নাল - Divine Consultancy. সকল অধিকার সংরক্ষিত।
        </p>
      </div>
    </section>
  )
}

export default Contact