export const validateSchema = {
    email: {
        required: {
            message: 'Требуется ввести адрес электронную почту',
        },
        isEmail: {
            message: 'Адрес электронной почты недействителен',
        },
    },
    password: {
        required: {
            message: 'Требуется ввести пароль',
        },
        minLength: {
            message: 'Неверный пароль. Должно быть не меньше 6 символов',
            params: 6,
        },
        maxLength: {
            message: 'Неверный пароль. Должно быть не больше 20 символов',
            params: 20,
        },
        isPassword: {
            message: 'Пароль должен содержать латинские буквы, цифры и нижнее подчеркивание',
        },
    },
    confirmPassword: {
        required: {
            message: 'Требуется подтвердить пароль',
        },
        equals: {
            message: 'Пароли должны совпадать. Попробуйте еще раз',
            params: '',
        },
    },
};
