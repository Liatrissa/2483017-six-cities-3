import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import OffersList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';
import { City } from '../../types/offer';
import { changeCity } from '../../store/action';
import { cities } from '../../mocks/cities';

function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => state.city);

  const offers = useAppSelector((state) => state.offers);

  const currentCityOffers = offers.filter(
    (offer) => offer.city.name === city.name
  );

  const favoriteOffersCount = offers.filter((offer) => offer.isFavorite).length;

  const selectedOffer = currentCityOffers.find((offer) => offer.id === activeOfferId);

  const handleCityClick = (selectedCity: City) => {
    setActiveOfferId(null);
    dispatch(changeCity(selectedCity));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favoriteOffersCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={cities}
              activeCity={city}
              onCityClick={handleCityClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentCityOffers.length} places to stay in {city.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList
                offers={currentCityOffers}
                onCardMouseEnter={setActiveOfferId}
                onCardMouseLeave={() => setActiveOfferId(null)}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                offers={currentCityOffers}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
