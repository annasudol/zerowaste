import * as React from "react";
import { SearchRecipesPage, RecipesList, RecipeDetails, Navigation, Auth, RecipeForm } from "../components";
import { AppRoutes } from '../../routes';
import { Route, Switch } from 'react-router-dom';


export const App: React.FunctionComponent = () => {

    return (
        <>
            <Navigation />
            <Switch>
                <Route path={AppRoutes.Home} component={SearchRecipesPage} exact />
                <Route path={AppRoutes.RecipesList} component={RecipesList} />
                <Route path={AppRoutes.Recipe} component={RecipeDetails} />
                <Route path={AppRoutes.LoginSignUp} component={Auth} />
                <Route path={AppRoutes.AddRecipe} component={RecipeForm} />
            </Switch>
        </>
    )
}