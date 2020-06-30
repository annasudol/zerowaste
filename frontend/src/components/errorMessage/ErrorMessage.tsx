import React, { FC, ReactElement } from 'react';

interface ErrorMessageProps {
    message: string
}
export const ErrorMessage: FC <ErrorMessageProps> = ({message}): ReactElement => (
    <div className="flex flex justify-center items-center h-screen">
        <h2 className="font-gotham coral text-5xl text-center pb-4">
            {message}
        </h2>
    </div>
)
