import React from 'react'

const Pricing = () => {
  return (
    <section className="py-15 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            মূল্য:
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Single Pack */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 p-10 rounded-lg shadow-lg border-2 border-green-200">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-6">সিঙ্গেল প্যাক</h3>
              <div className="text-6xl font-bold text-green-600 mb-4">৪২০ টাকা</div>
              <p className="text-xl text-gray-600 mb-6">+ ৭০ টাকা ডেলিভারি চার্জ</p>
              <div className="bg-white p-6 rounded-lg mb-8">
                <p className="text-2xl font-semibold text-gray-800">১টি প্ল্যানার</p>
              </div>
              <div className="text-2xl text-gray-600">
                <p>মোট: ৪৯০ টাকা</p>
              </div>
            </div>
          </div>

          {/* Family Pack */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-10 rounded-lg shadow-lg border-2 border-yellow-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-500 text-white px-6 py-3 rounded-full text-xl font-bold">
                সবচেয়ে জনপ্রিয়
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-6">ফ্যামিলি প্যাক</h3>
              <div className="text-6xl font-bold text-orange-600 mb-4">১,২০০ টাকা</div>
              <p className="text-2xl text-green-600 font-semibold mb-6">ডেলিভারি চার্জ ফ্রি!</p>
              <div className="bg-white p-6 rounded-lg mb-8">
                <p className="text-2xl font-semibold text-gray-800">৩টি প্ল্যানার</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-xl text-green-700 font-semibold">প্রায় ২৭০ টাকা সেইভ!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing