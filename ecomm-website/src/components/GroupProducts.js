import React from "react"
import {GroupData} from "../Data/GroupData"

export default function GroupProducts({onCategoryClick}){
    return(
        <section className="group-products">
            {GroupData.map((group, index)=>{
                return (
                    <div key={index} className="group-item" onClick={() => onCategoryClick(group.title)}>
                        <img src={group.image} alt="Group" className="group-image"></img>
                        <h3 className="group-title">{group.title}</h3>
                    </div>
                )
            })}
        </section>
    )
}

