import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from './Registration.module.css';
import { Button } from '../Button/Button';
import { validateSchema } from '../../utils/validateSchema';
import { validate } from '../../utils/validate';
import { Field } from '../Field/Field';

export const Registration = () => {
    const [dataForm, setDataForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });

    const submitButtonRef = useRef(null);

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prevState) => ({ ...prevState, [name]: value }));
        if (!touched[name]) {
            setTouched((prevState) => ({ ...prevState, [name]: true }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prevState) => ({ ...prevState, [name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            console.log(dataForm);
            setDataForm({ email: '', password: '', confirmPassword: '' });
            setTouched({ email: false, password: false, confirmPassword: false });
        }
    };

    useEffect(() => {
        validateSchema.confirmPassword.equals.params = dataForm.password;
        const errors = validate(dataForm, validateSchema);
        setErrors(errors);
    }, [dataForm]);

    useEffect(() => {
        if (isValid) {
            submitButtonRef.current.focus();
        }
    }, [isValid]);

    const showError = (name) => {
        return touched[name] && errors[name];
    };

    return (
        <div className={styles.Registration}>
            <div>
                <p className={styles.Title}>Регистрация</p>

                <form className={styles.Form} onSubmit={handleSubmit}>
                    <Field
                        name={'email'}
                        title={'Эл. Почта'}
                        type={'email'}
                        placeholder={'Введите почту'}
                        value={dataForm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        showError={showError}
                        errors={errors}
                    />
                    <Field
                        name={'password'}
                        title={'Пароль'}
                        type={'password'}
                        placeholder={'Введите пароль'}
                        value={dataForm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        showError={showError}
                        errors={errors}
                    />
                    <Field
                        name={'confirmPassword'}
                        title={'Повторите пароль'}
                        type={'password'}
                        placeholder={'Введите пароль еще раз'}
                        value={dataForm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        showError={showError}
                        errors={errors}
                    />
                    <Button isValid={isValid} buttonRef={submitButtonRef} />
                </form>
            </div>
        </div>
    );
};
