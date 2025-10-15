'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { getUser } from '@/lib/auth';
import BookingCard from '@/components/BookingCard';
import toast from 'react-hot-toast';

interface Booking {
  _id: string;
  property: {
    _id: string;
    title: string;
    location: string;
    images: string[];
    price: number;
    propertyType: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function BookingsPage() {
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your bookings');
      router.push('/login');
    }
  }, [user, router]);

  // React Query automatically handles loading and data fetching
  const { data: bookings = [], isLoading: loading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = await api.get('/bookings/my-bookings');
      return response.data.bookings;
    },
    enabled: !!user, // Only fetch if user is logged in
  });

  // Show error toast if query fails
  if (error) {
    toast.error('Failed to load bookings');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            View and manage all your property bookings
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No bookings yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring properties and make your first booking!
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking: Booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

