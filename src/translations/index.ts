import { Language } from '../types';

export const translations = {
  fa: {
    common: {
      dashboard: 'داشبورد',
      orders: 'سفارشات',
      settings: 'تنظیمات',
      logout: 'خروج',
      search: 'جستجو...',
      loading: 'در حال بارگذاری...',
      error: 'خطا',
      success: 'موفقیت',
    },
    system: {
      status: 'وضعیت سیستم',
      apiConnection: 'اتصال به سرور',
      connected: 'متصل',
      disconnected: 'قطع شده',
      latency: 'تاخیر',
    },
    dashboard: {
      totalOrders: 'کل سفارشات',
      fulfilled: 'تکمیل شده',
      pending: 'در انتظار',
      errors: 'خطاها',
      fulfillmentProgress: 'پیشرفت تکمیل سفارشات',
      progress: 'پیشرفت',
      orderStatus: 'وضعیت سفارشات',
    },
    fulfillment: {
      title: 'سیستم تکمیل سفارشات',
      uploadFile: 'آپلود فایل',
      viewOrders: 'مشاهده سفارشات',
      scanOrders: 'اسکن سفارشات',
      transfer: 'حمل و نقل',
      downloadUpdated: 'دانلود فایل بروزرسانی شده',
      viewLogs: 'مشاهده لاگ‌ها',
      reset: 'بازنشانی سیستم',
      scanOrderId: 'اسکن شماره سفارش',
      scanSku: 'اسکن کد محصول',
      orderDetails: 'جزئیات سفارش',
      transferTypes: {
        post: 'پست',
        snapbox: 'اسنپ باکس',
        mahex: 'ماهکس',
      },
    },
    user: {
      profile: 'کاربر سیستم',
      role: 'مدیر',
    },
  },
  en: {
    common: {
      dashboard: 'Dashboard',
      orders: 'Orders',
      settings: 'Settings',
      logout: 'Logout',
      search: 'Search...',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    system: {
      status: 'System Status',
      apiConnection: 'API Connection',
      connected: 'Connected',
      disconnected: 'Disconnected',
      latency: 'Latency',
    },
    dashboard: {
      totalOrders: 'Total Orders',
      fulfilled: 'Fulfilled',
      pending: 'Pending',
      errors: 'Errors',
      fulfillmentProgress: 'Fulfillment Progress',
      progress: 'Progress',
      orderStatus: 'Order Status',
    },
    fulfillment: {
      title: 'Order Fulfillment System',
      uploadFile: 'Upload File',
      viewOrders: 'View Orders',
      scanOrders: 'Scan Orders',
      transfer: 'Transfer',
      downloadUpdated: 'Download Updated File',
      viewLogs: 'View Logs',
      reset: 'Reset System',
      scanOrderId: 'Scan Order ID',
      scanSku: 'Scan SKU',
      orderDetails: 'Order Details',
      transferTypes: {
        post: 'Post',
        snapbox: 'Snapbox',
        mahex: 'Mahex',
      },
    },
    user: {
      profile: 'System User',
      role: 'Admin',
    },
  },
} as const;

export function useTranslations(language: Language) {
  return translations[language];
}