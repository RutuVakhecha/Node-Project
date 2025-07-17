import React from "react";
import './productdetail.css';
import { Link } from "react-router-dom";

export default class ProductDetail1 extends React.Component {
    render() {
        const { shoesDetail, shoesImages, selectedImage, handleMouseEnter, handleMouseLeave } = this.props;

        // Function to generate the image path with fallback (WebP first, JPG as fallback)
        const getImagePath = (imagePath) => {
            const webpImagePath = `http://localhost:4000/images/${imagePath}.webp`;
            const jpgImagePath = `http://localhost:4000/images/${imagePath}.jpg`;
            return { webpImagePath, jpgImagePath };
        };

        const { webpImagePath, jpgImagePath } = getImagePath(selectedImage);

        return (
            <div>
                <h1 style={{ marginLeft: "70px" }}>Product Details</h1>
                <div className="container" style={{ display: "flex", flexDirection: "row" }}>


                    {/* Column for thumbnails */}
                    <div className="shoes-thumbnails" style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                        {shoesImages.map((image, index) => {
                            const { webpImagePath, jpgImagePath } = getImagePath(image.img_path);

                            return (
                                <img
                                    key={index}
                                    className="thumbnail"
                                    alt={image.img_path}
                                    src={webpImagePath}  // Default to WebP
                                    onError={(e) => {
                                        e.target.onerror = null;  // Prevent infinite loop
                                        e.target.src = jpgImagePath;  // Fallback to JPG
                                    }}
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        marginBottom: "10px",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={() => handleMouseEnter(image.img_path)}  // Change the large image on hover
                                    onMouseLeave={handleMouseLeave}  // Optional: reset image on mouse leave
                                />
                            );
                        })}

                    </div>
                    {/* Column for large image */}
                    <div className="shoes-img" style={{ marginRight: "20px", margin: "5px auto" }}>
                        <img
                            src={webpImagePath}  // Try loading WebP first
                            alt="Selected Shoe"
                            onError={(e) => {
                                e.target.onerror = null;  // Prevent infinite loop
                                e.target.src = jpgImagePath;  // Fallback to JPG if WebP fails
                            }}
                            style={{
                                width: '550px',
                                height: '610px',
                                borderRadius: '8px',
                                display: 'block',
                            }}
                        />
                    </div>

                    {/* Column for product details */}
                    <div className="shoes-detail" style={{ flex: 1 }}>
                        {shoesDetail.map((shoe) => (
                            <div key={"id" + shoe.shoes_id} className="shoe-shoe">
                                <ul>
                                    <li className="coll_name">{shoe.collection_name}</li>
                                    <li className="category">{shoe.category_name}</li>
                                    <li className="price">MRP: ₹{shoe.price}</li>
                                    <li className="size">Size: {shoe.size}</li>

                                    <input type="button" value="Add to Cart" className="add-to-bag-btn" onClick={this.props.handleCart} />
                                    <span className="favourite" onClick={this.props.handleFavourite}>Favourite<i className="fa fa-heart-o" id="heart3"></i></span>
                                    <li className="desc">{shoe.description}</li>
                                    <li className="color">Color : {shoe.color}</li>
                                    <li className="style">Style : {shoe.Style}</li>
                                    <li className="country">Country : {shoe.Country}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
