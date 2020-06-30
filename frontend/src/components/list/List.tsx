import React, { FC, ReactElement } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface IngredientsListProps {
    list: string[]
    deleteItem?(item: string): void
}
export const List: FC<IngredientsListProps> = ({ list, deleteItem }): ReactElement => (
    <ol>
        {list?.map((item) => (
            <li key={item} className='ml-6'>
                <div className='w-full flex justify-between'>
                    <span className='mt-1'>{item}</span>
                    {deleteItem && <IconButton
                        aria-label='Delete'
                        onClick={() => deleteItem(item)}>
                        <DeleteIcon fontSize='small' />
                    </IconButton>}</div>
            </li>
        ))}
    </ol>
);
