import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { changeCity, fillOffers, setOffersLoadingStatus } from './offers.actions';
import { CITIES } from '../../const';

type InitialState = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  isOffersLoading: false,
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
    });
});

export { reducer };
