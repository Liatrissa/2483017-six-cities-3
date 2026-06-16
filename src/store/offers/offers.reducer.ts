import { createReducer } from '@reduxjs/toolkit';
import { City, Offer } from '../../types/offer';
import { offers } from '../../mocks/offers';
import { cities } from '../../mocks/cities';
import { changeCity, fillOffers } from './offers.actions';

type InitialState = {
  city: City;
  offers: Offer[];
};

const initialState: InitialState = {
  city: cities[0],
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
