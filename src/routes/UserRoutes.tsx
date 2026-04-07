import { Routes, Route, Navigate } from "react-router-dom";
import Index from "../pages/user/Index";
import PujasPage from "../pages/user/Pujas";
import AboutPage from "../pages/user/About";
import ContactPage from "../pages/user/Contact";
import ProfilePage from "../pages/user/Profile";
import MyBookingsPage from "../pages/user/MyBookings";
import TempleDetails from "../pages/user/TempleDetails";
import PujaDetails from "../pages/user/PujaDetails";
import BookingPage from "../pages/user/BookingPage";
import NotFound from "../pages/NotFound";

const UserRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/pujas" element={<PujasPage />} />
      <Route path="/chadhava" element={<Navigate to="/pujas" replace />} />
      <Route path="/prasad" element={<Navigate to="/pujas" replace />} />
      <Route path="/darshan" element={<Navigate to="/pujas" replace />} />
      <Route path="/temple" element={<TempleDetails />} />
      <Route path="/puja/:type/:id" element={<PujaDetails />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* User Protected Routes */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/book/:type/:id" element={<BookingPage />} />
      
      {/* Catch all for user routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;