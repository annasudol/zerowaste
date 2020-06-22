import React, { FC, ReactElement } from 'react';
import cx from 'classnames';

export interface ImageProps {
    alt: string;
    size?: 'small' | 'medium' | 'large' | 'full';
    src: string;
    className?: string;
}

export const Image: FC <ImageProps> = ({alt, size = 'medium', src, className}): ReactElement => {
    const sizeOptions = size === 'small' ? 'w-32' : size === 'medium' ? 'w-64': size === 'full'?  'w-1/2 lg:w-1/3' : '300';
    return <img src={src} alt={alt} className={cx(sizeOptions, className)} />;
};
