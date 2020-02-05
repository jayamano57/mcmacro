import React from "react";

function RestaurantListItem(props) {
  return (
    <li className="restaurant-item-list">
      <div>{props.item}</div>
      <div className="item-macros">
        <div>calories: {props.calories}</div>
        <div>protein: {props.protein}</div>
        <div>carbs: {props.carbs}</div>
        <div>fat: {props.fat}</div>
      </div>
    </li>
  );
}

export default React.memo(RestaurantListItem);
