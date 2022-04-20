import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from ".././types";
import '.././App.css';
export const About = () =>
{
    let {push} = useHistory();
    const [responseContentOne, setResponseFromContentOne] = useState<string>('');
    const [responseContentTwo, setResponseFromContentTwo] = useState<string>('');
    const [responseContentThree, setResponseFromContentThree] = useState<string>('');
    const [responseContentFour, setResponseFromContentFour] = useState<string>('');
    const [responseContentFive, setResponseFromContentFive] = useState<string>('');
    const sendone = () =>
    {
        const message: ChromeMessage = { from: Sender.React, message: "one", };
        const queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs =>
            {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId!, message, (response) => { setResponseFromContentOne(response); });
        });
    };
    const sendtwo = () =>
    {
        const message: ChromeMessage = { from: Sender.React, message: "two", };
        const queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs =>
            {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId!, message, (response) => { setResponseFromContentTwo(response); });
        });
    };
    const sendthree = () =>
    {
        const message: ChromeMessage = { from: Sender.React, message: "three", };
        const queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs =>
            {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId!, message, (response) => { setResponseFromContentThree(response); });
        });
    };
    const sendfour = () =>
    {
        const message: ChromeMessage = { from: Sender.React, message: "four", };
        const queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs =>
            {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId!, message, (response) => { setResponseFromContentFour(response); });
        });
    };
    const sendfive = () =>
    {
        const message: ChromeMessage = { from: Sender.React, message: "five", };
        const queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs =>
            {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId!, message, (response) => { setResponseFromContentFive(response); });
        });
    };
    sendone();
    sendtwo();
    sendthree();
    sendfour();
    sendfive();
    return (
        <div className="App">
            <header className="App-header">
                <p>{responseContentOne}</p>
                <p>{responseContentTwo}</p>
                <p>{responseContentThree}</p>
                <p id = "bad">{responseContentFour}</p>
                <p id = "good">{responseContentFive}</p>
                <button id ="home" onClick={() => { push('/history') }}>History</button>
            </header>
        </div>
    )
}
