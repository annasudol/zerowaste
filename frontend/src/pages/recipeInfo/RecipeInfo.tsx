import React, { FC, ReactElement, useEffect} from 'react';

import { LoadingBar, ErrorMessage, Image, List } from '../../components';
import { useParams, useHistory, useLocation } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AppRoutes } from '../../routes';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { LocationTypes } from '../../utils/types';
import { Button } from 'antd';


const GET_RECIPE_DETAILS = gql`
  query GetRecipeDetails($id: ID!) {
    recipe(id: $id) {
        title
        servings
        image
        readyInMinutes
        detailedIngredients
        author
        sourceUrl
        instructions
        user{
            name
        }
    }
  }
`;

export const RecipeInfo: FC= (): ReactElement => {
    const { recipeID } = useParams();
    const history = useHistory();
    const location: LocationTypes = useLocation();
    const backPath = location?.state?.backPath;
    const { data, loading, error, refetch } = useQuery(
        GET_RECIPE_DETAILS,
        { variables: { id: recipeID }, }
    );

    useEffect(() => {
        refetch()
    }, [refetch]);


    if (loading) return <LoadingBar />
    if (error) return <ErrorMessage message={`ERROR: ${error.message}`}></ErrorMessage>;
    if (!data) return <ErrorMessage message='Not found'></ErrorMessage>;
    const backRecipes = (): void =>  history.push({ pathname: backPath ? backPath : AppRoutes.RecipesList, state: { callRefetch: true } });
    const { readyInMinutes, title, author, servings, image, detailedIngredients, sourceUrl, user, instructions } = data.recipe;
    const headerInfo = [{ text: 'Ready in: ', value: readyInMinutes }, { text: 'author ', value: author ? author : user?.name }, { text: 'Servings: ', value: servings }]
    return (
        <div className=''>
            <div className='max-w-lg p-4'>
                <button onClick={backRecipes} className='coral-link -ml-3 p-4'><BackspaceIcon /></button>
                <h2 className='font-bebas uppercase text-darkGray mb-0'>{title}</h2>
                {headerInfo.map((item: {text: string, value: number | string}): ReactElement => (
                            <React.Fragment key={item.text}>
                                <p className='font-roboto text-darkGray inline'>{item.text} </p>
                                <p className='font-roboto text-green inline'>{item.value}</p><br></br>
                            </React.Fragment>
                ))}

                <div className='flex flex-col justify-center items-start md:flex-row-reverse md:justify-between'>
                    <Image src={image} alt={`${title}'s image`} size='full' />
                    <div className='md:w-2/3'>
                        <h3 className='font-roboto text-darkGray mb-0 mt-4'>Ingredients:</h3>
                        <List list={detailedIngredients} />
                    </div>
                </div>
                {instructions && (
                    <>
                        <h3 className='font-roboto text-darkGray mb- mt-4'>Instructions:</h3>
                        <p className='font-roboto inline'>{instructions}</p>
                    </>
                )}
                <br></br>
                {sourceUrl && <Button type='primary' ghost href={sourceUrl} >source link</Button>}
            </div>
        </div>
    );
};
