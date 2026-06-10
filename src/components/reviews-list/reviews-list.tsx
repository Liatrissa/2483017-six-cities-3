import { Review as ReviewType } from '../../types/review';
import Review from '../review/review';

type ReviewsListProps = {
  reviews: ReviewType[];
};

function ReviewsList({reviews}: ReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
