import * as React from "react";
import cx from 'classnames';

export interface ImageProps {
    alt: string;
    size?: 'small' | 'medium' | 'large' | 'full';
    src: string;
    className?: string;
}

export const Image: React.FunctionComponent<ImageProps> = ({ alt, size = "medium", src, className }): React.ReactElement => {
    const sizeOptions = size === 'small' ? 'w-16' : size === 'medium' ? 'w-64' : '300';
    return <img src={src} alt={alt} className={cx(sizeOptions, className)} />;
};
