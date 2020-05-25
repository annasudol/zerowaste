import * as React from "react";
import { Image, SearchRecipesForm } from '../UElements';

const fridge = require("./../assets/images/svg/technology.svg");

export const SearchRecipesPage: React.FunctionComponent = () => (
    <div className="content overflow-hidden">
        <div className="flex flex-col justify-center items-center md:flex-row-reverse items-center h-screen">
            <div className="mb-8 text-center md:text-left min-h-32">
                <h1 className="font-bebas uppercase text-darkGray mb-3">your spare food</h1>
                <SearchRecipesForm />
            </div>
            <Image src={fridge.default} alt="fridge" size="medium" />
        </div>
    </div>)