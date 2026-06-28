import classNames from 'classnames';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  AppRoute,
  STAR_WIDTH_PERCENT,
  NEARBY_OFFERS_LIMIT,
  OFFER_IMAGES_LIMIT,
  AuthorizationStatus,
} from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { fetchOfferAction } from '../../store/api-actions';

function OfferPage() {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  const currentOffer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const reviews = useAppSelector((state) => state.reviews);
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const isOfferNotFound = useAppSelector((state) => state.isOfferNotFound);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }
  }, [id, dispatch]);

  if (isOfferNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isOfferLoading || !currentOffer) {
    return <Spinner />;
  }

  const {
    title,
    type,
    price,
    rating,
    isFavorite,
    isPremium,
    city,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults,
  } = currentOffer;

  const bedroomsText = bedrooms === 1 ? 'Bedroom' : 'Bedrooms';
  const adultsText = maxAdults === 1 ? 'adult' : 'adults';
  const nearbyOffersLimited = nearbyOffers.slice(0, NEARBY_OFFERS_LIMIT);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, OFFER_IMAGES_LIMIT).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={classNames(
                    'offer__bookmark-button',
                    'button',
                    {'offer__bookmark-button--active': isFavorite}
                  )}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${rating * STAR_WIDTH_PERCENT}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedroomsText}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {adultsText}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={classNames(
                      'offer__avatar-wrapper',
                      'user__avatar-wrapper',
                      {'offer__avatar-wrapper--pro': host.isPro}
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm offerId={currentOffer.id} />
                )}
              </section>
            </div>
          </div>
          <Map
            city={city}
            offers={[currentOffer, ...nearbyOffersLimited]}
            selectedOffer={currentOffer}
            className="offer__map map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyOffersList offers={nearbyOffersLimited} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
