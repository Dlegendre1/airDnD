import { useDispatch } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import { useModal } from '../../context/Modal';
import { useEffect } from 'react';
import { fetchSpotDetailsFromAPI } from '../../store/spots';

function DeleteReviewModal({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(reviewActions.deleteAReview(reviewId))
            .then(closeModal());
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <>
            <div>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this review?</p>
            </div>
            <ul>
                <li>
                    <button type='button' onClick={handleSubmit}>Yes (Delete Review)</button>
                </li>
                <li>
                    <button type='button' onClick={handleCancel}>No (Keep Review)</button>
                </li>
            </ul>

        </>
    );
}

export default DeleteReviewModal;
