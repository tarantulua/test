import React, {useEffect, useRef} from "react";
import MyCard from "../../MyCard/MyCard";

export function useHorizontalScroll () {
    const elRef = useRef();

    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e) => {
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY
                });
            };
            el.addEventListener('wheel', onWheel);
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);
    return elRef;
}

function BlockList({blockProducts}){

    const scrollRef = useHorizontalScroll();
    return(
        <div id="block-list" className="block-list" ref={scrollRef}>
            {blockProducts.map((product) => {
                return (
                    <MyCard key = {product.id} myCard={product} />
                )})}
        </div>
    );
}

export default BlockList;