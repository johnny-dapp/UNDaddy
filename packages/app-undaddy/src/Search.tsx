// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from "react";
import { Bubble, InputAddress } from "@polkadot/ui-app";
import { AccountIndex, Balance, Nonce } from "@polkadot/ui-reactive";
import "antd/dist/antd.css";
import SearchBar from "./SearchBar";

type Props = {
  onChange: (accountId?: string) => void
};

type State = {
  accountId?: string,
  domainName: string
};

export default class Search extends React.PureComponent<Props, State> {
  state: State = {
    domainName: ""
  };

  requestDomainName = name => {
    this.setState({ domainName: name });
  };

  render() {
    return (
      <div id="search-container">
        <SearchBar onSearch={this.requestDomainName} />
      </div>
    );
  }
}
