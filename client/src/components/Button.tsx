import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

export interface ButtonProps {
    outlined?: boolean
    size: "small" | "medium" | "large"
    onClick?: VoidFunction;
    color?: "primary" | "secondary"
}

export const ButtonUI: React.FunctionComponent<ButtonProps> = ({ outlined, size, color = "primary", onClick, children, ...props }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant={outlined === true ? "outlined" : undefined} color={color} size={size} onClick={onClick}>{children}</Button>
        </div>
    );
}