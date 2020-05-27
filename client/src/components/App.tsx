import * as React from "react";
import { Navigation } from "../components";
import { Auth, Main, RecipesList, AddRecipeForm, RecipeDetails, UserInfo } from "../pages";

import { AppRoutes } from '../../routes';
import { Route, Switch } from 'react-router-dom';


export const App: React.FunctionComponent = () => {
    const token = window.localStorage.getItem('token');
    console.log(token)

    return (
        <>
            <Navigation />
            <Switch>
                <Route path={AppRoutes.Home} component={Main} exact />
                <Route path={AppRoutes.RecipesList} component={RecipesList} />
                <Route path={AppRoutes.Recipe} component={RecipeDetails} />
                {!token ? <Route path={AppRoutes.LoginSignUp} component={Auth} /> : (
                    <>
                        <Route path={AppRoutes.User} component={UserInfo} />
                        <Route path={AppRoutes.AddRecipe} component={AddRecipeForm} />
                    </>
                )}
            </Switch>
        </>
    )
}