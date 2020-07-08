import React, { FC, ReactElement } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'antd';
import { handlePhotoDelete } from '../../utils/handlePhotoDelete';

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
        id
    }
  }
`;




interface DialogDeleteRecipeProps {
    open: boolean
    toggleOpen(val: boolean): void
    recipeId: string
    title: string
    image: string
}

export const DialogDeleteRecipe: FC <DialogDeleteRecipeProps> = ({open, toggleOpen, recipeId, title, image}): ReactElement => {
    const [deleteRecipe] = useMutation(DELETE_RECIPE, {
        onError(err) {
          console.log(err);
        },
    });

    const handleDeleteRecipe = () => {
        handlePhotoDelete(image)
        deleteRecipe({variables: {id: recipeId } });
        toggleOpen(false);
    }


    return (
        <Dialog
            open={open}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{`Are you sure do you want to delete ${title} recipe`}</DialogTitle>
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