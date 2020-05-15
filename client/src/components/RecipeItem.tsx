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
        <div className="bg-milk bo mb-4 max-w-sm mb-3" key={id}>
            <Image src={image} className="rounded-m m-4" size="small" alt={title} />
            <div>
                <h3 className="font-bebas text-lightGreen mb-1">{title}</h3>
                <span className="font-roboto uppercase text-xs font-semibold text-darkGray">ingredients: </span>
                <span className='font-roboto text-xs'>{ingredients.join(', ')}</span>
                <ButtonUI to={`/recipe/${id}`}>see more</ButtonUI>
            </div>
        </div>
    );
};
