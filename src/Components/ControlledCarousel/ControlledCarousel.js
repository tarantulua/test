import React, {useState} from "react";
import {Carousel} from "react-bootstrap";
import "./ControlledCarousel.css"

function ControlledCarousel({imgList}) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setActiveIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
            {imgList.map((image, index) => {
                return (
                    <Carousel.Item key = {index}>
                        <img className="d-block w-100"
                            src={image.img}
                            alt="First slide"/>
                        <Carousel.Caption>
                            <h3>{image.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                )})}
        </Carousel>
    );
}

export default ControlledCarousel;