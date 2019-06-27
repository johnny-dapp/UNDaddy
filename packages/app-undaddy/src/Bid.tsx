// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from "react";
import { Bubble, InputAddress } from "@polkadot/ui-app";
import { AccountIndex, Balance, Nonce } from "@polkadot/ui-reactive";

type Props = {
  onChange: (accountId?: string) => void
};

type State = {
  accountId?: string
};

export default class Bid extends React.PureComponent<Props, State> {
  state: State = {};

  render() {
    return <div>Bid</div>;
  }
}
