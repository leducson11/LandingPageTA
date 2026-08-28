import { Routes, Route } from 'react-router-dom';
import LandingPage from '@user/pages/LandingPage';
import LoginPage from '@user/pages/LoginPage';
import './user.css';

export default function UserApp() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
