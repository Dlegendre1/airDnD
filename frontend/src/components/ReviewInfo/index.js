
function ReviewInfo({ spot, reviews }) {
    return (
        <div>
            <i className="fa-solid fa-star"></i>
            {reviews.length ?
                <span>{spot.avgRating} · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</span>
                : <span>New</span>
            }
        </div>
    );

}

export default ReviewInfo;
