import * as React from 'react';
import {
    isLogged,
    getAccessToken,
    isLoggedIn,
    rememberLogin as RememberLogin,
    logoutUser as LogoutUser,
} from "../userAuth";

type Context = {
    token: string | null;
    rememberLogin(newToken: string): void;

} & Record<string, any>;

const Context = React.createContext<Context>({} as any);

export const AuthProvider: React.FC = (props) => {
    const [token, setToken] = React.useState<string | null>(getAccessToken());

    const userLogged = isLoggedIn();

    const rememberLogin = React.useCallback((newToken: string) => {
        RememberLogin(newToken)
        setToken(newToken);
    }, []);

    const logoutUser = React.useCallback(() => {
        LogoutUser();
        setToken(null);
    }, []);

    return (
        <Context.Provider
            value={{
                token,
                rememberLogin,
                getAccessToken,
                logoutUser,
                userLogged
            }}
            {...props}
        />
    )
}

export const useAuth = () => React.useContext(Context);