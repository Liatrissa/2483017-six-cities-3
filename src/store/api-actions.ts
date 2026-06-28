import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const';
import { Offer, OfferDetails } from '../types/offer';
import { Review, ReviewPost } from '../types/review';
import { AppDispatch, State } from '../types/state';
import {
  fillOffers,
  requireAuthorization,
  setOffersLoadingStatus,
  setUserEmail,
  fillOffer,
  fillNearbyOffers,
  fillReviews,
  setOfferLoadingStatus,
  setOfferNotFoundStatus,
} from './offers';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';

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

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffer',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOfferLoadingStatus(true));
    dispatch(setOfferNotFoundStatus(false));

    dispatch(fillOffer(null));
    dispatch(fillNearbyOffers([]));
    dispatch(fillReviews([]));

    try {
      const {data: offer} = await api.get<OfferDetails>(
        `${APIRoute.Offers}/${offerId}`
      );

      const {data: nearbyOffers} = await api.get<Offer[]>(
        `${APIRoute.Offers}/${offerId}/nearby`
      );

      const {data: reviews} = await api.get<Review[]>(
        `${APIRoute.Comments}/${offerId}`
      );

      dispatch(fillOffer(offer));
      dispatch(fillNearbyOffers(nearbyOffers));
      dispatch(fillReviews(reviews));
    } catch {
      dispatch(setOfferNotFoundStatus(true));
    } finally {
      dispatch(setOfferLoadingStatus(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);

      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserEmail(''));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserEmail(data.email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserEmail(''));
  },
);

export const sendReviewAction = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/sendReview',
  async ({offerId, comment, rating}, {dispatch, getState, extra: api}) => {
    const {data: review} = await api.post<Review>(
      `${APIRoute.Comments}/${offerId}`,
      {comment, rating}
    );

    const {reviews} = getState();

    dispatch(fillReviews([review, ...reviews]));
  },
);
