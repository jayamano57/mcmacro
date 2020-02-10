import React from "react";
import { Select } from "antd";
const { Option } = Select;

function OperatorDropdown(props) {
  return (
    <Select
      value={props.operator}
      style={{ width: 120 }}
      onChange={props.selectChangeHandle}
    >
      <Option value="less">Less than</Option>
      <Option value="greater">Greater than</Option>
    </Select>
  );
}

export default React.memo(OperatorDropdown);
