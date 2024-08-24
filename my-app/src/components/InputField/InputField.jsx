import React from 'react';

export const InputField = ({ type, name, placeholder, value, onChange, onBlur }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};
