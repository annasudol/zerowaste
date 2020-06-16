import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ErrorMessage } from "../components";
import { Button } from 'antd';

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
        id
    }
  }
`;

const DELETE_RECIPE_SUBSCRIPTION = gql`
 subscription deleteRecipe {
  deleteRecipe {
    user {
      name
      email
      recipes{
        title
        id
        image
        ingredients
      }
    }
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
    title: string
}
export const DialogDeleteRecipe: React.FC<DialogDeleteRecipeProps> = ({ open, toggleOpen, recipeId, title }): React.ReactElement => {
    const [deleteRecipe, { error }] = useMutation(DELETE_RECIPE);
    useSubscription(DELETE_RECIPE_SUBSCRIPTION);

    const handleDeleteRecipe = () => {
        deleteRecipe({ variables: { id: recipeId } });
        toggleOpen(false);
    }

    if (error) {
        return (<ErrorMessage message={error.message} />)
    }
    const alert = `Are you sure do you want to delete ${title} recipe`

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={(): void => toggleOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{alert}</DialogTitle>
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