import * as React from "react";
import { Link } from 'react-router-dom';
import cx from 'classnames';

export interface ButtonProps {
    href?: string
    onClick?: VoidFunction
    color?: 'green' | 'coral' | 'gray' | 'red'
    to?: string
    className?: string;
}

export const ButtonUI: React.FunctionComponent<ButtonProps> = ({ href, className, onClick, children, color = 'green', to }) => {
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
                className={`w-xs block no-underline text-white mb-4 mt-4`}
                to={to}
            >{children}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={`bg-${color} hover:bg-${color} text-white font-bold py-2 px-4 rounded outline-none m-1 border-0`}>
            {children}
        </button>
    );
}