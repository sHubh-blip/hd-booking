export interface Experience {
  id: string;
  _id?: string; // backend MongoDB id
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  time: string;
  available: number;
  soldOut?: boolean;
}

export interface BookingDetails {
  experienceId: string;
  date: string;
  time: string;
  quantity: number;
}

export interface BookingRequest {
  experienceId: string;
  date: string;
  time: string;
  quantity: number;
  fullName: string;
  email: string;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  refId?: string;
  message?: string;
}

export interface PromoCodeResponse {
  valid: boolean;
  discount?: number;
  message?: string;
}

export interface PriceSummary {
  subtotal: number;
  taxes: number;
  discount?: number;
  total: number;
}

