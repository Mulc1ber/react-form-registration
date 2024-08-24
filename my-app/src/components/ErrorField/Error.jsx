import React from 'react';
import styles from './Error.module.css';

export const Error = ({ name, showError, errors }) => {
    return (
        <div>
            {showError(name) && <span className={styles.Error}>{errors[name]}</span>}
        </div>
    );
};
