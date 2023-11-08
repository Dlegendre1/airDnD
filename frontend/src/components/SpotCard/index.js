import SpotImage from "./SpotImage";
import { useSelector } from "react-redux";

function SpotCard({ spot }) {

    return (
        <SpotImage spot={spot} />
    );
};
