import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { fillOffers, setOffersLoadingStatus } from './offers';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));

    const {data} = await api.get<Offer[]>(APIRoute.Offers);

    dispatch(fillOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);
