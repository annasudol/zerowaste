import * as React from "react";
import { useForm } from "react-hook-form";
import { Button, LoadingBar, ErrorMessage, RecipeItem } from "../components";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query user {
    user {
    name
    email
    recipes {
        id
        title
        image
        ingredients
    }
  }
  }
`;




export const UserInfo: React.FunctionComponent = (): React.ReactElement => {

    const { data, loading, error } = useQuery(
        GET_USER_INFO,
    );
    if (loading) return <LoadingBar />
    if (error) return <ErrorMessage message={`ERROR: ${error.message}`} />;
    console.log(data)


    return (
        <div className="main">

            <div className="ml-2  search-form text-right">
                <h1 className="form-header font-bebas uppercase text-darkGray pb-0 m-0">{`Hello ${data.user.name}`}</h1>
                <p className="font-bebas text-darkGray inline">Email: </p>
                <p className="font-bebas text-lightGreen mb-1 inline">{data.user.email}</p>
            </div>

            <div className="flex-row mt-4 mb-4">
                {data.user.recipes.map(recipe => <RecipeItem id={recipe.id} title={recipe.title} image={recipe.image} ingredients={recipe.ingredients} />)}
            </div>
        </div>
    )

}
