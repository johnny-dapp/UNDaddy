// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from "react";
import { Bubble, InputAddress } from "@polkadot/ui-app";
import { AccountIndex, Balance, Nonce } from "@polkadot/ui-reactive";
import { Alert } from "antd";
import "antd/dist/antd.css";
import SearchBar from "./SearchBar";

type Props = {
  onChange: (accountId?: string) => void
};

type State = {
  accountId?: string,
  domainName: string,
  result: boolean,
  taken: boolean,
  owner: string,
  domainIP: string,
  expiry: string
};

export default class Search extends React.PureComponent<Props, State> {
  state: State = {
    domainName: "",
    result: false,
    taken: false,
    owner: "",
    domainIP: "",
    expiry: ""
  };

  requestDomainName = name => {
    this.setState({ domainName: name });
  };

  renderResultContent = () => { };

  render() {
    let resultContent = null;
    if (this.state.result) {
      if (this.state.taken) {
        const description = (
          <div>
            Domain Public Address:
            <br />
            Owners:
            <br />
            Expiry Date:
          </div>
        );
        resultContent = (
          <div className="alert-box">
            <Alert
              showIcon
              message="This domain is taken"
              description={description}
              type="info"
              style={{
                width: 500
              }}
            />
          </div>
        );
      } else {
        resultContent = (
          <div className="alert-box">
            <Alert
              showIcon
              message="This domain is avaliable"
              type="success"
              style={{
                width: 500
              }}
            />
          </div>
        );
      }
    }

    return (
      <div id="search-container">
        <SearchBar onSearch={this.requestDomainName} />
        <div className="result-box">{resultContent}</div>
      </div>
    );
  }
}
