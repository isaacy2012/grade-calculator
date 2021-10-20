import React from 'react';
import styled, {ThemeProvider} from 'styled-components'
import '../css/App.css';
import {
    BrowserRouter
} from "react-router-dom";
import {theme} from '../theme/Theme';
import MainScreen from "./MainScreen";


const Signature = styled.p`
  position: absolute;
  right: 25px;
  bottom: 5px;
`

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <MainScreen/>
                </BrowserRouter>
                <Signature>Made by <a href="https://isaacy.dev">Isaac Young</a></Signature>
            </ThemeProvider>
        </div>
    );
}

export default App;
