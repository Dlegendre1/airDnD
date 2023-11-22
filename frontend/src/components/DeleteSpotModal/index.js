import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spots';

function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(spotActions.deleteSpot(spotId))
            .then(closeModal());
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <>
            <div>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <ul>
                <li>
                    <button type="button" onClick={handleSubmit}>Yes (Delete Spot)</button>
                </li>
                <li>
                    <button type="button" onClick={handleCancel}>No (Keep Spot)</button>
                </li>
            </ul>
        </>
    );
}

export default DeleteSpotModal;
