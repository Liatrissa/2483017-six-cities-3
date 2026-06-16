import classNames from 'classnames';
import { City } from '../../types/offer';

type CitiesListProps = {
  cities: City[];
  activeCity: City;
  onCityClick: (city: City) => void;
};

function CitiesList({cities, activeCity, onCityClick}: CitiesListProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city.name}>
          <button
            className={classNames(
              'locations__item-link',
              'tabs__item',
              {
                'tabs__item--active': city.name === activeCity.name,
              }
            )}
            type="button"
            onClick={() => onCityClick(city)}
          >
            <span>{city.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
