import { Card } from "antd";
import React from "react";
import { useState } from "react";

export default function Terms() {
  const [lang, setLang] = useState("en");
  return (
    <Card style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          border: "1px solid #ddd",
          position: "absolute",
          right: 16,
          top: 16,
          cursor: "pointer",
        }}
      >
        <span
          style={{
            padding: "0.375rem",
            background: lang === "en" ? "rgb(255, 230, 230)" : "#FFF",
          }}
          onClick={() => setLang("en")}
        >
          English
        </span>
        <span
          style={{
            padding: "0.375rem",
            background: lang === "bn" ? "rgb(255, 230, 230)" : "#FFF",
          }}
          onClick={() => setLang("bn")}
        >
          Bangla
        </span>
      </div>
      {lang === "bn" && (
        <div>
          <h1>নিয়ম ও শর্তাবলীসমূহ</h1>
          <p className="mb1 primaryColor bold">Updated on 10 July, 2021</p>

          <h4>সূচনাঃ</h4>
          <p>
            Supplymartbd.com এ আপনাকে স্বাগতম। Supplymartbd.com একটি
            অনলাইন/ই-কমার্স ওয়েবসাইট যেখানে আমাদের নিয়ম ও শর্তসমূহ আজব শপে আপনার
            প্রবেশ এবং এর ওয়েবসাইট, অ্যাপ, সার্ভিস ইত্যাদির ব্যবহারকে দিক
            নির্দেশনা প্রদান করে। এই ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি আমাদের নিয়ম
            ও শর্তসমূহকে গ্রহন করেছেন এবং সে গুলো মেনে চলার সম্মতি প্রকাশ
            করেছেন। আপনি যদি কোনো কারণে আমাদের নিয়ম ও শর্তসমূহের সাথে রাজি না
            হোন, অনুগ্রহপূর্বক আমাদের ওয়েবসাইটে প্রবেশ, রেজিস্টার ও ব্যবহার করা
            থেকে বিরত থাকুন। এই ওয়েবসাইটটির মালিক ও পরিচালক Accept Global Co.,
            Limited (Registration/License Number: “C-161167”)
          </p>
          <p>
            Supplymartbd.com যেকোনো সময় পূর্ববর্তী নোটিশ ছাড়া নিয়ম ও শর্তসমূহের
            যেকোনো পরিবর্তন, সংশোধন, সংযুক্তি অথবা অপসারণ করার অধিকার সংরক্ষণ
            করে। পূর্ববর্তী নোটিশ ছাড়া পরিবর্তন করা নিয়ম ও শর্তসমূহ কাস্টমারদের
            জন্য ফলপ্রসু হবে। অনুগ্রহ করে সংশোধিত নিয়ম ও শর্তসমূহ পেতে নিয়মিত
            আমাদের নিয়ম ও শর্তসমূহ দেখুন। আপনার নিয়মিত ওয়েবসাইট ব্যবহার নির্দেশ
            করে আপনি সংশোধিত নিয়ম ও শর্তসমূহ মেনে আমাদের ওয়েবসাইট ব্যবহার করছেন।
          </p>
          <h4>পেমেন্ট পলিসিঃ</h4>
          <p>
            Supplymartbd একটি গ্লোবাল রিটেইল মার্কেটপ্লেস, যেখানে চায়না,
            আলিএক্সপ্রেস, পাকিস্তান এবং অ্যামাজন এর মতো গ্লোবাল মার্কেটপ্লেস এর
            পন্য গুলো ক্রয় করা যায়। । এখান থেকে গ্রাহক তার ইচ্ছামত যেকোনো পন্য
            যে কোনো দেশ থেকে ক্রয় করতে পারে। এক্ষেত্রে আমরা গ্রাহকের প্রদানকৃত
            টাকা গ্লোবাল সাপ্লায়ার/সেলার/প্রস্তুতকারক এর কাছে সর্বোচ্চ
            নিরাপত্তা সহকারে পৌঁছে দিয়ে থাকি। আমরা গ্রাহকের প্রদানকৃত বাংলা
            টাকা এল. সি. –এর মাধ্যমে গ্লোবাল কারেন্সিতে রূপান্তর করে ২৪-৪৮ ঘণ্টা
            কার্যদিবসের মধ্যে গ্লোবাল সেলারের পেমেন্ট সম্পন্ন করে থাকি যার
            মাধ্যমে আমাদের সার্ভিস সম্পন্ন হয়ে যায় (একটি মার্কেটপ্লেস অথবা
            মিডিয়া হিসাবে)। সুতরাং, বাংলাদেশ ব্যাংক ও বাণিজ্য মন্ত্রণালয়
            কর্তৃক ডিজিটাল কমার্স পরিচালনা নির্দেশিকা অনুসারে এডভান্স পেমেন্ট
            গ্রহণ এবং পন্য ডেলিভারি অথবা সার্ভিস সম্পূর্ণ নিয়ে যে নীতিমালা
            অর্পন করা হয়েছে সেই নিয়মনীতি গুলোর প্রতি আনুগত্য স্বীকার করেই আমরা
            আমাদের সার্ভিস পরিচালনা করছি। গ্রাহক তার গ্লোবাল সেলার থেকে ক্রয়কৃত
            পন্য তার ইচ্ছা অনুযায়ী ( FEDEX,DHL, অন্যান্য যেকোন মাধ্যমে)
            শিপমেন্ট করতে পারে। তবে গ্রাহকের সুবিধার্থে আমরা আমাদের নিজস্ব
            গ্লোবাল শিপমেন্ট সার্ভিস এর মাধ্যমেও পন্য আনয়নের সুবিধা দিয়ে থাকি।
            আমরা সাপ্লায়ার এর কাছে অর্ডারকৃত পন্যগুলো আমাদের গ্লোবাল
            ওয়্যারহাউজে গ্রহন করে তা বাংলাদেশে আমাদের নিজস্ব গ্লোবাল লজিস্টিক
            সার্ভিস – শিপবাজ এর মাধ্যমে নিয়ে আসি। এক্ষেত্রে বাংলাদেশ কাস্টমস এর
            ভ্যাট ট্যাক্স এবং অন্যান্য চার্জ আমরা কাস্টমারদের থেকে অগ্রিম গ্রহণ
            না করে নিজেরাই পেমেণ্ট করে থাকি এবং ক্যাশ-অন-ডেলিভারিতে গ্রাহকের
            দোরগোড়ায় পন্য পৌঁছে দেয়া হয়।
          </p>
          <h4>ডেলিভারী সংক্রান্ত শর্তাবলীসমূহঃ</h4>
          <p>
            আমরা কিছু পণ্য আবদ্ধ বক্সে ডেলিভারী করে থাকি। প্রতিটি পণ্য পাঠানোর
            আগে আমরা সতর্কতার সাথে চেক করে পাঠিয়ে থাকি তাই পণ্য ডেলিভারি সম্পন্ন
            হওয়ার আগে কাস্টমাররা আমাদের পাঠানো পণ্য ট্রায়াল দিতে পারে না কিংবা
            বক্স খুলতে পারে না। তবে অনাকাঙ্খিত ভাবে কোনো কাস্টমার যদি ভুল পণ্য
            পায় সেই ক্ষেত্রে কাস্টমার ঐ পণ্যটির জন্যে এক্সচেঞ্জ, রিফান্ড কিংবা
            রিটার্ন দাবি করতে পারবে এবং সেই পণ্যটি আমরা এক্সচেঞ্জ, রিফান্ড কিংবা
            রিটার্ন করতে বাধ্য থাকবো।
          </p>
          <h3>শিপিংঃ</h3>
          <p>
            শিপিং চার্জ পরিবর্তিত হতে পারে। আন্তর্জাতিক শিপিংয়ের (চায়না থেকে
            বাংলাদেশ) ক্ষেত্রে পণ্যের ওজনের ওপর ভিত্তি করে আমরা শিপিং চার্জ নিয়ে
            থাকি এবং ৫০০০ টাকা মূল্যের ওপরের পণ্যের ক্ষেত্রে লোকাল ডেলিভারী
            চার্জ ফ্রি। অনান্য শিপিং কোম্পানির (DHL/FEDEX) তুলনায় আমাদের শিপিং
            চার্জ অনেক কম। আপনি চাইলে তাদের কাস্টমার সাপোর্টে কল দিয়ে যাচাই করতে
            পারেন।
            <ol>
              <li>
                ৫০০০ টাকার ওপরের অর্ডারের ক্ষেত্রে পণ্যের লোকাল ডেলিভারী চার্জ
                ফ্রি
              </li>
              <li>
                ৫ কেজি ওজনের ওপরের পণ্যের ক্ষেত্রে ফ্রি শিপিং প্রযোজ্য নয় (যেমনঃ
                মেশিন, চেয়ার ইত্যাদি){" "}
              </li>
              <li>
                ভারি পণ্যের ক্ষেত্রে শিপিং চার্জ পণ্যের ওজন অনুসারে হিসেব করা
                হবে
              </li>
            </ol>
          </p>
          <h4>শিপিং টাইমঃ </h4>
          <p>
            শিপিং টাইম কার্য দিবসের ওপর গণনা করা হয়। সরকারী ছুটি এর আওতার বাইরে।
            অনাকাঙ্খিত কারণে আপনার পণ্যটি আমাদের ওয়্যারহাউজ থেকে হারিয়ে গেলে
            অথবা উল্লেখিত তারিখের মধ্যে আপনার পণ্য ডেলিভারী করতে না পারলে আমরা
            আরও কয়েক দিন সময় নিয়ে খুঁজে দেখবো। তারপরও যদি আপনার পণ্যটি খুঁজে না
            পাওয়া যায় সেই ক্ষেত্রে আমরা অর্ডার ডেট থেকে ৩৫-৪০ দিনের মধ্যে আপনাকে
            রিফান্ড করে দিবো।
          </p>
          <h3 className="mb1 bold mt2">ব্যবহারের শর্তাবলীঃ </h3>
          <h4>আপনার একাউন্টঃ </h4>
          <p>
            আমাদের ওয়েবসাইটের কিছু সার্ভিস ব্যবহারের জন্যে আপনাকে একটি একাউন্ট
            খুলতে হবে অথবা আপনার ব্যক্তিগত কিছু তথ্য দিয়ে একাউন্টটি সম্পূর্ণ
            করতে হবে। আমরা যেকোনো সময় চাইলে পূর্ববর্তী নোটিশ ছাড়া আপনার ইউজার
            নেইম কিংবা পাসওয়ার্ড বাতিল করার অধিকার সংরক্ষণ করি এবং এই বাতিলের
            ফলে আপনার কোনো ক্ষতি হলে বা আপনি ভুক্তভুগী হলে তার দায়ভার আমাদের না।
            আপনার ব্যক্তিগত তথ্য, একাউন্টের তথ্য, পাসওয়ার্ড ইত্যাদির গোপনীয়তা
            রক্ষা আপানার দায়িত্ব। কোনো কারণে যদি আপনার মনে হয় আপনার পাসওয়ার্ড
            কারও জানা কিংবা কেউ অসাধু উপায়ে আপনার পাসওয়ার্ড ব্যবহার করতে চাচ্ছে
            সেই ক্ষেত্রে দ্রুত আমাদেরকে অবগত করুন। আপনার ব্যক্তিগত তথ্যে
            শুধুমাত্র আপনার কিংবা আপনার মনোনীত ব্যক্তি যাকে আপনি লগিন সংক্রান্ত
            তথ্য প্রদান করবেন তার প্রবেশ করার অধিকার রয়েছে।
            <br />
            অনুগ্রহপূর্বক, আপনার দেয়া সকল তথ্য সঠিক তা আমাদেরকে নিশ্চিত করুন।
            আপনাকে আপনার একাউন্টের যাবতীয় তথ্য একাউন্টে প্রদান করতে হবে। আপনার
            একাউন্টে কোনো তথ্য এডিট করতে হলে আপনি আপনার একাউন্ট থেকে তা করতে
            পারবেন না। আপনাকে এডিট করতে হলে আমাদের কাস্টমার সার্ভিস সেন্ট্রারে
            যোগাযোগ করে তা পরিবর্তন করতে হবে। আমরা পূর্ববর্তী নোটিশ ছাড়া আমাদের
            ওয়েবসাইটে আপনার প্রবেশ বাতিল করা, আপনার একাউন্ট বাতিল করা, কোনো বিষয়
            পরিবর্তন কিংবা সংশোধন করার অধিকার রাখি। আপনি নিয়মিত আপনার একাউন্টের
            সুরক্ষার জন্যে পাসওয়ার্ড পরিবর্তন করবেন, আপনার একাউন্টের গোপনীয়তা
            রক্ষা কিংবা আপনার ব্যক্তিগত তথ্য ফাঁস হওয়ার জন্যে দায়ী থাকবেন।
          </p>
          <h4>গোপনীয়তাঃ </h4>
          <p>
            অনুগ্রহপূর্বক আমাদের গোপনীয়তা নীতিমালাটি দেখুন। আপনার ব্যক্তিগত তথ্য
            আমাদের ওয়েবসাইট অত্যন্ত সতর্কতা ও গোপনীয়তার সাথে গোপনীয়তা নীতিমালা
            অনুযায়ী ব্যবহার করে। আপনি যদি কোনো কারণে আমাদের গোপনীয়তা নীতিমালাটি
            অকার্যকর মনে হয় সেই ক্ষেত্রে অনুগ্রহ করে আমাদের ওয়েবসাইট ব্যবহার
            থেকে বিরত থাকুন।
          </p>
          <h4>যোগাযোগের প্ল্যাটফর্মঃ</h4>
          <p>
            আপনি সম্মতি প্রকাশ করছেন যে আমাদের ওয়েবসাইটটি একটি অনলাইন
            প্ল্যাটফর্ম যা আপনাকে যেকোনো সময়, যেকোনো জায়গা থেকে আপনার পছন্দের
            একটি পেমেন্ট মেথড ব্যবহার করে পণ্য অর্ডার করার সু্যোগ প্রদান করছে।
            আপনি আরও অবগত এবং সম্মতি প্রকাশ করছেন যে আমরা কেবলমাত্র একটি মাধ্যম
            যাদের ওয়েবসাইটের কোনো লেনদেন কিংবা তৃতীয় পক্ষের কোনো পেমেন্ট মেথড
            নিয়ন্ত্রণ করার কোনো ক্ষমতা নেই। আমাদের ওয়েবসাইট থেকে আপনার ও সেলারের
            মধ্যে পণ্য ক্রয় সংক্রান্ত যেকোনো চুক্তিই একটি দ্বিপাক্ষিক চুক্তি।
            ঠিক একই ভাবে, অনলাইন লেনদেনের ক্ষেত্রে আপনার এবং আমাদের ওয়েবসাইটে
            থাকা সার্ভিস প্রদানকারীর মধ্যে লেনদেন সংঙ্ক্রান্ত চুক্তিটিও একটি
            দ্বিপাক্ষিক চুক্তি।
          </p>
          <h4>ওয়েবসাইটের সচলতাঃ</h4>
          <p>
            আমরা আমাদের দিক থেকে ওয়েবসাইটটিকে সবসময় সচল, নিরবিচ্ছিন্ন এবং
            ত্রুটিমুক্ত রাখতে সর্বোচ্চ চেষ্টা করবো। তারপরেও, ইন্টারনেটের গতি এবং
            সাইটের গতিবিধির কারণে সবসময় সাইটটি সচল নাও থাকতে পারে। তাছাড়া,
            পূর্ববর্তী নোটিশ ছাড়া সাইটটি সংস্করণ, মেরামত, রক্ষণাবেক্ষণ অথবা নতুন
            সার্ভিস সংযুক্ত করার কারণে কিছু সময়ের জন্যে সাইটটিতে আপনার
            প্রবেশাধিকার নিষিদ্ধ করা হতে পারে। এ ধরণের জটিলতা যাতে কম হয় সেই
            লক্ষ্যে আমরা সকল প্রয়োজনীয় পদক্ষেপ গ্রহণ করবো।
          </p>
          <h4>ওয়েবসাইট ব্যবহারের অনুমতিপত্রঃ</h4>
          <p>
            এই ওয়েবসাইটটে প্রবেশের মাধ্যমে আপনি সম্মতি প্রকাশ করছেন যে আপনার বয়স
            ১৮ বছর কিংবা তার বেশি অথবা আপনি আপনার পিতা-মাতার সহযোগিতা এবং
            সম্মতিক্রমে সাইটটি ব্যবহার করছেন। আমরা আপনাকে আমাদের ওয়েবসাইট থেকে
            নিজস্ব প্রয়োজনে ব্যবহারের জন্যে পণ্য ও সেবা কেনার জন্যে আমাদের নিয়ম
            ও শর্তাবলির সাথে মিল রেখে অনুমতিপত্র প্রদান করছি। আপনি যদি কোনো
            ব্যবসায়িক প্রতিষ্ঠানের হয়ে আমাদের সাইটে রেজিস্ট্রেশন করে থাকেন সেই
            ক্ষেত্রে আপনি ঐ প্রতিষ্ঠানের হয়ে আমাদের ব্যবহারকারী নীতিমালা এবং
            অনলাইন বাণিজ্য সংক্রান্ত সকল আইন মানার প্রতিশ্রুতি প্রদান করছেন।
            কোনো ব্যক্তি বা প্রতিষ্ঠান একবারের বেশী আমাদের সাইটে সদস্য হিসেবে
            নিবন্ধন করতে পারবে না।
            <br />
            আমাদের সাইটে প্রকাশিত সমস্ত কিছু শুধু তথ্য প্রদানের উদ্দেশ্যে প্রকাশ
            করা হয়েছে। পণ্য সংক্রান্ত যাবতীয় তথ্য (পণ্যের মূল্য, রং, পরিমাণ এবং
            ফিচারস ইত্যাদি) বিক্রেতা/ভেন্ডর প্রদান করেছে এবং এই ক্ষেত্রে আমরা
            পণ্যের গুণগত সম্পর্কে কোনো আশ্বাস প্রদান করছি না। আমরা আপনাকে আমাদের
            ওয়েবসাইট ব্যবহার করার জন্যে সীমাহীন অনুমতি প্রদান করছি তবে এই
            অনুমতির মাধ্যমে আমাদের সাইটটি ডাওনলোড কিংবা সাইটটির কোনো অংশ মডিফাই
            করা যাবে না। এই অনুমতি সাইটটি বিক্রয়, এর কোনো তথ্য বিক্রয় অথবা
            ব্যবহার কিংবা সাইটটির কোনো তথ্য কপি করার জন্যে প্রযোজ্য হবে না।
            অনুমতি ছাড়া বাণিজ্যিক উদ্দেশ্যে সাইটটি কিংবা সাইটটির কপিরাইট করা
            বিষয়বস্তু সমূহ, ট্রেডমার্ক ইত্যাদি পুনরায় তৈরি, কপি করা, বিক্রি করা
            কিংবা বণ্টন করা সম্পূর্ণ নিষিদ্ধ।
            <br />
            আপনি সম্মতি প্রকাশ করছেন যে কোনো ধরণের নিষিদ্ধ কার্যক্রম থেকে নিজেকে
            বিরত রাখবেন। নিম্নলিখিত কার্যক্রমগুলো থেকে কোনো কার্যক্রমের সাথে
            আপনার সংশ্লিষ্টতা পাওয়া গেলে তৎক্ষণাত আপনার একাউন্ট, অর্ডার, সেবা সহ
            আমাদের সাথে চলমান অসম্পূর্ণ লেনদেন সমূহ বাতিল করা হবে এবং প্রয়োজনে
            আইনগত ব্যবস্থা গ্রহণ করা হবে।
          </p>
          <ol>
            <li>
              আমাদের সাইটে বর্ণিত নিয়ম ও শর্তাবলি অমান্য করলে কিংবা সাইটটি
              ব্যবহারের জন্য অন্য যেকোনো নীতিমালা অমান্য করলে।
            </li>
            <li>
              কোনো ব্যক্তি বা প্রতিষ্ঠানের সাথে আপনার দাবীকৃত সম্পর্ক ভুয়া হলে।{" "}
            </li>
            <li>অবৈধ উদ্দেশ্যে সাইটটি ব্যবহার করলে।</li>
            <li>
              ওয়েবসাইটটির সাথে সম্পৃক্ত সিস্টেম বা নেটওয়ার্কে অবৈধভাবে অনুপ্রবেশ
              করার চেষ্টা করলে।
            </li>
            <li>
              সাইটটির মাধ্যমে বাংলাদেশ সরকার কর্তৃক নিষিদ্ধ বস্তু প্রচারনা কিংবা
              পাচার করার চেষ্টা চালালে।
            </li>
            <li>
              ভাইরাস সম্বলিত কোনো সফটওয়্যার যার ফলে সাইটটি কিংবা সাইটটির তথ্য
              ক্ষতিগ্রস্থ হতে পারে তা ব্যবহার করলে বা সাইটে আপ্লোড করলে।
            </li>
          </ol>
          <h4>ট্রেডমার্ক ও কপিরাইটঃ </h4>
          <p>
            রেজিস্ট্রার করা কিংবা রেজিস্ট্রার করা ছাড়া সকল সম্পত্তি, তথ্য,
            সাইটের ডিজাইন, সোর্স কোড এবং সফটওয়্যার আমাদের নিজস্ব সম্পদ। আমাদের
            সাইটের যাবতীয় তথ্য বাংলাদেশ কপিরাইট আইন ও আন্তর্জাতিক আইন মেনে
            কপিরাইট করা আছে এবং এর সমস্ত দাবিদার আমরা।
          </p>
          <h4>ডিসক্লেইমারঃ </h4>
          <p>
            আপনি সম্মতি প্রকাশ করছেন যে আপনি স্বজ্ঞানে আমাদের সাইটে প্রবেশ করে
            সেবা নেয়ার লক্ষ্যে নিজ উদ্যোগে লেনদেন করছেন। আমরা সেলারের কোনো
            কার্যক্রমের দায় ভার গ্রহণ করবো না এবং সেলারের এবং আপনার মধ্যে কোনো
            জামেলা সমাধান করবো না।
          </p>
          <h4>ক্ষতিঃ</h4>
          <p>
            সাইটটি ব্যবহার করে আপনার ব্যক্তিগত কিংবা ব্যবসায়িক কোনো ক্ষতি হলে
            তার দায়ভার আমরা গ্রহণ করবো না।
          </p>
          <h3>রাষ্ট্রীয় আইন ও এখতিয়ারঃ</h3>
          <p>
            এই নিয়ম ও শর্তাবলিসমূহ বাংলাদেশ সরকারের আইন ও এখতিয়ারের সাথে মিল
            রেখে প্রস্তুত করা হয়েছে।
          </p>
          <h4>প্রাইজিং, এভেইলএবেলিটি ও অর্ডার প্রসেসিংঃ </h4>
          <p>
            আমাদের সাইটে সমস্ত মূল্য বাংলাদেশী টাকায় দেয়া আছে। আপনার শপিংকার্টে
            সবসময় সকল পণ্যের আপডেটেড প্রাইজ দেখানো হয়। এই প্রাইজটি আপনি যখন
            সর্বপ্রথম আপনার কার্টে পণ্য যোগ করেন তখন দেখানো প্রাইজ থেকে ভিন্ন
            হতে পারে। কার্টে কোনো পণ্য যোগ করার মানে এই না যে ঐ পণ্যের প্রাইজ
            রিসার্ভ হয়ে থাকে। এমনকি একটি পণ্যের মূল্য আপনি যখন কার্টে এড
            করেছিলেন তখন যা ছিল পণ্য কেনার সময় তা নাও থাকতে পারে। পণ্যটির মূল্য
            কম বা বেশি হতে পারে। আমরা আমাদের ওয়েবসাইটে পণ্যের এভেইলএবেলিটি
            সম্পর্কে তথ্য প্রদান করে থাকি। এই তথ্যের বাইরে আমরা পণ্যের
            এভেইলএবেলিটির ব্যাপারে আর সুনির্দিষ্ট কোনো তথ্য প্রদান করতে পারি না।
            কিছু কিছু ক্ষেত্রে বিভিন্ন কারণে একটি অর্ডার প্রসেস করা সম্ভব হয় না।
            এই ক্ষেত্রে আমরা যেকোনো অর্ডার যেকোনো কারণে যেকোনো সময় বাতিল করার
            ক্ষমতা রাখিযোগ যেকোনো ধরণের জালিয়াতি প্রতিরোধে, আমরা আপনার পণ্য
            দেয়ার আগে আপনার পেমেন্ট ডিটেইলস ও আমাদেরকে দেয়া আপনার ব্যক্তিগত
            তথ্যের বৈধতা যাচাই করার অধিকার রাখি। এই বৈধতা যাচাই প্রক্রিয়ায় আপনার
            ঠিকানা কিংবা ব্যাংকের তথ্য যাচাই করা হতে পারে। যাচাই সংক্রান্ত
            যেকোনো তথ্য একটি নির্দিষ্ট সময়ের মধ্যে প্রদান না করতে পারলে আপনার
            অর্ডারটি বাতিল বলে গণ্য হবে। আমরা প্রতারণাপূর্ণ কিংবা প্রতারিত হবার
            সুযোগ আছে এমন যেকোনো অর্ডার যেকোনো সময় সরাসরি বাতিল করার অধিকার
            রাখি।
          </p>
          <p>
            Supplymartbd- এ অর্ডারকৃত পন্য ডেলিভারির পর কোম্পানির/ব্যক্তির
            নিয়ন্ত্রণের বহির্ভুত কোন কারণে কিংবা আর্ডারকৃত পণ্য অনুরূপ নাহলে,
            পণ্য হাতে পাওয়ার ২৪ ঘন্টার মধ্যে গ্রাহককে ফোন, এসএমএস, ই-মেইল বা
            অন্যান্য মাধ্যমে জানানো হয়। এক্ষেত্রে পরবর্তী ৭২ ঘন্টার মধ্যে
            Supplymartbd তার গ্রাহককে সম্পূর্ণ অর্থ ফেরত প্রদান করে থাকে। তাছাড়া
            ফেরতকৃত অর্থ দিয়ে প্রত্যক্ষ বা পরোক্ষভাবে কোন পণ্য ক্রয় করার জন্য
            Supplymartbd কখনো তার গ্রাহককে বাধ্য করে না।
          </p>
          <h4>ওয়ারেন্টিঃ</h4>
          <p>
            আমরা আমাদের সাইটে সেলারদের বিক্রি করা পণ্যের ওপর কোনো ধরণের
            ওয়ারেন্টি প্রদান করি না। এমনকি আমাদের সাইটে থাকা হাজার হাজার সেলার
            থেকে পণ্য কেনার সময়ও আমরা কাউকে প্রভাবিত করি না। আমরা সেলারদের কোনো
            ভুল বা ত্রুটির দায়ভার গ্রহন করি না। আমাদের সাইটে দেয়া মূল্য কারিগরি
            ত্রুটির কারণে কিংবা টাইপিং মিসটেকের কারণে ভুল দেখাতে পারে সেই
            ক্ষেত্রে পূর্ববর্তী কোনো নোটিশ ছাড়াই সেলার কিংবা সাইট অর্ডারটি বাতিল
            করতে পারে। এই ক্ষেত্রে যদি অগ্রিম মূল্য প্রদান করা থাকে তাহলে আমাদের
            রিফান্ড পলিসি অনুযায়ী নির্দিষ্ট সময়ের মধ্যে রিফান্ড করে দেয়া হবে।
          </p>
        </div>
      )}
      {lang === "en" && (
        <div>
          <h1>Terms and Conditions</h1>
          <p className="mb1 primaryColor bold">Updated on 25 November, 2021</p>

          <h4> Introduction:</h4>
          <p>
            Welcome to Supplymartbd.com. Supplymartbd.com is an online /
            e-commerce website where our terms and conditions guide your access
            to Supplymartbd and your use of its website, apps, services, etc. By
            using this website, you accept our terms and conditions and agree to
            abide by them. If for any reason you do not agree to our Terms and
            Conditions, please refrain from accessing, registering and using our
            Website. This website is owned and operated by Accept Global Co.,
            Limited (Registration / License Number: “C-161167”).
          </p>
          <p>
            Supplymartbd.com reserves the right to change, amend, attach or
            remove any of the Terms and Conditions at any time without prior
            notice. Terms and conditions changed without prior notice will be
            effective for customers. Please see our Terms and Conditions
            regularly to get the revised Terms and Conditions. Your regular use
            of the Website indicates that you are using our website in
            accordance with the revised Terms and Conditions.
          </p>
          <h4>Payment policy:</h4>
          <p>
            Supplymartbd is a global retail marketplace, where products from
            global marketplaces such as China, AliExpress, Pakistan and Amazon
            can be purchased. From here the customer can purchase any product of
            his choice from any country. In this case, we deliver the money paid
            by the customer to the global supplier / seller / manufacturer with
            maximum security. We have provided Bangla Taka to the customer. C.
            By converting to Global Currency, we complete the global
            seller&apos;s payment within 24-48 working days through which our
            service is completed (as a marketplace or media). Therefore, we are
            operating our services in compliance with the guidelines laid down
            by the Bangladesh Bank and the Ministry of Commerce for the
            acceptance of advance payments and complete delivery of goods or
            services in accordance with the Digital Commerce Management
            Guidelines. Customer purchases products from his global seller
            according to his wishes according to (FEDEX, DHL, any other means)
            can ship. However, for the convenience of the customer, we also have
            the facility to bring the product through our own global shipment
            service. We receive the products ordered from the supplier in our
            Global Warehouse and bring them to Bangladesh through our own Global
            Logistics Service - Shipbuilder. In this case we pay the VAT tax and
            other charges of Bangladesh Customs without taking any advance from
            the customers and the goods are delivered to the customer&apos;s
            doorstep in cash-on-delivery.
          </p>

          <h4>Delivery Terms:</h4>
          <p>
            We deliver some products in closed box. We carefully check and ship
            before each product is shipped, so customers may not trial or open
            the box before the product is completed. However, if a customer
            unexpectedly finds the wrong product, the customer will be able to
            claim exchange, refund or return for that product and we will be
            obliged to exchange, refund or return that product.
          </p>
          <h4>Shipping:</h4>
          <p>
            Shipping charges may vary. In case of international shipping (from
            China to Bangladesh) we carry shipping charges based on the weight
            of the product and in case of goods above Rs. 5000 per order, local
            delivery is free. Our shipping charges are much lower than other
            shipping companies (DHL / FEDEX). You can verify by calling their
            customer support if you want. Local delivery of product free of
            charge for orders above Rs. 5,000 per order. Local delivery charge
            free shipping is not applicable for products weighing more than 5 kg
            (eg machine, chair etc.).
            <br />
            In case of heavy goods, the shipping charge will be calculated
            according to the weight of the product.
          </p>
          <h4>Shipping time:</h4>
          <p>
            Shipping time is calculated on working days. Out of the scope of
            public holidays. If your product is lost from our warehouse due to
            unforeseen reasons or we are unable to deliver your product within
            the specified date, we will take a few more days to find out.
            However, if your product is not found, we will refund you within
            35-40 days from the order date.
          </p>
          <h4>Terms of use:</h4>
          <p>
            Your account: To use some of the services on our website you need to
            open an account or complete the account with some of your personal
            information. We reserve the right to cancel your username or
            password at any time without prior notice, and we are not
            responsible for any harm or loss you may suffer as a result of this
            cancellation. It is your responsibility to protect the privacy of
            your personal information, account information, passwords, etc. If
            for any reason you think someone knows your password or someone
            wants to use your password in a dishonest way, let us know quickly.
            Only you or your nominee to whom you provide login information has
            access to your personal information. Please ensure that all
            information you provide is accurate. You will need to provide all
            the information in your account. If you want to edit any information
            in your account, you cannot do so from your account. If you want to
            edit, you need to change it by contacting our customer service
            center. We reserve the right to revoke your access to our website,
            revoke your account, change or modify any subject without prior
            notice. You will regularly change the password to protect your
            account, protect your account privacy or be responsible for leaking
            your personal information.
          </p>
          <h4>Privacy:</h4>
          <p>
            Please see our Privacy Policy. Your website uses your personal
            information in accordance with the Privacy Policy with utmost care
            and privacy. Please refrain from using our website if you find our
            privacy policy to be invalid for any reason. Please refrain from
            using our website if you find our privacy policy to be invalid for
            any reason.
          </p>
          <h4>Communication Platform:</h4>
          <p>
            You agree that our website is an online platform that allows you to
            order products anytime, from anywhere, using a payment method of
            your choice. You are further informed and agree that we are only a
            medium whose website does not have the power to control any
            transaction or any third party payment method. Any agreement between
            you and the seller regarding the purchase of goods from our website
            is a bilateral agreement. In the same way, the transaction agreement
            between you and the service provider on our website is a bilateral
            agreement when it comes to online transactions.
          </p>
          <h4>Website Mobility:</h4>
          <p>
            We will do our best to keep the website active, uninterrupted and
            error free. Even then, the site may not always be up and running due
            to the speed of the internet and the movement of the site. In
            addition, your access to the Site may be temporarily denied due to
            versioning, repairing, maintaining or adding new services to the
            Site without prior notice. We will take all necessary steps to
            reduce such complications.
          </p>
          <h4>Website Use Permit:</h4>
          <p>
            By accessing this website, you agree that you are 18 years of age or
            older or that you are using the site with the cooperation and
            consent of your parents. We are licensing you to purchase products
            and services for our own use from our website in accordance with our
            terms and conditions. If you have registered on our site on behalf
            of a business organization, you are undertaking to abide by our user
            policies and all laws relating to online commerce on behalf of that
            organization. No person or organization can register as a member of
            our site more than once.
          </p>
        </div>
      )}
    </Card>
  );
}
