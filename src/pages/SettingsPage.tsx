import React from 'react';
import { Settings, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  fa: {
    title: 'تنظیمات',
    language: 'زبان',
    persian: 'فارسی',
    english: 'English',
    system: 'تنظیمات سیستم',
    theme: 'قالب',
    notifications: 'اعلان‌ها',
    save: 'ذخیره تغییرات'
  },
  en: {
    title: 'Settings',
    language: 'Language',
    persian: 'Persian',
    english: 'English',
    system: 'System Settings',
    theme: 'Theme',
    notifications: 'Notifications',
    save: 'Save Changes'
  }
};

export function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold">{t.title}</h1>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Language Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-medium">{t.language}</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setLanguage('fa')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-colors ${
                  language === 'fa'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <span className="text-lg">🇮🇷</span>
                <span>{t.persian}</span>
              </button>

              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-colors ${
                  language === 'en'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <span className="text-lg">🇬🇧</span>
                <span>{t.english}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}