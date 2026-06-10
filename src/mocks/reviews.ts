import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1',
    date: '2019-04-24T10:13:56.569Z',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
  }
];
