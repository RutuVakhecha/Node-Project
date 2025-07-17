import React from "react";
import './shoescategory.css';
import { Link } from "react-router-dom"; 

export default class ShoesCategory1 extends React.Component {


  render() {
    const { category, productlist,shoesWidth } = this.props;

    if (!category || category.length === 0) {
      return <p>No Category available.</p>;
    }

 
    console.log(this.props.productlist);

    const imagestyle = {
      Width: shoesWidth ? '100%' : '50%',
      transition: 'width 0.3s ease', 
    }
    return (
      <div>
   
     <b><span id="hidebtn" onClick={this.props.toggleFilter}>{this.props.isFiltersVisible ? "Hide Filters" : "Show Filters"}</span></b>
     <h1 className="blue-pack">Blueprint Pack(101)</h1>
     {this.props.isFiltersVisible && ( //conditional rendering
        <div id="filter-category">
          {category.map((item) => (
            <div key={item.category_id} className="category-item">
              <li className="category-list-item">
                <input type="checkbox"  id={`category-checkbox-${item.category_id}`} value={item.category_id}
                    className="category-checkbox" checked={this.props.selectedCategories.includes(item.category_id)}
                    onChange={this.props.selectCategory}/> {/*  checks the category_id of the current item is present in the selectedCategories array. */}
                <b>{item.category_name}</b>
              </li>
            </div>
          ))}

        </div>
     )}
        <div className="product-list">
          {productlist.map((item) => (
            <div key={"id"+item.shoes_id} className="shoe-item">
              <Link to={`/product-details/${item.shoes_id}`}>
              <div style={imagestyle}>
              <img src={"http://localhost:4000/images/" + item.img_path + ".jpg"} alt={item.img_path} height={"440px"} width={"370px"} />
           </div></Link>
              <h2 className='coll_name'>{item.collection_name}</h2>
              <b className='category'>{item.category_name}</b>
              <b className='price'>MRP : ₹{item.price}</b>
            </div>
          ))}
        </div>
       <div className="btn">
       <input type='button' value="Show More" className='show-more-btn' onClick={this.props.showMore}></input>
       </div>
        </div>
        
        );
  }
}
