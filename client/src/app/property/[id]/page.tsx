'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { getUser } from '@/lib/auth';
import toast from 'react-hot-toast';

interface Property {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: string;
  amenities: string[];
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${params.id}`);
      setProperty(response.data.property);
    } catch (error: any) {
      toast.error('Failed to load property details');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e: FormEvent) => {
    e.preventDefault();

    const user = getUser();
    if (!user) {
      toast.error('Please login to book a property');
      router.push('/login');
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    setBookingLoading(true);

    try {
      await api.post('/bookings', {
        propertyId: params.id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
      });

      toast.success('Booking created successfully!');
      router.push('/bookings');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Booking failed';
      toast.error(message);
    } finally {
      setBookingLoading(false);
    }
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const nights = Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    if (property) {
      return calculateNights() * property.price;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-96 w-full">
            <Image
              src={property.images[selectedImage] || '/placeholder.jpg'}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                <Image src={image} alt={`${property.title} ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {property.title}
                </h1>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm capitalize">
                  {property.propertyType}
                </span>
              </div>

              <p className="text-gray-600 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                {property.location}
              </p>

              <div className="flex items-center space-x-6 mb-6 text-gray-600">
                <span className="flex items-center">
                  🛏️ {property.bedrooms} Bedrooms
                </span>
                <span className="flex items-center">
                  🚿 {property.bathrooms} Bathrooms
                </span>
                <span className="flex items-center">
                  👥 Up to {property.maxGuests} Guests
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {property.description}
              </p>

              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-2 bg-gray-50 rounded-md"
                    >
                      <span className="text-primary-600 mr-2">✓</span>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-800">
                  ₹{property.price.toLocaleString()}
                  <span className="text-base font-normal text-gray-600">/night</span>
                </p>
              </div>

              <form onSubmit={handleBooking}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={bookingData.checkIn}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, checkIn: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      required
                      min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={bookingData.checkOut}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, checkOut: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={property.maxGuests}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={bookingData.guests}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          guests: parseInt(e.target.value),
                        })
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum {property.maxGuests} guests
                    </p>
                  </div>
                </div>

                {calculateNights() > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <div className="flex justify-between text-sm mb-2">
                      <span>
                        ₹{property.price.toLocaleString()} × {calculateNights()} nights
                      </span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary-600">
                          ₹{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {bookingLoading ? 'Booking...' : 'Book Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

