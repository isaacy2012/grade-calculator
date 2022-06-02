import React from 'react';
import styled, {ThemeProvider} from 'styled-components'
import '../css/App.css';
import {
    BrowserRouter
} from "react-router-dom";
import {theme} from '../theme/Theme';
import MainScreen from "./MainScreen";
import {GITHUB_NEW_ISSUE_URL} from "../Constants";


const FooterChild = styled.p`
  position: absolute;
  bottom: 5px;
`
const LeftFooterChild = styled(FooterChild)`
  left: 25px;
`

const RightFooterChild = styled(FooterChild)`
  text-align: right;
  right: 25px;
`

const Footer = styled.footer`
    height: 80px;
`

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <MainScreen/>
                </BrowserRouter>
                <Footer>
                    <LeftFooterChild>
                        <a
                            rel="noreferrer" target="_blank"
                            href={GITHUB_NEW_ISSUE_URL}>Report an Issue</a>
                    </LeftFooterChild>
                <RightFooterChild>Made by <a href="https://isaacy.dev">Isaac Young</a></RightFooterChild>
                </Footer>
            </ThemeProvider>
        </div>
    );
}

export default App;
