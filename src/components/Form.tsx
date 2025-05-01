import React, { useState } from "react";
import { AppDispatch } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import {fetchUser, selectNumber, selectStatus, selectUser} from "../features/user/userSlice";

const Form = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const number = useSelector(selectNumber);
    const status = useSelector(selectStatus);
    const nameFromStore = useSelector(selectUser);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(fetchUser(name));
            setName("");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                />
                <button type="submit">Submit</button>
            </form>
            {status === "loading" ? 
                <p>Loading...</p>
            :
                number !== null && nameFromStore && <p>The data added to the excel ({nameFromStore}, {number})</p>
            }
            {/* {number !== null && <p>Your random number: {number}</p>} */}
        </div>
    );
};

export default Form;
