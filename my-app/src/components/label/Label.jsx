import React from 'react';
import styles from './Label.module.css';

export const Label = ({ name, title }) => {
    return (
        <label htmlFor={name} className={styles.Label}>
            <b>{title}: </b>
        </label>
    );
};
