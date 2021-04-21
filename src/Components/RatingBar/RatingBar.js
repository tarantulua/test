import React from "react";
import "./RatingBar.css";

// const useStarClick = (initialValue, isSelectable) => {
//
//     const [value, setValue] = React.useState(initialValue);
//
//     let onClick = React.useCallback((event) => {
//         setValue(event.target.id[4])
//     }, []);
//
//     if (!isSelectable) onClick = () => {
//     }
//
//     return {
//         bind: {
//             onClick
//         },
//         set: (line) => setValue(line),
//         get: () => value
//     };
// };

function RatingBar({rating, isSelectable}) {

    // const star = useStarClick(rating || 0, isSelectable || false);

    const [myRating, setMyRating] = React.useState(rating);

    const starClick = isSelectable ? (event) => {
        // console.log(event.target.id[4]);
        if (myRating !== event.target.id[4]) return setMyRating(event.target.id[4]);
        return setMyRating(0)
    } : () => { }


    return (
        <div className="myRating-Bar">
            <label id={`${isSelectable ? "star5" : ""}`}
                   className={`star ${isSelectable ? "star-hover star5" : ""}${myRating >= 5 ? " star-active" : ""}`}
                   onClick={event => starClick(event)}>&#9733;</label>
            <label id={`${isSelectable ? "star4" : ""}`}
                   className={`star ${isSelectable ? "star-hover star4" : ""}${myRating >= 4 ? " star-active" : ""}`}
                   onClick={event => starClick(event)}>&#9733;</label>
            <label id={`${isSelectable ? "star3" : ""}`}
                   className={`star ${isSelectable ? "star-hover star3" : ""}${myRating >= 3 ? " star-active" : ""}`}
                   onClick={event => starClick(event)}>&#9733;</label>
            <label id={`${isSelectable ? "star2" : ""}`}
                   className={`star ${isSelectable ? "star-hover star2" : ""}${myRating >= 2 ? " star-active" : ""}`}
                   onClick={event => starClick(event)}>&#9733;</label>
            <label id={`${isSelectable ? "star1" : ""}`}
                   className={`star ${isSelectable ? "star-hover star1" : ""}${myRating >= 1 ? " star-active" : ""}`}
                   onClick={event => starClick(event)}>&#9733;</label>
        </div>
    );
}

export default RatingBar;