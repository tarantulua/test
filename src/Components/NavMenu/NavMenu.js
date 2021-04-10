import React from "react";
import {Navbar, NavbarBrand} from "react-bootstrap";
import "./NavMenu.css";
import {NavLink} from "react-router-dom";


function NavMenu() {

    let prevScroll = window.pageYOffset;

    window.onscroll = () => {

        let header = document.getElementById("site-header");

        let curScroll;
        let direction = 0;
        let prevDirection = 0;

        curScroll = window.pageYOffset;

        if (curScroll > prevScroll) {
            //scrolled up
            // console.log("up");
            direction = 2;
        } else if (curScroll < prevScroll) {
            //scrolled down
            // console.log("down");
            direction = 1;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;

        function toggleHeader(direction, curScroll) {
            // console.log(direction);
            if (direction === 2 && curScroll > 52) {
                //replace 52 with the height of your header in px
                header.classList.add('hide');
                prevDirection = direction;
            } else if (direction === 1) {
                header.classList.remove('hide');
                prevDirection = direction;
            }
        }
    }

    return (
        <Navbar className="navbar">
            <NavbarBrand className="left">
                <NavLink to = "/" className="nav-link">Navbar</NavLink>
            </NavbarBrand>
        </Navbar>
    );
}

export default NavMenu;