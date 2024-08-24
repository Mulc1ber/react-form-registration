import React from 'react';

export const Button = ({ isValid, buttonRef }) => {
    return (
        <button type="submit" disabled={!isValid} ref={buttonRef}>
            Зарегистрироваться
        </button>
    );
};
