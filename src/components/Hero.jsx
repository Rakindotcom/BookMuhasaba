import React from 'react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold mb-8">
            মুহাসাবা জার্নাল
          </h1>
          <h2 className="text-4xl md:text-5xl font-semibold mb-10">
            দ্য মুসলিম হ্যাবিট ট্র্যাকার
          </h2>

          <div className="bg-yellow-400 text-black p-8 rounded-lg mb-10 shadow-lg">
            <h3 className="text-3xl font-bold mb-6">আপনার জন্য একটি বিশেষ হাদিয়া:</h3>
            <p className="text-2xl">
              এই মুহূর্তে অর্ডার করলে আমাদের ৪৭০ টাকা মূল্যের
              <span className="font-bold"> 'প্রোডাক্টিভ লাইফ উইথ সালাত' </span>
              কোর্সটি আপনাকে গিফট হিসেবে দেওয়া হবে ইনশাআল্লাহ।
            </p>
          </div>

          <div className="bg-red-900 text-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold mb-6">যে সুবিধা বাংলাদেশের আর কেউ দিচ্ছে না:</h3>
            <p className="text-2xl">
              মাসিক রিপোর্ট ও পারফর্মেন্স চেক সেশন - এটি সংগ্রহের মাধ্যমে আপনি আমাদের কমিউনিটির
              লাইফটাইম মেম্বার হয়ে যাবেন। প্রতিমাসে একটি ফ্রি লাইভ সেশনের মাধ্যমে আপনার মাসিক রিপোর্ট
              চেক করা হবে এবং পারফর্মেন্স উন্নতির জন্য প্রয়োজনীয় দিক-নির্দেশনা প্রদান করা হবে।
            </p>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a
              href="#order-form"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 px-12 rounded-lg text-2xl transition-colors shadow-lg transform hover:scale-105"
            >
              এখনই অর্ডার করুন
            </a>
            <a
              href="https://wa.me/8801933554982"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-6 px-12 rounded-lg text-2xl transition-colors transform"
            >
              না বুঝলে হোয়াটসঅ্যাপে নক দিন
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero