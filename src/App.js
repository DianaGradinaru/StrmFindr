import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {atom, useAtom} from "jotai";
import axios from "axios";
import state from "./stateManager";

import Header from "./components/Header";
import Index from "./components/Index";
import Country from "./components/Country";
import Genre from "./components/Genre";
import About from "./components/About";
import Spinner from "./components/Spinner";

import "./App.css";
import Login from "./components/auth/components/Login";
import Register from "./components/auth/components/Register";
import UserProfile from "./components/profile/UserProfile";


export const userAtom = atom(true)
export const tokenAtom = atom(false)

const App = () => {
    const [keyword] = useAtom(state.currentKeywordAtom);
    const [_cards, setCards] = useAtom(state.cardsAtom);
    const [loading, setLoading] = useAtom(state.loadingAtom);

    useEffect(() => {
        const cardsLoader = async () => {
            let cards = [];

            axios
                .get(process.env.REACT_APP_URL)
                .then((data) => {
                    data.data.forEach((r) => {
                        cards.push({
                            image: r.posterURL,
                            title: r.originalTitle,
                            overview: r.overview.slice(0, 150) + "...",
                            id: r.imdbID,
                            service: r.streamingInfo,
                        });
                    });

                    if (cards.length) {
                        if (keyword) {
                            cards = cards.filter((c) =>
                                c.title.toLowerCase().includes(keyword)
                            );
                        }
                        setCards(cards);
                        setLoading(false);
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        };

        cardsLoader();
    }, [keyword]);

    return (
        <Router>
            <Header />
            {loading && <Spinner />}
            {!loading && (
                <div className="container mt-3">
                    <Switch>
                        <Route path="/country/:country">
                            <Country />
                        </Route>
                        <Route path="/genre/:genre">
                            <Genre />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>

                        <Route path="/register">
                            <Register />
                        </Route>

                        <Route path="/login" exact component={Login} />

                        <Route exact path="/profile">
                            <UserProfile/>
                        </Route>

                        <Route exact path="/">
                            <Index />
                        </Route>
                    </Switch>
                </div>
            )}
        </Router>
    );
};

export default App;
