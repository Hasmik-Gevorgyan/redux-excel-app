import React, { useState } from "react";
import { AppDispatch } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUser,
    selectColorsList, 
    deleteSelectedColor
} from "../features/user/userSlice";

const Form = ({onSubmit}: {onSubmit: () => void}) => {
    const [name, setName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const colorsList = useSelector(selectColorsList);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            const selectedColor = colorsList[Math.floor(Math.random() * colorsList.length)]?.color;
            dispatch(fetchUser({name, selectedColor}));
            dispatch(deleteSelectedColor(selectedColor));
            setName("");
            onSubmit();
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
                <button type="submit" disabled={!colorsList.length}>Submit</button>
            </form>
        </div>
    );
};

export default Form;
