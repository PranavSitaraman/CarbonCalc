import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { About } from "./routes/About";
import { Home } from "./routes/Home";
import { History} from "./routes/History";
import './App.css';
export const App = () =>
{
    return (
        <Switch>
            <Route path="/about"><About/></Route>
            <Route path="/history"><History/></Route>
            <Route path="/"><Home/></Route>
        </Switch>
    )
};