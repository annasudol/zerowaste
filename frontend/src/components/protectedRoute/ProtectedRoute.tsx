import React, { FC, ReactElement } from 'react';

import {
    RouteProps,
    Redirect,
    RouteComponentProps,
    Route
} from 'react-router-dom'
import { isLoggedIn } from '../../userAuth'
import { AppRoutes } from '../../routes'
    ;

interface Props extends RouteProps {
    allowed?: boolean
    redirectTo: string
    component?: any
    render?: any
};

const ProtectedRoute: FC<Props> = ({
    allowed,
    redirectTo,
    component: Component,
    render,
    children,
    ...rest
}): ReactElement => (
        <Route
            {...rest}
            render={(props: RouteComponentProps) => {
                if (allowed) {
                    if (Component) {
                        return <Component {...props} />;
                    }
                    else if (render) {
                        return render(props);
                    }
                    else {
                        return children;
                    }
                }

                return <Redirect to={redirectTo} />;
            }} />
    )

export const PrivateRoute: FC<RouteProps> = props => (
    <ProtectedRoute {...props} allowed={isLoggedIn()} redirectTo={AppRoutes.SignUp} />
)

export const PublicRoute: FC<RouteProps> = props => (
    <ProtectedRoute {...props} allowed redirectTo={AppRoutes.Home} />
)
