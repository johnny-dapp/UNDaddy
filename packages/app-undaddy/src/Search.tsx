// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from "react";
import { Bubble, InputAddress } from "@polkadot/ui-app";
import { Option, AccountId, Tuple, UInt, Text } from "@polkadot/types";
import { AccountIndex, Balance, Nonce } from "@polkadot/ui-reactive";
import { Alert } from "antd";
import { withCalls } from "@polkadot/ui-api/with";
import "antd/dist/antd.css";
import SearchBar from "./SearchBar";

type Props = {
  onChange: (accountId?: string) => void
};

type State = {
  accountId?: string,
  domainName?: Text,
  result: boolean,
  taken: boolean,
  owner: string,
  domainIP: string,
  expiry: string,
  domainDetail?: Option<any>
};

class Search extends React.PureComponent<Props, State> {
  state: State = {
    result: false,
    taken: false,
    owner: "",
    domainIP: "",
    expiry: ""
  };

  requestDomainName = (name: string) => {
    this.setState({ domainName: name });
    setTimeout(() => this.setState({result:true}), 400)
  };

  render() {
    let resultContent = null;
    console.log(this.state.domainDetail);
    if (this.state.result) {
      if (this.state.domainDetail !== undefined ){
        const description = (
          <div>
            Domain Public Address:{this.state.domainDetail.addr}
            <br />
            Owner:{this.state.domainDetail.owner}
            <br />
            Expiry Date:{this.state.domainDetail.expire}
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

export default withCalls <
  Props >(["query.domainService.domains", { paramName: "domainName", propName: "domainDetail" }])(Search);
