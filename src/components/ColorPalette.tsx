import {selectColorsList,  selectfetchColorsStatus} from "../features/user/userSlice";
import { useSelector } from "react-redux";

const ColorPalette = () => {
    const colorsList = useSelector(selectColorsList);
    const status = useSelector(selectfetchColorsStatus);

    return (
        <div>
            {status === "loading" ?
                <div>Loading...</div>
            :
                colorsList.length ?
                    <>
                        <h2>Available Colors</h2>
                        <div className="color-palette">
                            {colorsList.map((color, index) => (
                                <div key={index} className="color-box" style={{ backgroundColor: color.color }}>
                                    {color.color}
                                </div>
                            ))}
                        </div>
                    </>
                :
                    <h2>There is no color Available</h2>
            }
        </div>
    );
};


export default ColorPalette;