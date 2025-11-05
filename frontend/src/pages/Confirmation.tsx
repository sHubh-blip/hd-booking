import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refId, bookingId } = location.state || {};

  useEffect(() => {
    if (!refId && !bookingId) {
      navigate('/');
    }
  }, [refId, bookingId, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-black mb-4">Booking Confirmed</h1>
        {refId && (
          <p className="text-gray-dark mb-8">Ref ID: {refId}</p>
        )}
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-medium text-black font-semibold rounded-lg hover:bg-gray-dark hover:text-white transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;

