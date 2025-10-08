
const Features = () => {
  const features = [
    {
      title: "দৈনিক পরিকল্পনা",
      description: "প্রতিদিন কী কী কাজ করতে চান - সেটা লিখে রাখতে পারবেন।"
    },
    {
      title: "আমল ট্র্যাকিং",
      description: "নামাজ, কুরআন, সদকা, পরিবারকে সময়, অফিস - সবকিছু নিয়মিত টিক দিয়ে ট্র্যাক করতে পারবেন।"
    },
    {
      title: "স্কোরিং সিস্টেম",
      description: "দৈনিক ও সাপ্তাহিক স্কোরিং - প্রতিদিনের ও প্রতি সপ্তাহের উন্নতি ও অবনতি দেখতে পারবেন।"
    },
    {
      title: "আত্ম-মূল্যায়ন",
      description: "নিজের ভালো কাজ, ভুল, অনুশোচনা - ছোট ছোট নোট নিয়ে নিজেকে মূল্যায়ন করতে পারবেন।"
    },
    {
      title: "সাপ্তাহিক মুহাসাবা",
      description: "সপ্তাহ শেষে একটা ছোট মুহাসাবা করে বুঝতে পারবেন - আপনি ভাল করছেন কিনা।"
    },
    {
      title: "আরও অনেক ফিচার",
      description: "এছাড়াও আরও অনেক ফিচার, যেগুলো আপনাকে একজন ভালো ও প্রোডাক্টিভ মুসলিম বানাবে ইনশাআল্লাহ।"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            মুহাসাবা জার্নাল কী
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
            সহজ করে বললে এটি কিছুটা বইয়ের এবং কিছুটা ডায়েরি মতো, যেটিকে গাইডেড জার্নাল বলা হয়,
            যেটি একজন মুসলিমের দিন, আমল, অভ্যাস ও আত্মউন্নয়নকে সুন্দরভাবে গাইড এবং ট্র্যাক করতে সাহায্য করে।
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-2xl text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features