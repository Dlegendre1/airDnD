import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as spotsActions from "../../store/spots";
import { useHistory, useParams } from 'react-router-dom';
import './index.css';
import { fetchSpotDetailsFromAPI } from "../../store/spots";

function EditASpot() {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.spotDetails);
    const history = useHistory();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [previewImage, setPreviewImage] = useState('');
    const [secondaryImages, setSecondaryImages] = useState([]);
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(fetchSpotDetailsFromAPI(spotId))
            .then((spotDetails) => {
                setCountry(spot.country);
                setAddress(spot.address);
                setCity(spot.city);
                setState(spot.state);
                setLat(spot.lat);
                setLng(spot.lng);
                setDescription(spot.description);
                setName(spot.name);
                setPrice(spot.price);
                setPreviewImage(spot.previewImage);
            });
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(spotsActions.editExistingSpot({ address, city, state, country, lat, lng, name, description, price }, spotId))
            .then((spot) => {
                console.log(spot, "$$$$$$$$$$$$$$");
                history.push(`/spots/${spot.id}`);
            });
    };

    console.log(spot, '############');
    return (
        <div className="spot-creation-form">
            <div className="spot-create-form-header">
                <h2 className="create-new-spot-text">Update Your Spot</h2>
                <h3 className="where-is-your-place-text">Where's your place located?</h3>
                <p className="booked-reservation-text">Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="country-area">
                    <label className="country-text">
                        Country
                        <input
                            type='text'
                            defaultValue={spot.country}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required />
                    </label>
                </div>
                <div className="address-area">
                    <label className="address-text">
                        Street Address
                        <input
                            type='text'
                            defaultValue={spot.address}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required />
                    </label>
                </div>
                <div className="city-state-area">
                    <div className="city-area">
                        <label className="city-text">
                            City
                            <input
                                type='text'
                                defaultValue={spot.city}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required />
                        </label>
                    </div>
                    <span className="commas">, </span>
                    <div className="state-area">
                        <label className="state-text">
                            State
                            <input
                                type='text'
                                defaultValue={spot.state}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required />
                        </label>
                    </div>
                </div>
                <div className="lat-lng-area">
                    <div className="lat-area">
                        <label className="lat-text">
                            Latitude
                            <input
                                type='text'
                                defaultValue={spot.lat}
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                required />
                        </label>
                    </div>
                    <span className='commas'>, </span>
                    <div className="lng-area">
                        <label className="lng-text">
                            Longitude
                            <input
                                type='text'
                                defaultValue={spot.lng}
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                                required />
                        </label>
                    </div>
                </div>
                <hr></hr>
                <div className="describe-place-area">
                    <h2>Describe your place to your guests</h2>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                </div>
                <label className="description-text">
                    <textarea
                        type='textarea'
                        defaultValue={spot.description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </label>
                <hr></hr>
                <div className="title-for-spot-area">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlight what makes your place special.</p>
                </div>
                <label className="name-of-area-text">
                    <input
                        type='text'
                        defaultValue={spot.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </label>
                <hr></hr>
                <div className="price-for-spot-textarea">
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <label className="dollar-sign-text">
                        $
                        <input
                            type='text'
                            defaultValue={spot.price}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required />
                    </label>
                    <hr></hr>
                </div>
                <div>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <label>
                        <input
                            type='url'
                            defaultValue={spot.previewImage}
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required />
                    </label>
                    <hr></hr>
                </div>
                <div>
                    <button type="submit">Update Your Spot</button>
                </div>
            </form>
        </div>
    );
}


export default EditASpot;
