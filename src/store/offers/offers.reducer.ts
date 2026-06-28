import { createReducer } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../../types/offer';
import { Review } from '../../types/review';
import {
  changeCity,
  fillOffers,
  requireAuthorization,
  setOffersLoadingStatus,
  setUserEmail,
  fillOffer,
  fillNearbyOffers,
  fillReviews,
  setOfferLoadingStatus,
  setOfferNotFoundStatus,
} from './offers.actions';
import { AuthorizationStatus, CITIES } from '../../const';

type InitialState = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
  currentOffer: OfferDetails | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  isOfferLoading: false,
  isOfferNotFound: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(fillOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(fillNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fillReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setOfferNotFoundStatus, (state, action) => {
      state.isOfferNotFound = action.payload;
    });
});

export { reducer };
