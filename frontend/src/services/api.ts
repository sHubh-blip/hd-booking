import axios from 'axios';
import type { Experience, BookingRequest, BookingResponse, PromoCodeResponse } from '../types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function normalizeExperience(raw: any): Experience {
  return {
    id: raw.id || raw._id,
    _id: raw._id,
    title: raw.title,
    location: raw.location,
    description: raw.description,
    price: raw.price,
    image: raw.image,
    slots: raw.slots ?? [],
  };
}

export const experienceApi = {
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return (response.data as any[]).map(normalizeExperience);
  },

  getById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return normalizeExperience(response.data);
  },
};

export const bookingApi = {
  create: async (booking: BookingRequest): Promise<BookingResponse> => {
    const response = await api.post<BookingResponse>('/bookings', booking);
    return response.data;
  },
};

export const promoApi = {
  validate: async (code: string): Promise<PromoCodeResponse> => {
    const response = await api.post<PromoCodeResponse>('/promo/validate', { code });
    return response.data;
  },
};

export default api;

