import { useDispatch } from "react-redux";
import { useState } from "react";
import * as spotsActions from "../../store/spots";
import { useHistory } from 'react-router-dom';
import './index.css';

function CreateASpot() {
    const dispatch = useDispatch();
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
    const [previewUrl, setPreviewUrl] = useState('');
    const [url, setUrl] = useState('');
    const [urlTwo, setUrlTwo] = useState('');
    const [urlThree, setUrlThree] = useState('');
    const [urlFour, setUrlFour] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const imageArr = [url, urlTwo, urlThree, urlFour];
        setErrors({});
        const populatedUrls = imageArr.filter((spotImage) => spotImage).map((spotImage) => {
            return { url: spotImage, preview: false };
        });
        return dispatch(spotsActions.postNewSpot({ address, city, state, country, lat, lng, name, description, price }, [{ url: previewUrl, preview: true }, ...populatedUrls]))
            .then(([spot, ...images]) => {
                history.push(`/spots/${spot.id}`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };



    return (
        <div className="spot-creation-form">
            <div className="spot-create-form-header">
                <h2 className="create-new-spot-text">Create a new spot</h2>
                <h3 className="where-is-your-place-text">Where's your place located?</h3>
                <p className="booked-reservation-text">Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="country-area">
                    <label className="country-text">
                        Country
                        <input
                            type='text'
                            value={country}
                            placeholder="Country"
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    {errors.country && <p>{errors.country}</p>}
                </div>
                <div className="address-area">
                    <label className="address-text">
                        Street Address
                        <input
                            type='text'
                            value={address}
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    {errors.address && <p>{errors.address}</p>}
                </div>
                <div className="city-state-area">
                    <div className="city-area">
                        <label className="city-text">
                            City
                            <input
                                type='text'
                                value={city}
                                placeholder="City"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                        {errors.city && <p>{errors.city}</p>}
                    </div>
                    <span>, </span>
                    <div className="state-area">
                        <label className="state-text">
                            State
                            <input
                                type='text'
                                value={state}
                                placeholder="STATE"
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                        {errors.state && <p>{errors.state}</p>}
                    </div>
                </div>
                <div className="lat-lng-area">
                    <div className="lat-area">
                        <label className="lat-text">
                            Latitude
                            <input
                                type='text'
                                value={lat}
                                placeholder="Latitude"
                                onChange={(e) => setLat(e.target.value)}
                            />
                        </label>
                        {errors.lat && <p>{errors.lat}</p>}
                    </div>
                    <span>, </span>
                    <div className="lng-area">
                        <label className="lng-text">
                            Longitude
                            <input
                                type='text'
                                value={lng}
                                placeholder="Longitude"
                                onChange={(e) => setLng(e.target.value)}
                            />
                        </label>
                        {errors.lng && <p>{errors.lng}</p>}
                    </div>
                </div>
                <hr></hr>
                <div className="describe-place-area">
                    <h2>Describe your place to your guests</h2>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                </div>
                <label>
                    <input className="description-text"
                        type='textarea'
                        value={description}
                        placeholder="Please write at least 30 characters"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <hr></hr>
                <div className="title-for-spot-area">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlight what makes your place special.</p>
                </div>
                <label className="name-of-area-text">
                    <input
                        type='text'
                        value={name}
                        placeholder="Name of your spot"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <hr></hr>
                <div className="price-for-spot-textarea">
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <label className="dollar-sign-text">
                        $
                        <input
                            type='text'
                            value={price}
                            placeholder="Price per night (USD)"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {errors.price && <p>{errors.price}</p>}
                    <hr></hr>
                </div>
                <div>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <label>
                        <input
                            type='url'
                            value={previewUrl}
                            placeholder="Preview Image URL"
                            onChange={(e) => setPreviewUrl(e.target.value)}
                        />
                        {errors.previewUrl && <p>{errors.previewUrl}</p>}
                    </label>
                    <label>
                        <input
                            type='url'
                            value={url}
                            placeholder="Image URL"
                            onChange={(e) => setUrl(e.target.value)} />
                    </label>
                    {errors.url && <p>{errors.url}</p>}
                    <label>
                        <input
                            type='url'
                            value={urlTwo}
                            placeholder="Image URL"
                            onChange={(e) => setUrlTwo(e.target.value)} />
                    </label>
                    <label>
                        <input
                            type='url'
                            value={urlThree}
                            placeholder="Image URL"
                            onChange={(e) => setUrlThree(e.target.value)} />
                    </label>
                    <label>
                        <input
                            type='url'
                            value={urlFour}
                            placeholder="Image URL"
                            onChange={(e) => setUrlFour(e.target.value)} />
                    </label>
                    <hr></hr>
                </div>
                <div>
                    <button type="submit">Create Spot</button>
                </div>
            </form>
        </div >
    );
}


export default CreateASpot;
