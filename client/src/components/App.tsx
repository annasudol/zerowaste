import * as React from "react";
import { Navigation } from "../components";
import { Auth, Main, RecipesList, AddRecipeForm, RecipeDetails } from "../pages";

import { AppRoutes } from '../../routes';
import { Route, Switch } from 'react-router-dom';


export const App: React.FunctionComponent = () => {

    return (
        <>
            <Navigation />
            <Switch>
                <Route path={AppRoutes.Home} component={Main} exact />
                <Route path={AppRoutes.RecipesList} component={RecipesList} />
                <Route path={AppRoutes.Recipe} component={RecipeDetails} />
                <Route path={AppRoutes.LoginSignUp} component={Auth} />
                <Route path={AppRoutes.AddRecipe} component={AddRecipeForm} />
            </Switch>
        </>
    )
}