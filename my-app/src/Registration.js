import { useState } from 'react';
import styles from './Registrations.module.css';
// import { useRef } from 'react';

const INIT_FORM = {
    email: '',
    password: '',
    confirmPassword: '',
};

const useStore = () => {
    const [state, setState] = useState(INIT_FORM);

    return {
        getState: () => state,
        updateState: (fieldName, newValue) => {
            setState({ ...state, [fieldName]: newValue });
        },
        resetState: () => setState(INIT_FORM),
    };
};

const sendData = (formData) => {
    console.log(formData);
};

export const Registration = () => {
    const [errorForm, setErrorForm] = useState(null);
    const [errorState, setErrorState] = useState(false);
    const { getState, updateState, resetState } = useStore();

    const { email, password, confirmPassword } = getState();

    const onChange = ({ target }) => {
        const { name, value } = target;
        updateState(name, value);

        if (name === 'password') {
            // (!/^[a-zA-Z0-9_]{6,20}$/.test(target.value))
            if (!/^[a-zA-Z0-9_]*$/.test(target.value)) {
                setErrorForm('Неверный пароль. Пароль должен содержать - латинские буквы, цифр и нижнее подчеркивание.');
                setErrorState(true)
            } else if (target.value.length > 20) {
                setErrorForm('Неверный пароль. Пароль должен быть не больше 20 символов.');
                setErrorState(true)
            } 
            else {
                setErrorForm(null);
            }
        }

        if (name === 'confirmPassword') {
            if (!/^[a-zA-Z0-9_]*$/.test(target.value)) {
                setErrorForm('Неверный пароль. Пароль должен содержать - латинские буквы, цифр и нижнее подчеркивание.');
                setErrorState(true)
            } else if (password.length < 6) {
                setErrorForm('Неверный пароль. Пароль должен быть не меньше 6 символов.');
                setErrorState(true)
            } else if (target.value !== password) {
                setErrorForm('Введенный повторно пароль не совпадает. Попробуйте ещё раз.');
                setErrorState(true)
            } 
            else {
                setErrorForm(null);
            }
        }
    };

    const onPasswordBlur = ({ target }) => {
        if (target.value.length < 6) {
            setErrorForm('Неверный пароль. Пароль должен быть не меньше 6 символов.');
            setErrorState(true)
        }
        // else {
        //     setErrorForm(null);
        // }
    };

    const onConfirmPassworddBlur = ({ target }) => {
        if (password.length < 6) {
            setErrorForm('Неверный пароль. Пароль должен быть не меньше 6 символов.');
            setErrorState(true)
        } else if (target.value !== password) {
            setErrorForm('Введенный повторно пароль не совпадает. Попробуйте ещё раз.');
            setErrorState(true)
        }
        // else {
        //     setErrorForm(null);
        // }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (!errorForm && email && password && confirmPassword) {
            if (password === confirmPassword) {
                console.log('Success');
                sendData(getState());
                resetState();
            } else {
                setErrorForm('Введенный повторно пароль не совпадает. Попробуйте ещё раз');
                setErrorState(true)
            }
        } else {
            setErrorForm('Форма содержит ошибки. Пожалуйста, исправьте их.');
            setErrorState(true)
        }

        // if (email && password && confirmPassword) {
        //     console.log('Success');
        //     // setErrorForm(false);
        // } else {
        //     console.log('Error');
        //     // setErrorForm(true);
        // }
    };

    return (
        <div className={styles.App}>
            <div>
                <p className={styles.Title}>Регистрация на React</p>

                {/* <h2>Ошибки: Выводя запрещенные симаолы, регистрация проходит. Исправить.</h2> */}

                <form className={styles.Form} onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className={styles.Label}>
                            <b>Почта: </b>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Введите почту"
                            value={email}
                            onChange={onChange}
                            // onChange={onEmailChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={styles.Label}>
                            <b>Пароль: </b>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={onChange}
                            // onChange={onPasswordChange}
                            onBlur={onPasswordBlur}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className={styles.Label}>
                            <b>Повторите пароль: </b>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Введите пароль еще раз"
                            value={confirmPassword}
                            onChange={onChange}
                            // onChange={onConfirmPasswordChange}
                            onBlur={onConfirmPassworddBlur}
                        />
                    </div>

                    <button type="submit" disabled={errorState}>
                        Зарегистрироваться
                    </button>
                    {errorState && (
                        <span className={styles.Error}>
                            {errorForm}
                        </span>
                    )}
                </form>
                <pre>
                    email: {email}
                    <br />
                    password: {password}
                    <br />
                    confirmPassword: {confirmPassword}
                </pre>
            </div>
        </div>
    );
};
