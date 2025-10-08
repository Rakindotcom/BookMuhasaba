# মুহাসাবা জার্নাল - দ্য মুসলিম হ্যাবিট ট্র্যাকার

একটি সুন্দর ও কার্যকর ল্যান্ডিং পেজ যা মুহাসাবা জার্নাল প্রোডাক্টের জন্য তৈরি করা হয়েছে।

## বৈশিষ্ট্যসমূহ

- আকর্ষণীয় হিরো সেকশন বিশেষ অফার সহ
- বিস্তারিত প্রোডাক্ট ফিচার তালিকা
- ইন্টারঅ্যাক্টিভ ইমেজ স্লাইডশো (১-৫ নম্বর ছবি)
- স্পষ্ট প্রাইসিং তথ্য
- সহজ অর্ডার ফর্ম
- ফ্লোটিং WhatsApp বাটন
- রেসপন্সিভ ডিজাইন
- বাংলা ফন্ট সাপোর্ট
- Firebase Firestore ডাটাবেস ইন্টিগ্রেশন
- রিয়েল-টাইম অর্ডার ট্র্যাকিং

## প্রযুক্তি

- React 19
- Vite
- Tailwind CSS
- Firebase/Firestore
- Anek Bangla Font

## ইনস্টলেশন

```bash
npm install
```

## ডেভেলপমেন্ট

```bash
npm run dev
```

## বিল্ড

```bash
npm run build
```

## প্রিভিউ

```bash
npm run preview
```

## কম্পোনেন্ট স্ট্রাকচার

```
src/
├── components/
│   ├── Hero.jsx          # হিরো সেকশন
│   ├── Features.jsx      # ফিচার তালিকা
│   ├── ImageSlideshow.jsx # প্রোডাক্ট ইমেজ স্লাইডশো
│   ├── About.jsx         # পণ্য সম্পর্কে
│   ├── Pricing.jsx       # মূল্য তালিকা
│   ├── OrderForm.jsx     # অর্ডার ফর্ম (Firestore ইন্টিগ্রেশন সহ)
│   ├── Contact.jsx       # যোগাযোগ তথ্য
│   └── FloatingWhatsApp.jsx # ফ্লোটিং WhatsApp বাটন
├── firebase/
│   └── config.js         # Firebase কনফিগারেশন
├── App.jsx               # মূল অ্যাপ কম্পোনেন্ট
├── main.jsx             # এন্ট্রি পয়েন্ট
└── index.css            # স্টাইল ফাইল
```

## Firebase সেটআপ

প্রোজেক্টটি Firebase Firestore ব্যবহার করে অর্ডার ডেটা সংরক্ষণ করে। অর্ডার ফর্ম জমা দেওয়ার পর ডেটা স্বয়ংক্রিয়ভাবে Firestore ডাটাবেসে সংরক্ষিত হয়।

অর্ডারগুলি দেখতে Firebase Console এ যান এবং Firestore Database এর 'orders' কালেকশন চেক করুন।