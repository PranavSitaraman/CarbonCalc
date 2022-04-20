import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from ".././types";
import '.././App.css';
import process from 'process';
export const History = () =>
{
    let {push} = useHistory();
    const [totalrep, responseTotal] = useState<string>('');
    const findTotal = () =>
    {
        const message: ChromeMessage = { from: Sender.React, message: "return co2" };
        const queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true };
        chrome.tabs && chrome.tabs.query(queryInfo, tabs =>
            {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId!, message, (response) => { responseTotal(response); });
        });
    };
    var newco2;
    chrome.storage.sync.get(['key'], function (result) {newco2 = parseFloat(result.key);});
    var a = 'Lifetime Emissions: ' + Math.round(newco2 * 1000 * 100)/100 + ' milligrams';
    return (
        <div className="App">
            <header className="App-header">
                <p>{a}</p>
                <button id ="home" onClick={() => { push('/') }}>Home</button>
            </header>
        </div>
    )
}
