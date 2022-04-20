import { ChromeMessage, Sender } from "../types";
import process from 'process';
import { totalmem } from "os";
const KWG_PER_GB = 1.805;
const RETURNING_VISITOR_PERCENTAGE = 0.75;
const FIRST_TIME_VIEWING_PERCENTAGE = 0.25;
const PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;
const CARBON_PER_KWG_GRID = 475;
const CARBON_PER_KWG_RENEWABLE = 33.4;
const PERCENTAGE_OF_ENERGY_IN_DATACENTER = 0.1008;
const PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER = 0.8992;
const CO2_GRAMS_TO_LITRES = 0.5562;
var bytes = encodeURI(window.document.documentElement.innerHTML).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
var bytesAdjusted = adjustDataTransfer(bytes);
var energy = energyConsumption(bytesAdjusted);
var co2Grid = getCo2Grid(energy);
var co2Renewable = getCo2Renewable(energy);
var statistics = [bytesAdjusted, energy, [[co2Grid, co2ToLitres(co2Grid)], [co2Renewable, co2ToLitres(co2Renewable)]]];
var co2 = statistics[2][0][0]; 
var total;
chrome.storage.sync.get(['key'], function (result) {result.key = (parseFloat(result.key) + co2).toString();});
function adjustDataTransfer(val)
{
  return (val * RETURNING_VISITOR_PERCENTAGE) + (PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD * val * FIRST_TIME_VIEWING_PERCENTAGE);
}
function energyConsumption(bytes)
{
  return bytes * (KWG_PER_GB / 1073741824);
}
function getCo2Grid(energy)
{
    return energy * CARBON_PER_KWG_GRID;
}
function getCo2Renewable(energy)
{
    return ((energy * PERCENTAGE_OF_ENERGY_IN_DATACENTER) * CARBON_PER_KWG_RENEWABLE) + ((energy * PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER) * CARBON_PER_KWG_GRID);
}
function co2ToLitres(co2)
{
    return co2 * CO2_GRAMS_TO_LITRES;
}
const messagesFromReactAppListener = (message: ChromeMessage, sender, response) =>
{
    console.log('[content.js]. Message received', { message, sender, })
    if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "Home")
    {
        response('Carbon Footprint: ' + Math.round(co2 * 1000 * 100)/100 + ' milligrams');
    }
    else if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "one")
    {
        response('Page Size: ' + Math.round(bytes/1000 * 100)/100 + ' kB');
    }
    else if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "two")
    {
        response('Adjusted Page Size: ' + Math.round(bytesAdjusted/1000 * 100)/100 + ' kB');
    }
    else if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "three")
    {
        response('Energy: ' + Math.round(energy * 1000 * 100)/100 + ' Wh');
    }
    else if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "four")
    {
        response('CO2 through Grid: ' + Math.round(co2Grid * 1000 * 100)/100 + ' milligrams or ' + Math.round(co2ToLitres(co2Grid) * 1000 * 100)/100 + ' milliliters');
    }
    else if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "five")
    {
        response('CO2 through Renewable: ' + Math.round(co2Renewable * 1000 * 100)/100 + ' milligrams or ' + Math.round(co2ToLitres(co2Renewable) * 1000 * 100)/100 + ' milliliters');
    }
    else if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === "return co2")
    {
        response(total.toString());
    }
}
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);