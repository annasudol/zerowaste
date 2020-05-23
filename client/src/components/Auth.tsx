import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../UElements";

type Inputs = {
    example: string,
    exampleRequired: string,
};



export const Auth: React.FunctionComponent = (): React.ReactElement => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const [loginPage, setLoginPage] = React.useState(false);

    const toggleSetLoginPage = (): void => {
        setLoginPage(!loginPage);
    }

    const submit = data => console.log(data, "data");

    return (
        <div className="content overflow-hidden flex justify-center items-center">

            <div className="form  flex flex-col">
                <h1 className="form-header font-bebas uppercase text-darkGray text-center pb-0 m-0">{loginPage ? 'Log in' : 'Create an account'}</h1>
                <p className="font-roboto text-center mb-4">{!loginPage ? 'Already have an account?' : "Don't have an account?"}</p>
                <Button onClick={toggleSetLoginPage} color="coral" className="mb-4">{!loginPage ? 'Switch to Log in' : 'Switch to Sign in'}</Button>
                <form onSubmit={handleSubmit(submit)}>
                    {!loginPage && <input name="username" type="text" placeholder="User Name" ref={register({ required: true, maxLength: 30 })} />}
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
            </div>
        </div>)

}
