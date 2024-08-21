import React from 'react';
import { Registration } from './Registration';
import { NewRegistration } from './NewRegistration';
import { Reg } from './components/Reg';

export const App = () => {
    return (
        <div>
            <Registration />
            <NewRegistration />
            <Reg />
        </div>
    );
};
