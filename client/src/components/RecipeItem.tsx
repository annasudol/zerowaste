import './RecipeItem.css';
import { NavLink } from 'react-router-dom';
import * as React from "react";
import { Image } from '../components';


interface PlaylistItemProps {
    id: string
    title: string
    image: string
    ingredients: string[]
}

export const RecipeItem: React.FunctionComponent<PlaylistItemProps> = ({ id, title, image, ingredients }): React.ReactElement => {


    return (
        <NavLink
            key={id}
            className="w-5/12 md:w-1/5 m-1"
            to={`/recipe/${id}`}
        >
            <Image src={image} className="playlists-img" size="full" alt={title} />
        </NavLink>
    );
};
