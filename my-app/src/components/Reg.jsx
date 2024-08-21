import React from 'react'
import { useState, useEffect, useRef } from 'react';
import styles from '../Registrations.module.css';


const validateSchema = {
    email: {
        required: {
            message: 'Требуется ввести адрес электронную почту'
        },
        isEmail: {
            message: 'Адрес электронной почты недействителен'
        }
    },
    password: {
        required: {
            message: 'Требуется ввести пароль'
        },
        minLength: {
            message: 'Неверный пароль. Должно быть не меньше 6 символов',
            params: 6,
        },
        maxLength: {
            message: 'Неверный пароль. Должно быть не больше 20 символов',
            params: 20,
        }

    },
    confirmPassword: {
        required: {
            message: 'Требуется подтвердить пароль'
        },
        equals: {
            message: 'Пароли должны совпадать. Попробуйте еще раз',
            params: '',
        }
    }
}

const validateRules = {
    required: (value) => Boolean(value.trim()),
    isEmail: (value) => {
        const re =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return re.test(String(value).toLowerCase())
    },
    minLength: (value, params) => value.length >= params,
    maxLength: (value, params) => value.length <= params,
    equals: (value, params) => value === params,
}

const validate = (data, config) => {
    const errors = {}

    for(const value in data) {
        const rules = config[value];

        for(const rule in rules) {
            const { message, params } = rules[rule];

            const validator = validateRules[rule];

            const hasError = validator && !validator(data[value], params)

            if (hasError) {
                errors[value] = message
                break
            }
        }
    }

    return errors
}


export const Reg = () => {
    const [dataForm, setDataForm] = useState({email: '', password: '', confirmPassword: ''});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({email: false, password: false, confirmPassword: false});
    const submitButtonRef = useRef(null);

    const isValid = Object.keys(errors).length === 0


    const handleChange = (e) => {
        const {name, value} = e.target;
        setDataForm((prevState) => ({...prevState, [name]:value}));
        if (!touched[name]) {
            setTouched((prevState) => ({...prevState, [name]:true}))
        }
    }

    const handleSubmit = (e) => {
        if (!isValid) {
            e.preventDefault();
            console.log(dataForm);
        }
    }

    useEffect(() => {
        validateSchema.confirmPassword.equals.params = dataForm.password;
        const errors = validate(dataForm, validateSchema)
        console.log('errors:',errors);
        
        setErrors(errors)
    }, [dataForm])

    useEffect(() => {
        if (isValid) {
            submitButtonRef.current.focus()
        }
    }, [isValid])


    const showError = (name) => {
        return errors[name]
    }


    return (
        <div className={styles.App}>
            <div>
                <p className={styles.Title}>Регистрация Новая</p>

                <form className={styles.Form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className={styles.Label}>
                            <b>Почта: </b>
                        </label>
                        <input type="email" name="email" placeholder="Введите почту" value={dataForm.email} onChange={handleChange}/>
                        {showError('email') && touched.email && <span className={styles.Error}>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className={styles.Label}>
                            <b>Пароль: </b>
                        </label>
                        <input type="password" name="password" placeholder="Введите пароль" value={dataForm.password} onChange={handleChange}/>
                        {showError('password') && touched.password && <span className={styles.Error}>{errors.password}</span>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className={styles.Label}>
                            <b>Повторите пароль: </b>
                        </label>
                        <input type="password" name="confirmPassword" placeholder="Введите пароль еще раз" value={dataForm.confirmPassword} onChange={handleChange}/>
                        {showError('confirmPassword') && touched.confirmPassword && <span className={styles.Error}>{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" disabled={!isValid} ref={submitButtonRef}>Зарегистрироваться</button>
                </form>
                {/* <pre>
                    email: {email}
                    <br />
                    password: {password}
                    <br />
                    confirmPassword: {confirmPassword}
                </pre> */}
            </div>
        </div>
  )
}