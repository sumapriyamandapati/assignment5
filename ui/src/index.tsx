import React from "react";
import ReactDOM from "react-dom";
import './index.scss';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import {HashRouter, Outlet} from "react-router-dom";
import {Navbar} from "./Navbar";

const client = new ApolloClient({
    uri: process.env.API_SERVER,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <HashRouter>
                <Navbar />
                <Outlet />
            </HashRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("app")
);
