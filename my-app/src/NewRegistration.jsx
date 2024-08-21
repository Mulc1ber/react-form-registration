import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Registrations.module.css'


const fieldsSchema = yup.object()
    .shape({
        login: yup.string()
            .required('Требуется ввести логин')
            .matches(/^[\w_]*$/, 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание')
            .min(3, 'Неверный логин. Должно быть не меньше 3 символов')
            .max(15, 'Неверный логин. Должно быть не больше 15 символов'),
        email: yup.string()
            .required('Требуется ввести электронную почту')
            .email(),
        password: yup.string()
            .required('Требуется ввести пароль')
            .min(6, 'Неверный пароль. Должно быть не меньше 6 символов')
            .max(20, 'Неверный пароль. Должно быть не больше 20 символов'),
        repeatPassword: yup.string()
            .required('Требуется подтвердить пароль')
            .min(6, 'Неверный пароль. Должно быть не меньше 6 символов')
            .max(20, 'Неверный пароль. Должно быть не больше 20 символов')
            .oneOf([yup.ref("password")], "Пароли должны совпадать. Попробуйте еще раз"),
    });


export const NewRegistration = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            login: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        resolver: yupResolver(fieldsSchema),
    });


    // const loginProps = {
    //     minLength: { value: 3, message: 'Неверный логин. Должно быть не меньше 3 символов' },
    //     maxLength: { value: 20, message: 'Неверный логин. Должно быть не больше 20 символов' },
    //     pattern: {
    //         value: /^[\w_]*$/,
    //         message: 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
    //     },
    // };

    // const emailProps = {
    //     pattern: {
    //         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //         message: 'Неверный ввод почты. Попробуйте еще раз',
    //     },
    // };

    // const passwordProps = {
    //     minLength: { value: 6, message: 'Неверный пароль. Должно быть не меньше 6 символов' },
    //     maxLength: { value: 20, message: 'Неверный пароль. Должно быть не больше 20 символов' },
    //     pattern: {
    //         value: /^[\w_]*$/,
    //         message: 'Неверный ввод пароля. Попробуйте еще раз',
    //     },
    // };

    // const repeatPasswordProps = {
    //     validate: (value) => {
    //         if (watch('password') !== value) {
    //             return "Ваши пароли не совпадают. Попробуйте еще раз";
    //         }
    //     },
    // };


    const loginError = errors.login?.message;
    const emailError = errors.email?.message;
    const passwordError = errors.password?.message;
    const repeatPasswordError = errors.repeatPassword?.message;


    const sendFormData = (formData) => {
        console.log(formData);
        reset()
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>    
            <div>
                <p className={styles.Title}>Регистрация с react-hook-form и yup</p>
                <form className={styles.Form} onSubmit={handleSubmit(sendFormData)}>
                    <div>
                        <label htmlFor="login" className={styles.Label}><b>Логин: </b></label>
                        <input name="login" type="text" placeholder="Введите Логин" {...register('login')} />
                        {loginError && <span className={styles.Error}>{loginError}</span>}
                    </div>
                    <div>
                    <label htmlFor="email" className={styles.Label}><b>Эл. почта: </b></label>
                        <input name="email" type="email" placeholder="Введите эл. почту" {...register('email')} /> 
                        {emailError && <span className={styles.Error}>{emailError}</span>}
                    </div>
                    <div>
                    <label htmlFor="password" className={styles.Label}><b>Пароль: </b></label>
                        <input name="password" type="password" placeholder="Введите пароль" {...register('password')} /> 
                        {passwordError && <span className={styles.Error}>{passwordError}</span>}
                    </div>
                    <div>
                    <label htmlFor="repeatPassword" className={styles.Label}><b>Повторите пароль: </b></label>
                        <input name="repeatPassword" type="password" placeholder="Повторите пароль" {...register('repeatPassword')} /> 
                        {repeatPasswordError && <span className={styles.Error}>{repeatPasswordError}</span>}
                    </div>
                    <button type="submit" disabled={!!loginError}>Отправить</button>
                </form>
            </div>
        </div>
    );
};
