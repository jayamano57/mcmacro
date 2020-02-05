import React from "react";
import RestaurantListItem from "./RestaurantListItem";
import { Collapse } from "antd";
const { Panel } = Collapse;

function RestaurantData(props) {
  return (
    <Collapse bordered={false}>
      <Panel header={props.title} key="1">
        <div className="restaurant-content">
          <ul>
            {props.items.map(item => {
              return (
                <RestaurantListItem
                  item={item.item}
                  calories={item.calories}
                  carbs={item.carbs}
                  protein={item.protein}
                  fat={item.fat}
                />
              );
            })}
          </ul>
        </div>
      </Panel>
    </Collapse>
  );
}

export default React.memo(RestaurantData);
