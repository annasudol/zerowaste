import * as React from "react";
import { Navigation } from "../components";
import { Login, SignUp, Main, RecipesList, AddRecipeForm, RecipeInfo, UserInfo } from "../pages";

import { AppRoutes } from '../../routes';
import { Route, Switch } from 'react-router-dom';
import { ErrorMessage } from './ErrorMessage';


export const App: React.FunctionComponent = () => {
    const token = window.localStorage.getItem('token');

    return (
        <>
            <Navigation token={token} />
            <Switch>
                <Route path={AppRoutes.Home} component={Main} exact />
                <Route path={AppRoutes.RecipesList} component={RecipesList} />
                <Route path={AppRoutes.Recipe} component={RecipeInfo} />

                {!token ? (
                    <>
                        <Route path={AppRoutes.Login} component={Login} />
                        <Route path={AppRoutes.SignUp} component={SignUp} />
                    </>
                ) : (
                        <>
                            <Route path={AppRoutes.User} component={UserInfo} />
                            <Route path={AppRoutes.AddRecipe} component={AddRecipeForm} />
                        </>
                    )}
                <Route path="*">
                    <ErrorMessage message="page not found" />
                </Route>
            </Switch>
        </>
    )
}