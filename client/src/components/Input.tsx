import * as React from "react";
import { validate } from '../utils/validators';
import { ErrorMessage } from "../components";

interface ReducerInputState {
    value: number | string
    isValid: boolean | undefined
}

type Action = { type: 'CHANGE', val: string, validators: any }

const inputReducer = (state: ReducerInputState, action: Action): any => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        default:
            return state;
    }
};

interface InputProps {
    onInput?: any
    id: string
    placeholder?: string
    type: 'number' | 'text' | 'textarea'
    initialValue: string | number
    validation: boolean
    validators?: any
    label?: string
    errorText?: string
}

export const Input: React.FunctionComponent<InputProps> = ({ id, placeholder, type, initialValue, onInput, label, errorText, validators, validation }): React.ReactElement => {
    const [inputState, dispatch] = React.useReducer(inputReducer, {
        value: initialValue,
        isValid: undefined
    });

    const { value, isValid } = inputState;
    React.useEffect(() => {
        // onInput(value);
        // if (isValid === true) {
        //     return onInput(value);
        // }
        if (!validation) {
            dispatch({
                type: 'CHANGE',
                val: value,
                validators
            });
        }
    }, [value, onInput, validation, isValid]);

    const changeHandler = (event: any) => {
        const inputValue = event.target.value
        dispatch({
            type: 'CHANGE',
            val: inputValue,
            validators
        });

        return isValid && onInput(value);

    };

    const element =
        type === 'textarea' ? (
            <textarea
                id={id}
                rows={3}
                onChange={changeHandler}
                value={value}
            />
        ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    onChange={changeHandler}
                    value={value}
                />
            )


    return (
        <div className={`form-control ${!isValid && errorText && 'form-control--invalid'}`}>
            {!isValid && errorText && <ErrorMessage validationMessage={errorText} />}
            <label htmlFor={id} className="text-sm text-lightGreen uppercase">{label}</label>
            {element}
        </div>
    )
};
