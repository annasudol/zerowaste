const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_URL = "URL"

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({ type: VALIDATOR_TYPE_MINLENGTH, val });

export const VALIDATOR_MIN = (val: number) => ({ type: VALIDATOR_TYPE_MIN, val });
export const VALIDATOR_MAX = (val: number) => ({ type: VALIDATOR_TYPE_MAX, val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_URL = () => ({ type: VALIDATOR_TYPE_URL });




export const validate = (value: string | number, validators: any): boolean | undefined => {
    let isValid;
    const validator = validators[0];
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
        isValid = typeof value === "string" ? value.trim().length > 0 : false
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {

        isValid = typeof value === "string" ? value.trim().length >= validator.val : undefined
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
        isValid = +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
        isValid = +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
        isValid = typeof value === "string" ? /^\S+@\S+\.\S+$/.test(value) : undefined
    }

    if (validator.type === VALIDATOR_TYPE_URL) {
        isValid = typeof value === "string" ? /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(value) : undefined
    }

    return isValid;
};
