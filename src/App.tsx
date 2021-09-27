import { FlexBox } from '@vallorisolutions/foa-design-system';
import React from 'react';

const App: React.FC = (): JSX.Element => {
    return (
        <>
            <FlexBox fullScreen verticalAlign="center" horizontalAlign="center" customStyles={{ flexWrap: 'wrap' }}>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <hr />
            </FlexBox>
        </>
    );
};

export default App;
