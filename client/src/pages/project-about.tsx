import React from 'react';

export default function ProjectAbout() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">درباره پروژه</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">معرفی پروژه</h2>
          <p className="text-gray-700 mb-4">
            این پروژه یک سیستم جامع مدیریت و تجارت ارزهای دیجیتال است که با بهره‌گیری از فناوری‌های 
            پیشرفته و هوش مصنوعی، تجربه خرید، فروش و تحلیل ارزهای دیجیتال را به سطح جدیدی می‌رساند.
          </p>
          <p className="text-gray-700">
            هدف اصلی این پروژه، ارائه یک پلتفرم کامل و یکپارچه برای معامله‌گران، سرمایه‌گذاران و تحلیلگران 
            بازار ارزهای دیجیتال است تا بتوانند با اطمینان و دقت بیشتری در این بازار فعالیت کنند.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">معماری پروژه</h2>
          <p className="text-gray-700 mb-4">
            این پروژه با معماری میکروسرویس طراحی شده است که شامل سه بخش اصلی می‌باشد:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-2">بک‌اند</h3>
              <p className="text-gray-700 text-sm">
                سرویس بک‌اند مسئول مدیریت داده‌ها، ارتباط با API‌های خارجی، احراز هویت کاربران و 
                پردازش معاملات است. این بخش با Node.js و Express پیاده‌سازی شده است.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <h3 className="font-semibold text-green-700 mb-2">فرانت‌اند</h3>
              <p className="text-gray-700 text-sm">
                سرویس فرانت‌اند رابط کاربری تعاملی و واکنش‌گرا را با استفاده از React و TypeScript 
                پیاده‌سازی می‌کند. این بخش شامل نمودارهای پیشرفته، داشبوردهای سفارشی و ابزارهای تحلیلی است.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <h3 className="font-semibold text-yellow-700 mb-2">هوش مصنوعی</h3>
              <p className="text-gray-700 text-sm">
                سرویس هوش مصنوعی با استفاده از الگوریتم‌های یادگیری ماشین و شبکه‌های عصبی، 
                الگوهای بازار را شناسایی می‌کند و پیش‌بینی‌های قیمت و تحلیل احساسات را ارائه می‌دهد.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">قابلیت‌های کلیدی</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>معاملات خودکار با استراتژی‌های قابل تنظیم</li>
            <li>تحلیل‌های فنی پیشرفته و نمودارهای تعاملی</li>
            <li>سیستم هشدار هوشمند برای فرصت‌های معاملاتی</li>
            <li>پیش‌بینی قیمت مبتنی بر هوش مصنوعی</li>
            <li>تحلیل احساسات بازار از منابع مختلف</li>
            <li>مدیریت پورتفولیو با داشبوردهای سفارشی</li>
            <li>ارائه خبرها و رویدادهای مهم با فیلترینگ هوشمند</li>
            <li>یکپارچه‌سازی با صرافی‌های بزرگ ارزهای دیجیتال</li>
          </ul>
        </section>
        
        <div className="border-t pt-6 mt-6 text-center text-gray-600">
          <p>این پروژه یک نمونه آموزشی برای نمایش ساختار و معماری یک برنامه پیشرفته است.</p>
        </div>
      </div>
    </div>
  );
}