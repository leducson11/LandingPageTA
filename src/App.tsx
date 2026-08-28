import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@shared/contexts/AuthContext';
import { ProtectedRoute } from '@shared/components/ProtectedRoute';
import UserApp from '@user/UserApp';
import AdminApp from '@admin/AdminApp';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* User routes - public */}
          <Route path="/*" element={<UserApp />} />
          
          {/* Admin routes - protected, requires admin role */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requireAdmin>
                <AdminApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
