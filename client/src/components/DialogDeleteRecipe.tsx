import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ErrorMessage } from "../components";
import { Button } from 'antd';
import { ExecutionResult } from "graphql";

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
        id
    }
  }
`;

// tslint:disable-next-line: no-shadowed-variable
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<unknown, string> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
interface DialogDeleteRecipeProps {
    open: boolean
    toggleOpen(val: boolean): void
    recipeId: string
}
export const DialogDeleteRecipe: React.FunctionComponent<DialogDeleteRecipeProps> = ({ open, toggleOpen, recipeId }): React.ReactElement => {
    const [deleteRecipe, { data, error }] = useMutation(DELETE_RECIPE);

    const handleDeleteRecipe = (): Promise<ExecutionResult<unknown>> => deleteRecipe({ variables: { id: recipeId } })

    if (error) {
        return (<ErrorMessage message={error.message} />)
    }
    // React.useEffect(() => data && window.location.reload(false), [data])

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={(): void => toggleOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {!data && <DialogTitle id="alert-dialog-slide-title">Are you sure do you want to delete recipe</DialogTitle>}
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    The recipe will be deleted immediately. You can&apos;t undo this action
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(): void => toggleOpen(false)}>
                    Keep the recipe
                </Button>

                <Button onClick={handleDeleteRecipe} type="default" danger>
                    Delete recipe
                </Button>
            </DialogActions>
        </Dialog>
    );
}