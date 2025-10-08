import React from 'react'

const About = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            কাদের জন্য এটা:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">উন্নতি চাওয়া ব্যক্তিদের জন্য</h3>
              <p className="text-gray-600">
                যারা নিজদের উন্নতির ব্যাপারে সিরিয়াস, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না।
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">জার্নালিং শুরু করতে চাওয়াদের জন্য</h3>
              <p className="text-gray-600">
                যাদের রেগুলার জার্নালিং রুটিন নেই, কিন্তু মাইন্ডফুলনেস ও মুহাসাবা প্র্যাকটিস করতে চান।
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              ট্র্যাকারটি তৈরি করেছেন:
            </h3>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-green-600 mb-2">
                হাফেজ মাওলানা জাহিদ হাসান মিলু
              </h4>
              <p className="text-gray-600 mb-2">
                স্নাতক, গণযোগাযোগ ও সাংবাদিকতা বিভাগ, ঢাকা বিশ্ববিদ্যালয়
              </p>
              <p className="text-gray-600">
                প্রোফেটিক প্রোডাক্টিভিটি কোচ, ডিভাইন কনসালটেন্সি
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About