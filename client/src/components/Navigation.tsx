import * as React from "react";
import cx from 'classnames';
import { AppRoutes } from '../../routes';
import { useHistory } from 'react-router';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import { logoutUser, getAccessToken } from "../utils/userAuth";

export const Navigation: React.FunctionComponent = (): React.ReactElement => {
    const [open, toggleOpen] = React.useState(false);
    const token = React.useMemo(() => getAccessToken(), [getAccessToken])
    const history = useHistory();

    const logout = (): void => {
        logoutUser()
        history.push({ pathname: `${AppRoutes.Home}` })
        // window.location.reload(false)
    }


    const loggedIn = (<>
        <ul>
            <li className="mb-4"><Link to={AppRoutes.Home} className="pt-2 pb-2">Home</Link></li>
            <li className="mb-4"><Link to={AppRoutes.AddRecipe} className="pt-2 pb-2">Add Recipe</Link></li>
            <li className="mb-4"><Link to={AppRoutes.User} className="pt-2 pb-2">Account</Link></li>
        </ul>
    </>);
    const loggedOut = (<ul>
        <li className="mb-4"><Link to={AppRoutes.Home} className="pt-2 pb-2">Home</Link></li>
        <li className="mb-4"><Link to={AppRoutes.Login} className="pt-2 pb-2">Login</Link></li>
        <li className="mb-4"><Link to={AppRoutes.SignUp} className="pt-2 pb-2">Sign up</Link></li>

    </ul>)

    return (
        <>
            {!open && <Button onClick={(): any => toggleOpen(true)} type="primary" icon={<MenuUnfoldOutlined />} size="large" shape="circle" className="nav-btn mb-10 lg:hidden" />}
            <div className={cx(open ? 'opened-nav' : 'closed-nav')}>
                <nav className="nav">
                    <Button onClick={(): any => toggleOpen(false)} type="link" className="outline-none border-none bg-transparent mb-4 p-0 border-0 lg:hidden"><CancelIcon style={{ color: '#fff' }} /></Button>
                    {token ? loggedIn : loggedOut}
                    {token && <Button onClick={logout} type="primary" danger>logout</Button>}

                </nav>
            </div>
        </>
    );
}