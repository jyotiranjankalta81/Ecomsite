import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css"
import Product from "./Product.js"

const product = {
    name: "Blue Tshirt",
    images: [{ url: "https://i.ibb.co/4tm3s33/customized-kids-t-shirts.webp" }],
    price: "$50",
    _id: "JyotiRanjan",
}
const Home = () => {
    return (
        <Fragment>
            <div className='banner'>
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href='#container'>
                    <button>Scroll<CgMouse /></button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
            <div className='container' id='container'>
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
    );
}

export default Home