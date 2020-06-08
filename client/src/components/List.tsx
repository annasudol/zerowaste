import * as React from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface IngredientsListProps {
    list: string[] | []
    deleteItem?(item: string): VoidFunction
}
export const List: React.FunctionComponent<IngredientsListProps> = ({ list = [], deleteItem }): React.ReactElement => (
    <ol>
        {list.map((item, index) => (
            <li key={index.toString()} className="ml-6">
                <div className="w-full flex justify-between">
                    <span className="mt-4">{item}</span>
                    {deleteItem && <IconButton
                        aria-label="Delete"
                        onClick={() => deleteItem(item)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>}</div>
            </li>
        ))}
    </ol>
);
