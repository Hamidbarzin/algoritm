import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "./ui/input";
import { ToggleTheme } from "./ui/toggle-theme";

export function Sidebar() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <aside className="w-64 text-white flex flex-col transition-all duration-300 ease-in-out shrink-0 h-screen overflow-y-auto md:translate-x-0 dark:bg-slate-900 bg-slate-800">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 ml-3 rounded-lg bg-gradient-to-r from-primary to-purple-600 shadow-lg">
            <span className="mdi mdi-bitcoin text-xl"></span>
          </div>
          <div>
            <h1 className="text-lg font-bold">تحلیل ارز دیجیتال</h1>
            <span className="text-sm opacity-70">نسخه 2.0</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider opacity-60 mb-2">بخش‌های اصلی</p>
        <nav>
          <Link href="/about">
            <div className={`flex items-center p-3 mb-1 rounded-lg transition cursor-pointer ${location === "/about" ? "bg-primary text-white" : "hover:bg-white/10"}`}>
              <span className="mdi mdi-information-outline ml-3 text-lg"></span>
              <span>درباره پروژه</span>
            </div>
          </Link>
          <Link href="/">
            <div 
              className={`flex items-center p-3 mb-1 rounded-lg transition cursor-pointer ${location === "/" ? "bg-primary text-white" : "hover:bg-white/10"}`}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const event = new CustomEvent('sectionChange', { detail: 'all' });
                  window.dispatchEvent(event);
                }
              }}
            >
              <span className="mdi mdi-folder-tree ml-3 text-lg"></span>
              <span>ساختار پروژه</span>
            </div>
          </Link>
          <div 
            className="flex items-center p-3 mb-1 rounded-lg hover:bg-white/10 transition cursor-pointer" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                const event = new CustomEvent('sectionChange', { detail: 'backend' });
                window.dispatchEvent(event);
              }
            }}
          >
            <span className="mdi mdi-server ml-3 text-lg text-blue-500"></span>
            <span>بک‌اند</span>
          </div>
          <div 
            className="flex items-center p-3 mb-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const event = new CustomEvent('sectionChange', { detail: 'frontend' });
                window.dispatchEvent(event);
              }
            }}
          >
            <span className="mdi mdi-monitor-dashboard ml-3 text-lg text-indigo-500"></span>
            <span>فرانت‌اند</span>
          </div>
          <div 
            className="flex items-center p-3 mb-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const event = new CustomEvent('sectionChange', { detail: 'ai' });
                window.dispatchEvent(event);
              }
            }}
          >
            <span className="mdi mdi-brain ml-3 text-lg text-emerald-500"></span>
            <span>هوش مصنوعی</span>
          </div>

        </nav>

        <p className="text-xs uppercase tracking-wider opacity-60 mt-6 mb-2">تنظیمات</p>
        <nav>
          <div className="flex items-center p-3 mb-1 rounded-lg hover:bg-white/10 transition cursor-pointer">
            <span className="mdi mdi-cog ml-3 text-lg"></span>
            <span>تنظیمات</span>
          </div>
          <div className="flex items-center p-3 mb-1 rounded-lg hover:bg-white/10 transition cursor-pointer">
            <span className="mdi mdi-help-circle ml-3 text-lg"></span>
            <span>راهنما</span>
          </div>
        </nav>
        
        <div className="mt-6">
          <div className="relative">
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <span className="mdi mdi-magnify"></span>
            </span>
            <Input 
              type="text" 
              placeholder="جستجو در ساختار..." 
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <ToggleTheme />
        </div>
      </div>
    </aside>
  );
}
