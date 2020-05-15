import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export const LoadingBar: React.FunctionComponent = (): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className="flex flex justify-center items-center h-screen">
            <div className={classes.root}><CircularProgress color="secondary" /></div>
        </div>
    )
}
