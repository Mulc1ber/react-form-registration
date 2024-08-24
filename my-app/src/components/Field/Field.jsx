import React from 'react';
import { Label } from '../label/Label';
import { Error } from '../ErrorField/Error';
import { InputField } from '../InputField/InputField';

export const Field = ({
    name,
    title,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    showError,
    errors,
}) => {
    return (
        <div style={{ display: 'flex' }}>
            <Label name={name} title={title} />
            <InputField
                type={type}
                name={name}
                placeholder={placeholder}
                value={value[name]}
                onChange={onChange}
                onBlur={onBlur}
            />
            <Error name={name} showError={showError} errors={errors} />
        </div>
    );
};
