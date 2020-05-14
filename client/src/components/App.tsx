import * as React from "react";
import { List } from "../components";



// tslint:disable-next-line: one-variable-per-declaration
export const App: React.FunctionComponent = () => {

    return (<div className="bg-intenseOrang w-screen h-screen overflow-x-hidden">
        <div className="container">
            <List />
        </div>
    </div>)
}