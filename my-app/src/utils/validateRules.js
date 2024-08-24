export const validateRules = {
    required: (value) => Boolean(value.trim()),
    isEmail: (value) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(value).toLowerCase());
    },
    minLength: (value, params) => value.length >= params,
    maxLength: (value, params) => value.length <= params,
    isPassword: (value) => {
        // const re = /^[\w_]*$/;
        const re = /^[a-zA-Z0-9_]*$/;
        return re.test(String(value).toLowerCase());
    },
    equals: (value, params) => value === params,
};
