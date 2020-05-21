import * as React from "react";
import { Image, ButtonUI } from '../components';


interface RecipeItemProps {
    id: string
    title: string
    image: string
    ingredients: string[]
}

export const RecipeItem: React.FunctionComponent<RecipeItemProps> = ({ id, title, image, ingredients }): React.ReactElement => {
    return (
        <div className="flex bg-milk bo mb-4 mr-4 max-w-sm lg:max-w-xl mb-3 list--item" key={id}>
            <div className="w-42"><Image src={image} className="rounded-m m-4" size="small" alt={title} /></div>
            <div className="mt-4 mb-4">
                <h3 className="font-bebas text-lightGreen mb-1">{title}</h3>
                <span className="font-roboto uppercase text-xs font-semibold text-darkGray">ingredients: </span>
                <span className='font-roboto text-xs'>{ingredients.join(', ')}</span>
                <ButtonUI to={`/recipe/${id}`}>see more</ButtonUI>
            </div>
        </div>
    );
};
