import { City, Offer } from '../types/offer';

export const amsterdam: City = {
  name: 'Amsterdam',
  location: {
    lat: 52.35514938496378,
    lng:  4.673877537499948,
    zoom: 8,
  },
};

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
    price: 120,
    city: amsterdam,
    location: {
      lat: 52.3909553943508,
      lng: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-01.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: amsterdam,
    location: {
      lat: 52.3609553943508,
      lng: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.5,
    previewImage: 'img/room.jpg',
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: amsterdam,
    location: {
      lat: 52.3909553943508,
      lng: 4.929309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-02.jpg',
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    city: amsterdam,
    location: {
      lat: 52.3809553943508,
      lng: 4.939309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'img/apartment-03.jpg',
  },
];
