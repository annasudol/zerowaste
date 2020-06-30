import React, { FC, ReactElement } from 'react';
import { Navigation, PublicRoute, PrivateRoute, ErrorMessage } from '../../components';
import { Login, SignUp, Home, RecipesList, AddRecipeForm, RecipeInfo, UserInfo, EditRecipeForm } from '../../pages';
import { AppRoutes } from '../../routes'
;
import { Route, Switch } from 'react-router-dom';


export const App: FC = (): ReactElement => (
        <>
        <div className="left"></div>
        <div className="right"></div>
            <Navigation />
            <Switch>
                <Route exact path={AppRoutes.Home} component={Home} />
                <PublicRoute path={AppRoutes.Login} component={Login} />
                <PublicRoute path={AppRoutes.SignUp} component={SignUp} />
                <PublicRoute path={AppRoutes.RecipesList} component={RecipesList} />
                <PublicRoute path={AppRoutes.Recipe} component={RecipeInfo} />
                <PrivateRoute path={AppRoutes.AddRecipe} component={AddRecipeForm} />
                <PrivateRoute path={AppRoutes.EditRecipe} component={EditRecipeForm} />
                <PrivateRoute path={AppRoutes.User} component={UserInfo} />
                <Route component={ErrorMessage} />
            </Switch>
        </>
    )
