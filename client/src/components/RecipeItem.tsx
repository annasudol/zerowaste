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
        <div className="flex bg-milk rounded-lg mb-4 max-w-sm" key={id}>
            <Image src={image} className="playlists-img" size="medium" alt={title} />
            <div><h3 className="font-gotham text-coral mb-1">{title}</h3>
                <span className="font-gotham uppercase text-xs font-semibold">ingredients: </span>
                <span className='text-midgray font-gotham text-xs'>{ingredients.join(', ')}</span>
                <ButtonUI to={`/recipe/${id}`}>see more</ButtonUI>
            </div>
        </div>
    );
};
