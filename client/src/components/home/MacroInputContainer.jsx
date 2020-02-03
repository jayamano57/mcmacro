import React from "react";
import MacroInput from "./MacroInput";
import CaloriesIcon from "../../media/my-icons-collection/svg/004-lunch-box.svg";
import BreadIcon from "../../media/my-icons-collection/svg/001-bread.svg";
import FatIcon from "../../media/my-icons-collection/svg/002-cheese.svg";
import ProteinIcon from "../../media/my-icons-collection/svg/003-fried-egg.svg";
import { Select } from "antd";
const { Option } = Select;

function MacroInputContainer(props) {
  return (
    <section className="macro-input-container">
      <Select
        value={props.operator}
        style={{ width: 120 }}
        onChange={props.selectChangeHandle}
      >
        <Option value="less">Less than</Option>
        <Option value="greater">Greater than</Option>
      </Select>
      <MacroInput
        class="calories"
        type="Calories"
        unit="cal"
        icon={CaloriesIcon}
        alt="Calories Icon"
        changeHandler={props.changeHandler}
        blurHandler={props.blurHandler}
        value={props.value.calories}
        operator={props.operator}
      />
      <MacroInput
        class="protein"
        type="Protein"
        unit="g"
        icon={ProteinIcon}
        alt="Protein Icon"
        changeHandler={props.changeHandler}
        blurHandler={props.blurHandler}
        value={props.value.protein}
        operator={props.operator}
      />
      <MacroInput
        class="carbs"
        type="Carbs"
        unit="g"
        icon={BreadIcon}
        alt="Bread Icon"
        changeHandler={props.changeHandler}
        blurHandler={props.blurHandler}
        value={props.value.carbs}
        operator={props.operator}
      />
      <MacroInput
        class="fat"
        type="Fat"
        unit="g"
        icon={FatIcon}
        alt="Fat Icon"
        changeHandler={props.changeHandler}
        blurHandler={props.blurHandler}
        value={props.value.fat}
        operator={props.operator}
      />

      <button
        className="btn-default search"
        type="submit"
        onClick={props.search}
      >
        Search
      </button>
    </section>
  );
}

export default React.memo(MacroInputContainer);
