import React, { useEffect, useState } from 'react';
import logo from '.././logo.svg';
import { ChromeMessage, Sender } from ".././types";
import { useHistory } from "react-router-dom";
import '.././App.css';
export const Home = () =>
{
    let {push} = useHistory();
    const [url, setUrl] = useState<string>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');
    useEffect(() =>
    {
        const queryInfo = {active: true, lastFocusedWindow: true};
        chrome.tabs && chrome.tabs.query(queryInfo, tabs => { const url = tabs[0].url || ''; setUrl(url); });
    }, []);
    const sendTestMessage = () =>
    {
        const message: ChromeMessage = { from: Sender.React, message: "Home", };
        const queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs =>
            {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId!, message, (response) => { setResponseFromContent(response); });
        });
    };
    sendTestMessage();
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p id="url">{url}</p>
                <p id="response">{responseFromContent}</p>
                <button onClick={() => {push('/about')}}>More Stats</button>
            </header>
        </div>
    );
};