import './Home.css';
import React from "react";
import Header from './Header'

import { Link } from "react-router-dom"; // Import Link from React Router
export default class Home1 extends React.Component {
    render() {
        const { products } = this.props;


        if (!products || products.length === 0) {
            return <p>No products available.</p>;
        }
        return (

            <>
                <link href="https://api.mapbox.com/mapbox-gl-js/v3.9.1/mapbox-gl.css" rel="stylesheet" />
                <script src="https://api.mapbox.com/mapbox-gl-js/v3.9.1/mapbox-gl.js"></script>
                <title>Home Page</title>
                
                <Header />

                <div className='slider-warapper'>
                    <div className="image-list">

                        {products.map((item, index) => (
                            <div key={item.shoes_id} className="shoe-item">
                                <img src={"http://localhost:4000/images/" + item.img_path + ".jpg"} alt={item.img_path} height={"500px"} width={"420px"} />
                                <h2 className='coll_name'>{item.collection_name}</h2>
                                <b className='category'>{item.category_name}</b>
                                <b className='price'>MRP : ₹{item.price}</b>
                                <Link to={`/product-details/${item.shoes_id}`}>
                                    <input type='button' value="More Details" className='detail-btn' />
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='main-class'>
                    <p className='sale'>New Style on Sale: Up to 40% Off</p>
                    <b><a href="#new & featured" className='offer'>Shop All Our New Markdowns </a></b>
                </div>
                <div className='container'>
                    <a href="/shoes-category">
                        <img src='http://localhost:4000/images/just do it.png' alt='just do it' className='just'></img>
                        <b><a href="#pegasus-shoes" className='nike-41'>Nike Pegasus 41</a></b>
                        <p><a href="#pegasus-shoes" className='waste'>DON'T WASTE YOUR ENERGY</a></p>
                        <a href="#pegasus-shoes" className='nike-42'>Run in Pegasus. Feel the responsive energy return of Air Zoom and all-new ReactX foam.</a>
                        <div className='main-button'>
                            <button className='shop-button' ><b>Shop</b></button>
                        </div></a>
                    <p className='new'>Newest of the Season</p>
                </div>
                <div className='slider-warapper'>

                    <div className='buttons'>
                        <span className='next'>&#10095;</span>
                        <span className='prev'>&#10094;</span>

                    </div>
                    <p className='featured'>Featured</p>
                    <div className='image-list'>

                        <img src='http://localhost:4000/images/footwear.jpg' alt='img-1' className='image-item' />
                        <img src='http://localhost:4000/images/running-shoes.jpg' alt='img-2' className='image-item' />
                        <img src='http://localhost:4000/images/running-essential.jpg' alt='img-3' className='image-item' />
                        <img src='http://localhost:4000/images/summer-shoes.jpg' alt='img-4' className='image-item' />


                    </div>

                </div>


                <div className='container'>
                    <p className='dont-miss'>Don't Miss</p>
                    <img src='http://localhost:4000/images/jordan.jpg' alt="jordan" className='jordan-img'></img>
                    <p><a href='matching-sets-jordan' className='jordan-sports'>JORDAN SPORT</a></p>
                    <a href='#matching-sets-jordan' className='nike-42'>Rooted in basketball, influenced by street culture. Jazz Chisholm and Guard Rhyne Howard stunt in elevated pieces</a>
                    <a href='#matching-sets-jordan' className='nike-43'>designed to complement performance and style.</a>
                    <div className='main-button'>
                        <button className='shop-button' ><b>Shop</b></button>
                    </div>
                </div>


                <div className='sport-slider-warapper'>
                    <p className='sport'>Shop by Sport</p>


                    <div className='sport-image-list'>
                        <img src='http://localhost:4000/images/nike-basketball.jpg' alt='img-1' className='image-item' />
                        <img src='http://localhost:4000/images/nike-golf.jpg' alt='img-2' className='image-item' />
                        <img src='http://localhost:4000/images/nike-trail.jpg' alt='img-3' className='image-item' />
                        <img src='http://localhost:4000/images/nike-tennis.jpg' alt='img-4' className='image-item' />
                        <img src='http://localhost:4000/images/nike-football.jpg' alt='img-5' className='image-item' />
                    </div>
                </div>



            </>
            

        );
     
       
    }
}