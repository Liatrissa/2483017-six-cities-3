import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  onCardMouseEnter?: (offerId: string) => void;
  onCardMouseLeave?: () => void;
  className?: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
};

function OffersList({
  offers,
  onCardMouseEnter,
  onCardMouseLeave,
  className = 'cities__places-list places__list tabs__content',
  cardClassName = 'cities__card place-card',
  imageWrapperClassName = 'cities__image-wrapper place-card__image-wrapper',
}: OffersListProps) {
  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onCardMouseEnter}
          onMouseLeave={onCardMouseLeave}
          cardClassName={cardClassName}
          imageWrapperClassName={imageWrapperClassName}
        />
      ))}
    </div>
  );
}

export default OffersList;
