import Header from '../hospital/Header';
import Footer from '../hospital/Footer';
import bg from '../../assets/bloodpulse.jpg';
import { Outlet } from 'react-router-dom';

const HospitalLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 bg-opacity-80">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 min-h-[60vh] max-w-2xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HospitalLayout;
