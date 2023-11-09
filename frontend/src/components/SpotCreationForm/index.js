import { useDispatch } from "react-redux";
import { useState } from "react";


function CreateASpot() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        return;
    };




    return (
        <>
            <h2>Create a new spot</h2>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form>
                <label>
                    Country
                    <input
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required />
                </label>
                <label>
                    Street Address
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required />
                </label>
                <label>
                    City
                    <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required />
                </label>
                <label>
                    State
                    <input
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required />
                </label>
                <label>
                    Latitude
                    <input
                        type='number'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required />
                </label>
                <label>
                    Longitude
                    <input
                        type='number'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required />
                </label>
            </form>



        </>
    );
}


export default CreateASpot;
