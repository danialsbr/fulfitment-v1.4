import React, { useState } from 'react';
import { Package, User, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const defaultCredentials = {
  username: 'admin',
  password: 'admin123'
};

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (username === defaultCredentials.username && password === defaultCredentials.password) {
        await login(username, password);
      } else {
        throw new Error(language === 'fa' ? 'نام کاربری یا رمز عبور اشتباه است' : 'Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const t = language === 'fa' ? {
    title: 'سیستم تکمیل سفارشات',
    username: 'نام کاربری',
    password: 'رمز عبور',
    login: 'ورود',
    welcome: 'خوش آمدید',
    defaultCredentials: 'نام کاربری: admin، رمز عبور: admin123'
  } : {
    title: 'Order Fulfillment System',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    welcome: 'Welcome',
    defaultCredentials: 'Username: admin, Password: admin123'
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Package className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t.welcome}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t.title}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            {t.defaultCredentials}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                {t.username}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t.username}
                  dir={language === 'fa' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                {t.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t.password}
                  dir={language === 'fa' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.login}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}