import { useState } from 'react';
import { CITIES, SortOption } from '../../const';
import OffersList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';
import { changeCity } from '../../store/offers';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { getSortedOffers } from '../../utils';
import Header from '../../components/header/header';

function MainPage() {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSortOption, setActiveSortOption] = useState(SortOption.Popular);

  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const currentCityOffers = offers.filter(
    (offer) => offer.city.name === city
  );

  const sortedOffers = getSortedOffers(currentCityOffers, activeSortOption);

  const selectedOffer = currentCityOffers.find((offer) => offer.id === activeOfferId);

  const selectedCity = currentCityOffers[0]?.city;

  const handleCityClick = (selectedCityName: string) => {
    setActiveOfferId(null);
    dispatch(changeCity(selectedCityName));
  };

  return (
    <div className="page page--gray page--main">
      <Header isMainPage />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITIES}
              activeCity={city}
              onCityClick={handleCityClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentCityOffers.length} places to stay in {city}</b>
              <SortingOptions
                activeSortOption={activeSortOption}
                onSortOptionChange={setActiveSortOption}
              />
              <OffersList
                offers={sortedOffers}
                onCardMouseEnter={setActiveOfferId}
                onCardMouseLeave={() => setActiveOfferId(null)}
              />
            </section>
            <div className="cities__right-section">
              {selectedCity && (
                <Map
                  city={selectedCity}
                  offers={currentCityOffers}
                  selectedOffer={selectedOffer}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
