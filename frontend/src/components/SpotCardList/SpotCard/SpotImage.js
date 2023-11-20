import './SpotCard.css';

function SpotImage({ spot }) {
    //step 8
    return (
        <div className="spot-preview-image">
            <img src={spot.previewImage} alt="Spot image" width={"250"} height={"250"} />
        </div>
    );
}

export default SpotImage;
