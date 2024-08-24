import React from 'react';
import { Label } from '../label/Label';
import { Error } from '../ErrorField/Error';
import { InputField } from '../InputField/InputField';

export const Field = ({ name, title, showError, errors, ...rest }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Label name={name} title={title} />
            <InputField name={name} {...rest} />
            <Error name={name} showError={showError} errors={errors} />
        </div>
    );
};
