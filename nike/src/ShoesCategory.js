import React from "react";

import ShoesCategory1 from "./ShoesCategory1";
export default class ShoesCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      selectedCategories: [],
      productlist: [],
      limit: 2,
      offset: 0,
      isFiltersVisible: true,
      shoesWidth: false
    };
  }
  componentDidMount() {
    this.fetchCategory();
    this.getProducts();
  }
  selectCategory = (e) => {
    const categoryId = e.target.value; // Get value of checkbox
    console.log(categoryId);
    const { checked } = e.target; // Triggered the event
    let selectedCategories = [...this.state.selectedCategories]; // Clone the array

    if (checked) {
      if (!selectedCategories.includes(categoryId)) {
        selectedCategories.push(categoryId); // Add the category if not already selected
      }
    } else {
      // Remove the category if unchecked
      selectedCategories = selectedCategories.filter(id => String(id) !== String (categoryId));
      console.log("selected",selectedCategories)
    }

    // Update the state and trigger getProducts
    this.setState({ selectedCategories }, () => this.getProducts());
  };


  showMore = () => {
    let { limit, offset } = this.state;
    offset = offset + limit;
    this.setState({ offset }, () => this.getProducts())
  }
  getProducts = async () => {
    let limit = this.state.limit, offset = this.state.offset, selectedCategories = this.state.selectedCategories;
    // Convert selectedCategories array to a comma-separated string
    const categoriesQuery = selectedCategories.join(',');
    this.setState({ productlist: [] }); //reset before fetching
    try {
      const response = await fetch(`http://localhost:4000/product?limit=${limit}&offset=${offset}&categories=${categoriesQuery}`);

      const data = await response.json();
      let item = this.state.productlist;
      let newproductlist = [...item, ...data];
      this.setState({ productlist: newproductlist });  // Update state with the fetched data
      console.log(data);  // You can remove this later, but for now it will log the data to the console
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }
  fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:4000/category");

      const data = await response.json();
      this.setState({ category: data });  // Update state with the fetched data
      console.log(data);  // You can remove this later, but for now it will log the data to the console
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };
  toggleFilter = () => {
    this.setState(prevState => ({ /* access previos value.. useful when you need to update the state based on its previous values. */
      isFiltersVisible: !prevState.isFiltersVisible, //give current value
      shoesWidth: !prevState.shoesWidth,
    }));
  }

  render() {
    return (
      <ShoesCategory1 category={this.state.category}
        productlist={this.state.productlist}
        showMore={this.showMore}
        isFiltersVisible={this.state.isFiltersVisible}
        toggleFilter={this.toggleFilter}
        shoesWidth={this.state.shoesWidth}
        checked={this.state.checked}
        selectCategory={this.selectCategory}
        selectedCategories={this.state.selectedCategories}
      />
    )
  }
}