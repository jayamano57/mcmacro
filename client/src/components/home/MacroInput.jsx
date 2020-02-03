import React from "react";

function MacroInput(props) {
  return (
    <div className={`macro-input-container-input ${props.class}`}>
      <div className="icon">
        <img src={props.icon} alt={props.alt} />
      </div>
      <h2 className="input-title">
        {props.type}
        <span className={`operator ${props.operator}`}>
          {props.operator === "less" ? <span>&lt;</span> : <span>&gt;</span>}
        </span>
      </h2>
      <div className="input-group">
        <input
          name={props.class}
          className="macro-input"
          type="number"
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
          value={props.value}
        />
        <span className="unit">{props.unit}</span>
      </div>
    </div>
  );
}

export default React.memo(MacroInput);
