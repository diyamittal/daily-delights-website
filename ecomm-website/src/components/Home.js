import React from "react"
import ImageSlider from "./ImageSlider"
import ProductSlider from "./ProductSlider"
import { SliderData } from "../Data/SliderData"
import {ProductData} from "../Data/ProductData"

export default function Home(){
    return (
        <div>
            <ImageSlider slides={SliderData}/>
            <ProductSlider products={ProductData}></ProductSlider>
        </div>
    )
}