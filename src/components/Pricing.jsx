import React from 'react'

const Pricing = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            মূল্য:
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Single Pack */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-lg shadow-lg border-2 border-green-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">সিঙ্গেল প্যাক</h3>
              <div className="text-4xl font-bold text-green-600 mb-2">৪২০ টাকা</div>
              <p className="text-gray-600 mb-4">+ ৭০ টাকা ডেলিভারি চার্জ</p>
              <div className="bg-white p-4 rounded-lg mb-6">
                <p className="text-lg font-semibold text-gray-800">১টি প্ল্যানার</p>
              </div>
              <div className="text-base text-gray-600">
                <p>মোট: ৪৯০ টাকা</p>
              </div>
            </div>
          </div>

          {/* Family Pack */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-lg shadow-lg border-2 border-yellow-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-base font-bold">
                সবচেয়ে জনপ্রিয়
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">ফ্যামিলি প্যাক</h3>
              <div className="text-4xl font-bold text-orange-600 mb-2">১,২০০ টাকা</div>
              <p className="text-green-600 font-semibold mb-4">ডেলিভারি চার্জ ফ্রি!</p>
              <div className="bg-white p-4 rounded-lg mb-6">
                <p className="text-lg font-semibold text-gray-800">৩টি প্ল্যানার</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-green-700 font-semibold">প্রায় ২০০ টাকা সেইভ!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            পেমেন্ট ডিটেইলস:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">Send Money:</h4>
              <div className="space-y-2">
                <p className="text-lg font-bold text-blue-600">01779049560</p>
                <p className="text-gray-600">(বিকাশ / নগদ / রকেট)</p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-green-800 mb-4">Bank Transfer:</h4>
              <div className="space-y-1 text-base">
                <p><span className="font-semibold">Bank:</span> Dutch-Bangla Bank</p>
                <p><span className="font-semibold">Account:</span> 3031100011876</p>
                <p><span className="font-semibold">Name:</span> Divine Consultancy</p>
                <p><span className="font-semibold">Branch:</span> Banasree</p>
                <p><span className="font-semibold">SWIFT:</span> DBBLBDDH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing