import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
    price: 120,
    rating: 4,
    previewImage: 'img/apartment-01.jpg',
    isFavorite: false,
    isPremium: false,
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 4.5,
    previewImage: 'img/room.jpg',
    isFavorite: true,
    isPremium: true,
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4,
    previewImage: 'img/apartment-02.jpg',
    isFavorite: true,
    isPremium: false,
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5,
    previewImage: 'img/apartment-03.jpg',
    isFavorite: false,
    isPremium: true,
  },
];
