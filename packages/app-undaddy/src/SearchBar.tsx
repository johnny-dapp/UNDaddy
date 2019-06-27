import React from "react";
import { Input, Select, Button } from "antd";

const { Option } = Select;
const selectAfter = (
  <Select defaultValue=".un" style={{ width: 80 }}>
    <Option value=".un">.un</Option>
    <Option value=".io">.io</Option>
    <Option value=".ai">.ai</Option>
    <Option value=".com">.com</Option>
  </Select>
);

type Props = {
  onSearch: (accountId?: string) => void
};

type State = {
  input: string
};

class SearchBar extends React.PureComponent {
  state: State = {
    input: ""
  };

  onChangeText = (e: Object) => {
    this.setState({ input: e.target.value });
  };

  onClick = () => {
    this.props.onSearch(this.state.input);
  };

  render() {
    return (
      <div style={{ marginBottom: 16, display: "flex" }}>
        <Input
          style={{ marginRight: 10, width: 400 }}
          addonBefore="www."
          addonAfter={selectAfter}
          value={this.state.input}
          onChange={this.onChangeText}
        />
        <Button type="primary" shape="circle" icon="search" onClick={() => this.onClick()} />
      </div>
    );
  }
}

export default SearchBar;
