import React, {useState} from "react"
import '../style/products.css'
import GroupProducts from "./GroupProducts"
import AllProducts from "./AllProducts"
import { ProductData } from "../Data/ProductData"

export default function Products(){

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('')

    const handleCategoryClick = (category) =>{
        setSelectedCategory(category)
    }

    const allProductsData = ProductData

    const handleSearchQuery = (event) =>{
        setSearchQuery(event.target.value)
    }

    const filteredProducts = allProductsData.filter((product)=>{
        const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
        const categoryMatch = selectedCategory ? product.category === selectedCategory : true
        return titleMatch && categoryMatch
    })

    return (
        <div className="product-list">
            <input type="text" placeholder="search Product" className="searchBar" onChange={handleSearchQuery}></input>
            <div className="split-container">
                <div className="pane1">
                    <GroupProducts onCategoryClick={handleCategoryClick}></GroupProducts>
                </div>
                <div className="pane2">
                    <AllProducts selectedCategory={selectedCategory} filteredProducts={filteredProducts}></AllProducts>
                </div>
            </div>
        </div>
    )
}