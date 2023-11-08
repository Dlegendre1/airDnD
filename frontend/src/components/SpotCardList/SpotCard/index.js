import SpotImage from "./SpotImage";
import SpotInfo from "./SpotInfo";

function SpotCard({ spot }) {

    return (
        <>
            <SpotImage spot={spot} />
            <SpotInfo spot={spot} />
        </>
    );
};

export default SpotCard;
