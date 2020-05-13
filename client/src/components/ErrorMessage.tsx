import * as React from "react";

interface ErrorMessageProps {
    message?: string;
}
export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ message }): React.ReactElement => (
    <div className="flex flex justify-center items-center h-screen">
        <h2 className="font-albaSuper text-orange-500 text-5xl text-center pb-4">
            {message || 'Ups, error, something went wrong'}
        </h2>
    </div>
);
