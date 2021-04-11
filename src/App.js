import React, {useEffect} from "react";
import './App.css';
import {useDispatch} from "react-redux"
import {useRoutes} from "./routes";
import {setCardList} from "./redux/actions";
import NavMenu from "./Components/NavMenu/NavMenu";


function App() {

    const dispatch = useDispatch()
    // useEffect(() => {
    //     // let cardList = ;
    //     // console. log(data);
    //     // dispatch(setCardList(require("../public/Products.json")));
    //     fetchh
    // })

    // LoadList();


    useEffect( ()=>{
        const LoadList =  async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/Products.json`);
            const json = await response.json();
            dispatch(setCardList(json));
        }
        LoadList();
    },[dispatch])

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
