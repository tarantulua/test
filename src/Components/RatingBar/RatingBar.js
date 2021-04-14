import React from "react";
import "./RatingBar.css";

const useStarClick = (initialValue, isSelectable) => {

    const [value, setValue] = React.useState(initialValue);

    let onClick = React.useCallback((event) => {setValue(event.target.id[4])},[]);

    if (!isSelectable) onClick = ()=>{}

    return{
        bind: {
            onClick
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

function RatingBar({rating,isSelectable}){

    const star = useStarClick(rating || 0,isSelectable);

    console.log(star.get());

    return(
        <div className="myRating-Bar">
            <span id = {`${isSelectable? "star5":""}`}
                  className={`star${isSelectable ? "star-hover star5" : ""}${rating >= 5 ? "star-active" : ""}`}
                  {...star.bind}>&#9733;</span>
            <span id = {`${isSelectable? "star4":""}`}
                  className={`star ${isSelectable ? "star-hover star4" : ""}${rating >= 4 ? "star-active" : ""}`}
                  {...star.bind}>&#9733;</span>
            <span id = {`${isSelectable? "star3":""}`}
                  className={`star ${isSelectable ? "star-hover star3" : ""}${rating >= 3 ? "star-active" : ""}`}
                  {...star.bind}>&#9733;</span>
            <span id = {`${isSelectable? "star2":""}`}
                  className={`star ${isSelectable ? "star-hover star2" : ""}${rating >= 2 ? "star-active" : ""}`}
                  {...star.bind}>&#9733;</span>
            <span id = {`${isSelectable? "star1":""}`}
                  className={`star ${isSelectable ? "star-hover star1" : ""}${rating >= 1 ? "star-active" : ""}`}
                  {...star.bind}>&#9733;</span>
        </div>
    );
}

export default RatingBar;