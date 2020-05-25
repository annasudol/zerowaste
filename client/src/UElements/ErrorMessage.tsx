import * as React from "react";


interface ErrorMessageProps {
    message?: string
    validationMessage?: string

}
export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ message, validationMessage }): React.ReactElement => {
    if (validationMessage) {
        return (
            <p className="text-coral text-xs mt-2">{validationMessage}</p>
        )
    }
    return (
        <div className="flex flex justify-center items-center h-screen">
            <h2 className="font-gotham coral text-5xl text-center pb-4">
                {message || 'Ups, error, something went wrong'}
            </h2>
        </div>
    )
}