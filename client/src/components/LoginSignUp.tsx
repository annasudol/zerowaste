import * as React from "react";
// import cx from 'classNamenames';
import './LoginSignUp.css'
import { ButtonUI } from "../components";


export const LoginSignUp: React.FunctionComponent = (): React.ReactElement => {

    // const handleSubmit = (event): void => {
    //     // alert('Podano następujące imię: ' + value);
    //     event.preventDefault();
    // }
    // tslint:disable-next-line: no-unused-expression

    return (
        <div className="flex flex-row justify-center align-middle items-center">
            <div className="form w-50 h-48 bg-red">
                <div className='tab-group flex'>
                    <ButtonUI>Sign Up</ButtonUI>
                    <ButtonUI>log In</ButtonUI>
                </div>
            </div>
        </div>
    )
}

// <form onSubmit={handleSubmit}>
// <label> Imię:
// <input type="text" value={value} onChange={handleChange} />
// </label>
// <input type="submit" value="Wyślij" />
// </form>