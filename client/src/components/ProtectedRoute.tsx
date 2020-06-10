import * as React from "react";
import {
    RouteProps,
    Redirect,
    RouteComponentProps,
    Route
} from 'react-router-dom'
import { isLoggedIn } from '../userAuth'

interface Props extends RouteProps {
    allowed: boolean
    redirectTo: string
    component: any
    render: any
}

const ProtectedRoute: React.FunctionComponent<Props> = ({
    allowed,
    redirectTo,
    component: Component,
    render,
    children,
    ...rest
}) => (
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

export const PrivateRoute: React.FunctionComponent<RouteProps> = props => (
    <ProtectedRoute {...props} allowed={isLoggedIn()} redirectTo='/login' />
)

export const PublicRoute: React.FunctionComponent<RouteProps> = props => (
    <ProtectedRoute {...props} allowed={!isLoggedIn()} redirectTo='/home' />
)
