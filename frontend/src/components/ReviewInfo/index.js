
function ReviewInfo({ spot, reviews }) {
    return (
        <div>
            <i class="fa-solid fa-star"></i>
            {reviews.length ?
                <span>{spot.avgRating} · {reviews.length} reviews</span>
                : <span>New</span>
            }
        </div>
    );

}

export default ReviewInfo;
