import SpotImage from "./SpotImage";
import SpotInfo from "./SpotInfo";

function SpotCard({ spot }) {

    return (
        <div title={spot.name}>
            <SpotImage spot={spot} />
            <SpotInfo spot={spot} />
        </div>
    );
};

export default SpotCard;
