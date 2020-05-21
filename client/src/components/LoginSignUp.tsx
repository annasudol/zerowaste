import * as React from "react";
// import cx from 'classNamenames';
import './LoginSignUp.css'
import { useForm } from "react-hook-form";
import { ButtonUI } from ".";

type Inputs = {
    example: string,
    exampleRequired: string,
};



export const LoginSignUp: React.FunctionComponent = (): React.ReactElement => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const [loginPage, setLoginPage] = React.useState(false);

    const toggleSetLoginPage = (): void => {
        setLoginPage(!loginPage);
    }
    const submitLogin = data => console.log(data, "daras");

    const submitSignUp = data => console.log(data, "daras");

    // console.log(watch("example")) // watch input value by passing the name of it
    const login = (
        <form onSubmit={handleSubmit(submitLogin)}>
            <input name="email" placeholder="Email" defaultValue="test" ref={register} />
            <input name="password" placeholder="Password" ref={register({ required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0" />
        </form>
    );
    const signUp = (
        <form onSubmit={handleSubmit(submitSignUp)}>
            <input name="firstName" placeholder="First Name" ref={register({ required: true, maxLength: 30 })} />
            <input name="lastName" placeholder="Last Name" ref={register({ required: true, maxLength: 30 })} />
            <input
                name="email"
                placeholder="Email"
                type="email"
                ref={register({
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                    }
                })}
            />
            <input name="password" type="password" placeholder="Set a password" ref={register({ required: true })} />

            <input type="submit" title="Submit" className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded outline-none m-1 border-0" />
        </form>
    );
    console.log(errors, 'err')
    return (
        <div className="content overflow-hidden flex justify-center items-center">

            <div className="form  flex flex-col">
                <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">{loginPage ? 'Log in' : 'Create an account'}</h1>
                <p className="font-roboto text-center mb-4">{!loginPage ? 'Already have an account?' : "Don't have an account?"}</p>
                <ButtonUI onClick={toggleSetLoginPage} color="coral" className="mb-4">{!loginPage ? 'Log in to your account' : 'Set up an account'}</ButtonUI>

                {loginPage ? login : signUp}

            </div>
        </div>)

}
