import * as React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';
import cx from 'classnames';

export interface ButtonProps {
    href?: string
    onClick?: VoidFunction
    color?: 'green' | 'coral' | 'gray' | 'red'
    text?: 'white' | 'green' | 'coral' | 'gray'
    type?: 'cancel' | 'normal'
    to?: string
    className?: string;
}

export const ButtonUI: React.FunctionComponent<ButtonProps> = ({ href, className, onClick, children, color = 'green', type = 'normal', to }) => {
    if (href) {
        return (
            <a href={href} className={cx(className, 'w-xs block no-underline text-coral mb-4 mt-4')} target='_blank'>
                {children}
            </a>
        );
    }

    if (to) {
        return (
            <Link
                className={`w-xs block no-underline text-coral mb-4 mt-4`}
                to={to}
            >{children}
            </Link>
        )
    }

    if (type === 'cancel') {
        return (
            <button onClick={onClick} className="outline-none border-none bg-transparent m-0 p-0 border-0"><CancelIcon style={{ color: '#F25757' }} /></button>
        )
    }

    return (
        <button onClick={onClick} className={`bg-${color} hover:bg-${color} text-white font-bold py-2 px-4 rounded outline-none m-1 border-0`}>
            {children}
        </button>
    );
}