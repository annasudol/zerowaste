import React, { FunctionComponent, ReactElement } from 'react';
import cx from 'classnames';

export interface ImageProps {
    alt: string;
    size: 'small' | 'medium' | 'large' | 'full';
    src: string;
    className?: string;
}

export const Image: FunctionComponent<ImageProps> = ({ alt, size, src, className }): ReactElement => {
    const sizeOptions = size === 'small' ? 'w-16' : size === 'medium' ? 'w-40' : 'w-64';
    return <img src={src} alt={alt} className={cx(sizeOptions, className)} />;
};
