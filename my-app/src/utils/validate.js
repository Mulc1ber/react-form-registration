import { validateRules } from './validateRules';

export const validate = (data, config) => {
    const errors = {};

    for (const value in data) {
        const rules = config[value];

        for (const rule in rules) {
            const { message, params } = rules[rule];

            const validator = validateRules[rule];

            const hasError = validator && !validator(data[value], params);

            if (hasError) {
                errors[value] = message;
                break;
            }
        }
    }

    return errors;
};
