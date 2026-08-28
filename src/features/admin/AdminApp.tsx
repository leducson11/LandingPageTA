import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';

export default function AdminApp() {
  return (
    <div className="admin-layout">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
}
