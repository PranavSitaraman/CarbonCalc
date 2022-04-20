export {};
chrome.runtime.onInstalled.addListener((details) =>
{
    console.log('[background.js] onInstalled', details);
    chrome.storage.sync.set({key: "0"});
    alert('[background.js] onInstalled');
    return true;
});
chrome.runtime.onConnect.addListener((port) =>
{
    console.log('[background.js] onConnect', port);
    alert('[background.js] onInstalled');
    return true;
});
chrome.runtime.onStartup.addListener(() =>
{
    console.log('[background.js] onStartup');
    alert('[background.js] onInstalled');
    return true;
});
chrome.runtime.onSuspend.addListener(() =>
{
    console.log('[background.js] onSuspend');
    alert('[background.js] onSuspend');
    return true;
});