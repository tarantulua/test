// import logo from './logo.svg';
import './App.css';
import {useDispatch} from "react-redux"
import {useRoutes} from "./routes";
import {setCardList} from "./redux/actions";
import NavMenu from "./Components/NavMenu/NavMenu";
import React, {useEffect} from "react";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        // let cardList = ;
        // console. log(data);
        dispatch(setCardList(require("./Products.json")));
    })

    // function loadList(){
    //     let cardLsit = require("./Products.json");
    //     // console. log(data);
    //     dispatch(setCardList(cardLsit));
    // }
    //
    // loadList();

    const routes = useRoutes(true);

  return (
      <>
          <header id="site-header" className="site-header">
              <NavMenu/>
          </header>
          <div className="main">
              {routes}
          </div>
      </>
  );
}

export default App;
