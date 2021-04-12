import React, {useEffect} from "react";
import './App.css';
import {connect} from "react-redux"
import {useRoutes} from "./routes";
import {setCardList} from "./redux/actions";
import NavMenu from "./Components/NavMenu/NavMenu";


function App({setCardList}) {

    useEffect( ()=>{
        const LoadList =  async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/Products.json`);
            const json = await response.json();
            setCardList(json);
        }
        LoadList();
    },[setCardList])

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

const mapDispatchToProps  ={
    setCardList
}

export default connect(null,mapDispatchToProps) (App);
