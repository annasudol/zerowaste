import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface ButtonProps {
    onClick?: VoidFunction;
}

export const ButtonUI: React.FunctionComponent<ButtonProps> = ({ onClick, children }) => {

    return (
        <button onClick={onClick} className='bg-transparent hover:bg-green text-green font-semibold hover:text-white py-2 px-4 border border-green hover:border-transparent rounded outline-none'>{children}</button>
    );
}