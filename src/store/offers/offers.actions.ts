import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../../types/offer';
import { Review } from '../../types/review';
import { AuthorizationStatus } from '../../const';

export const changeCity = createAction<string>('offers/changeCity');

export const fillOffers = createAction<Offer[]>('offers/fillOffers');

export const setOffersLoadingStatus = createAction<boolean>('offers/setOffersLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserEmail = createAction<string>('user/setUserEmail');

export const fillOffer = createAction<OfferDetails | null>('offers/fillOffer');

export const fillNearbyOffers = createAction<Offer[]>('offers/fillNearbyOffers');

export const fillReviews = createAction<Review[]>('offers/fillReviews');

export const setOfferLoadingStatus = createAction<boolean>('offers/setOfferLoadingStatus');

export const setOfferNotFoundStatus = createAction<boolean>(
  'offers/setOfferNotFoundStatus'
);
