import React from "react";
import MacroInput from "./MacroInput";
import CaloriesIcon from "../../media/my-icons-collection/svg/004-lunch-box.svg";
import BreadIcon from "../../media/my-icons-collection/svg/001-bread.svg";
import FatIcon from "../../media/my-icons-collection/svg/002-cheese.svg";
import ProteinIcon from "../../media/my-icons-collection/svg/003-fried-egg.svg";
import OperatorDropdown from "./OperatorDropdown";

function MacroInputContainer(props) {
  return (
    <section className="macro-input-container">
      <OperatorDropdown
        operator={props.operator}
        selectChangeHandle={props.selectChangeHandle}
      />
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
        isValid={props.errors.calories}
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
        isValid={props.errors.protein}
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
        isValid={props.errors.carbs}
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
        isValid={props.errors.fat}
      />
      {Object.values(props.errors).some(result => !result) && (
        <div className="validation-error-msg">Please complete all fields</div>
      )}
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
