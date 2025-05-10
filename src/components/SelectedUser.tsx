import { useSelector } from "react-redux";
import {
    selectColor,
    selectUser,
    selectfetchUserStatus
} from "../features/user/userSlice";

const SelectedUser = ({onReset}: {onReset: () => void}) => {
    const color = useSelector(selectColor);
    const name = useSelector(selectUser);
    const status = useSelector(selectfetchUserStatus);

    return (
        status === 'loading' ?
            <div>Loading...</div>
        :
        <>
            <h2>Thank you for your participation</h2>
            <div  className="selected-user">
                <h2>{name}</h2>
                <div className="color-box" style={{backgroundColor: color, }}>{color}</div>
            
            </div>
            <button onClick={onReset}>Return</button>
        </>
    );
}

export default SelectedUser;