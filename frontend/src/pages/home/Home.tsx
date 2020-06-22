import React, { FC, ReactElement } from 'react';
import { Image, SearchRecipesForm } from '../../components';
const fridge = require('./../../assets/images/svg/technology.svg');

export const Home: FC = (): ReactElement => (
            <>
                <div className='flex flex-col justify-center items-center md:flex-row-reverse items-center h-screen'>
                    <div className='mb-8 text-center md:w-1/3 lg:w-1/4 md:text-left'>
                        <h1 className='font-bebas uppercase text-darkGray mb-3'>your spare food</h1>
                        <SearchRecipesForm />
                    </div>
                    <Image src={fridge} alt='fridge' size='medium' />
                </div>
            </>
       )