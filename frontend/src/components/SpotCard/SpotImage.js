import { useDispatch } from "react-redux";







function SpotImage({ spot }) {



    //step 8
    return (
        <>
            <img src={spot.url} alt="Spot image" width={"500"} height={"500"} />
        </>
    );
}

export default SpotImage;
