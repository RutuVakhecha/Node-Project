import React from "react";
import ProductDetail1 from "./ProductDetail1";
import cookies from 'js-cookie';


export default class ProductDetail extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         shoesDetail: [],
         shoesImages: [],
         selectedImage: null,  // Track the selected image for the larger view
         id: "",
         UserId: "",
         shoes_id: "",
         saved_at: "",
         quantity: "",
         total: "",
         added_at: ""

      };
   };

   componentDidMount() {
      const path = window.location.pathname; // "/product-details/123"
      const id1 = path.split("/").pop();      // "123"

      console.log("ID from URL:", id1);

      this.setState({ shoes_id: id1 });

      this.getProductDetail();
      this.getProductImages();

      // Retrieve the id from the cookie after the component is mounted
      const id = cookies.get('id');
      if (id) {
         this.setState({ id });
      }
      console.log('user id ', id);
      this.setState({ UserId: id });
   }

   getProductImages = async () => {
      const { id } = this.props;
      const response = await fetch(`http://localhost:4000/images/${id}`, {
         method: 'GET',
      });
      const data = await response.json();
      this.setState({ shoesImages: data });

      // Set the first image as the default larger image
      if (data.length > 0) {
         this.setState({ selectedImage: data[0].img_path });
      }
   };

   getProductDetail = async () => {
      const { id } = this.props;
      const response = await fetch(`http://localhost:4000/details/${id}`, {
         method: 'GET',
      });
      const data = await response.json();
  if(data && data.length>0)
  {
   cookies.set('price',data[0].price);
   cookies.set('collection_name',data[0].collection_name);
   cookies.set('shoes_id',data[0].shoes_id);
  }
      this.setState({ shoesDetail: data });
   };

   handleMouseEnter = (imagePath) => {
      this.setState({ selectedImage: imagePath });  // Update the larger image when hovering over a thumbnail
   };

   handleMouseLeave = () => {
      // Optional: If you want to keep the large image on the hovered one after the mouse leaves
   };
   handleFavourite = async () => {
      try {
         const { UserId, shoes_id } = this.state;

         if (!UserId || !shoes_id) {
            alert("User is not login! please login first");
             window.location.href = `/login`;
            return;
         }

         // Format: "YYYY-MM-DD HH:MM:SS"
         const saved_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

         const response = await fetch(`http://localhost:4000/insert-fav/`, {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               UserId,
               shoes_id,
               saved_at
            }),
         });

         const data = await response.json();

         if (response.ok) {
            alert("Favourite added successfully!");
            console.log('Success:', data);
         } else {
            alert("Failed to add favourite.");
            console.error('Server error:', data);
         }
      } catch (error) {
         console.error('Error:', error);
         alert('An error occurred.');
      }
   };

   handleCart = async () => {
   const { UserId, shoes_id } = this.state;

   if (!UserId || !shoes_id) {
            alert("User is not login! please login first");
         window.location.href = `/login`;
      return;
   }
 const price = parseFloat(cookies.get('price'));
 const collection_name = (cookies.get('collection_name'));
 console.log('collection name:', collection_name);
 console.log('price', price);
   const quantity = 1; // or get from user input
   const total = price * quantity; // example price * quantity
   const added_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

   const payload = {
      UserId,
      shoes_id,
      quantity,
      total,
      added_at
   };

   try {
      const response = await fetch("http://localhost:4000/add_cart/", {
         method: "POST",
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
         alert("Item added successfully");
         console.log("Success:", data);
         this.setState({
            quantity: "",
            total: "",
            added_at: ""
         });
           window.location.href = `/view-cart/${UserId}`;
      } else {
         alert("Failed to add to cart");
         console.error("Error:", data);
      }
   } catch (error) {
      console.error("Request error:", error);
      alert("Something went wrong.");
   }
}


   render() {
      return (
         <ProductDetail1
            shoesDetail={this.state.shoesDetail}
            shoesImages={this.state.shoesImages}
            selectedImage={this.state.selectedImage}
            handleMouseEnter={this.handleMouseEnter}
            handleMouseLeave={this.handleMouseLeave}
            handleFavourite={this.handleFavourite}
            handleCart={this.handleCart}
         />
      );
   }
}
