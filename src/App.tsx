import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './components/auth/LoginPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { OrderScanner } from './components/fulfillment/OrderScanner';
import { OrderList } from './components/fulfillment/OrderList';
import { FileUpload } from './components/fulfillment/FileUpload';
import { TransferPage } from './components/fulfillment/TransferPage';
import { LogPage } from './components/fulfillment/LogPage';
import { SettingsPage } from './pages/SettingsPage';

const queryClient = new QueryClient();

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden mr-72">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <DashboardStats />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <SettingsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/fulfillment/*"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Routes>
                        <Route index element={<FileUpload />} />
                        <Route path="scan" element={<OrderScanner />} />
                        <Route path="orders" element={<OrderList />} />
                        <Route path="transfer" element={<TransferPage />} />
                        <Route path="logs" element={<LogPage />} />
                      </Routes>
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;