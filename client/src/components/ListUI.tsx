import * as React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface IngredientsListProps {
    list: string[]
    deleteItem(index: number): VoidFunction
}
export const ListUI: React.FunctionComponent<IngredientsListProps> = ({ list, deleteItem }): React.ReactElement => (
    <List>
        {list.map((item, index) => (
            <ListItem key={index.toString()}>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete"
                        onClick={() => deleteItem(index)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List >
);
