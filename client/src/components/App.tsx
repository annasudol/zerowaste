import * as React from "react";
import { Navigation } from "../components";
import { Login, SignUp, Main, RecipesList, AddRecipeForm, RecipeInfo, UserInfo, EditRecipeForm } from "../pages";
import { AppRoutes } from '../../routes';
import { Route, Switch } from 'react-router-dom';
import { ErrorMessage } from './ErrorMessage';
import { getAccessToken } from "../utils/userAuth";
import { AlertNewUser } from "./AlertNewUser";


export const App: React.FunctionComponent = () => {
    const token = getAccessToken()
    return (
        <>
            <Navigation />
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
                            <Route path={AppRoutes.EditRecipe} component={EditRecipeForm} />
                        </>
                    )}
                <Route path="*">
                    <ErrorMessage message="page not found" />
                </Route>
            </Switch>
        </>
    )
}