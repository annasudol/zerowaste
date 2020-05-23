import * as React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface IngredientsListProps {
    ingredients: string[]
    deleteIngredient(index: number): VoidFunction
}
export const DetailedIngredientsList: React.FunctionComponent<IngredientsListProps> = ({ ingredients, deleteIngredient }): React.ReactElement => (
    <List>
        {ingredients.map((todo, index) => (
            <ListItem key={index.toString()} dense button>
                <ListItemText primary={todo} />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete"
                        onClick={() => {
                            deleteIngredient(index);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List>
);
