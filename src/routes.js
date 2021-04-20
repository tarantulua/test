import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import MyCart from "./Components/MyCart/MyCart";


export const useRoutes = isAuthenticated =>{

    if(isAuthenticated){
        return (
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/item/:id">
                        <Product/>
                    </Route>
                    <Route path="/cart">
                        <MyCart />
                    </Route>
                    {/*<Route path="/product/:type">*/}
                    {/*    /!*<Product/>*!/*/}
                    {/*</Route>*/}
                    <Redirect to="/"/>
                </Switch>
        );
    }
}