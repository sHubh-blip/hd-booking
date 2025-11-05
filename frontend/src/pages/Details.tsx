import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Experience, TimeSlot } from '../types/index';
import { experienceApi } from '../services/api';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await experienceApi.getById(id);
        setExperience(data);
        // Set first available date/time as default
        if (data.slots && data.slots.length > 0) {
          const firstSlot = data.slots[0];
          setSelectedDate(firstSlot.date);
          // Find first available time for this date
          const firstTime = data.slots.find(s => s.date === firstSlot.date && !s.soldOut);
          if (firstTime) {
            setSelectedTime(firstTime.time);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const getAvailableDates = (): string[] => {
    if (!experience) return [];
    const dates = [...new Set(experience.slots.map(s => s.date))];
    return dates.sort();
  };

  const getTimeSlotsForDate = (date: string): TimeSlot[] => {
    if (!experience) return [];
    return experience.slots.filter(s => s.date === date);
  };

  const calculatePrice = () => {
    if (!experience) return { subtotal: 0, taxes: 0, total: 0 };
    const subtotal = experience.price * quantity;
    const taxes = Math.round(subtotal * 0.06); // 6% tax
    const total = subtotal + taxes;
    return { subtotal, taxes, total };
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }
    navigate('/checkout', {
      state: {
        experience,
        date: selectedDate,
        time: selectedTime,
        quantity,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow"></div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-dark">Experience not found</p>
      </div>
    );
  }

  const priceSummary = calculatePrice();
  const availableDates = getAvailableDates();
  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-light">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-dark mb-6 hover:text-black"
        >
          <span>←</span>
          <span>Details</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            <h1 className="text-3xl font-bold text-black mb-4">{experience.title}</h1>
            <p className="text-gray-dark mb-8">{experience.description}</p>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-black mb-4">Choose date</h2>
              <div className="flex gap-3 flex-wrap">
                {availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const isSelected = date === selectedDate;
                  return (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        const firstTime = getTimeSlotsForDate(date).find(s => !s.soldOut);
                        setSelectedTime(firstTime?.time || '');
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        isSelected
                          ? 'bg-primary-yellow text-black'
                          : 'bg-gray-light text-black'
                      }`}
                    >
                      {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-black mb-4">Choose time</h2>
              <div className="flex gap-3 flex-wrap mb-2">
                {timeSlots.map((slot) => {
                  const isSelected = slot.time === selectedTime;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => !slot.soldOut && setSelectedTime(slot.time)}
                      disabled={slot.soldOut}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        slot.soldOut
                          ? 'bg-gray-medium text-gray-dark cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-primary-yellow text-black'
                          : 'bg-gray-light text-black'
                      }`}
                    >
                      {slot.time} {!slot.soldOut && `${slot.available} left`}
                      {slot.soldOut && 'Sold out'}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-gray-dark">All times are in IST (GMT +5:30)</p>
            </div>

            <div className="bg-gray-light rounded-lg p-6">
              <h2 className="text-xl font-bold text-black mb-4">About</h2>
              <p className="text-gray-dark">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-light rounded-lg p-6 sticky top-8">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-dark">Starts at</span>
                  <span className="font-bold text-black">₹{experience.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-dark">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded bg-white text-black font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded bg-white text-black font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-dark">Subtotal</span>
                  <span className="font-bold text-black">₹{priceSummary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-dark">Taxes</span>
                  <span className="font-bold text-black">₹{priceSummary.taxes}</span>
                </div>
              </div>
              <div className="border-t border-gray-medium pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-black">Total</span>
                  <span className="text-xl font-bold text-black">₹{priceSummary.total}</span>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-3 bg-gray-medium text-black font-semibold rounded-lg hover:bg-gray-dark hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

