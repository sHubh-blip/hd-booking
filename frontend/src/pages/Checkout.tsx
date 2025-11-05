import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { BookingRequest } from '../types/index';
import { bookingApi, promoApi } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { experience, date, time, quantity } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    promoCode: '',
  });
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!experience || !date || !time) {
      navigate('/');
    }
  }, [experience, date, time, navigate]);

  const calculatePrice = () => {
    if (!experience) return { subtotal: 0, taxes: 0, total: 0 };
    const subtotal = experience.price * quantity;
    const taxes = Math.round(subtotal * 0.06);
    const discount = promoDiscount;
    const total = subtotal + taxes - discount;
    return { subtotal, taxes, discount, total };
  };

  const handleApplyPromo = async () => {
    if (!formData.promoCode.trim()) return;

    try {
      const response = await promoApi.validate(formData.promoCode);
      if (response.valid) {
        setPromoApplied(true);
        setPromoDiscount(response.discount || 0);
      } else {
        alert(response.message || 'Invalid promo code');
      }
    } catch (err) {
      alert('Failed to validate promo code');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Please accept the terms and safety policy');
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const booking: BookingRequest = {
        experienceId: experience.id,
        date,
        time,
        quantity,
        fullName: formData.fullName,
        email: formData.email,
        promoCode: promoApplied ? formData.promoCode : undefined,
      };

      const response = await bookingApi.create(booking);
      
      if (response.success && response.refId) {
        navigate('/confirmation', {
          state: {
            refId: response.refId,
            bookingId: response.bookingId,
          },
        });
      } else {
        alert(response.message || 'Booking failed. Please try again.');
        setLoading(false);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Booking failed. Please try again.');
      setLoading(false);
    }
  };

  if (!experience) {
    return null;
  }

  const priceSummary = calculatePrice();

  return (
    <div className="min-h-screen bg-gray-light">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-dark mb-6 hover:text-black"
        >
          <span>←</span>
          <span>Checkout</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-6">Booking Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-2 bg-gray-light rounded-lg border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your email"
                      required
                      className="w-full px-4 py-2 bg-gray-light rounded-lg border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Promo code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.promoCode}
                      onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-2 bg-gray-light rounded-lg border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className="px-6 py-2 bg-gray-dark text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-2">Promo code applied! Discount: ₹{promoDiscount}</p>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-dark">
                    I agree to the terms and safety policy
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary-yellow text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Pay and Confirm'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-light rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-black mb-6">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-dark">Experience</span>
                  <span className="font-semibold text-black">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-dark">Date</span>
                  <span className="font-semibold text-black">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-dark">Time</span>
                  <span className="font-semibold text-black">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-dark">Qty</span>
                  <span className="font-semibold text-black">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-dark">Subtotal</span>
                  <span className="font-semibold text-black">₹{priceSummary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-dark">Taxes</span>
                  <span className="font-semibold text-black">₹{priceSummary.taxes}</span>
                </div>
                {promoApplied && promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-medium pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-black">Total</span>
                  <span className="text-xl font-bold text-black">₹{priceSummary.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

