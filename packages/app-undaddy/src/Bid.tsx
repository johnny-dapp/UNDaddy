// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import AccountSelector from './AccountSelector';
import { Input, Tooltip, Icon, Button } from 'antd';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Wrapper = styled.div`
  padding: 1rem;
`;

const BidWrapper = styled.div`
  padding-left: 15rem;
  margin: 1rem 0;
  display: flex;
`;

const InputWrapper = styled.div`
  width: 30rem;
  margin-right: 1rem;
`;

type Props = {
  onChange: (accountId?: string) => void;
};

type State = {
  accountId?: string;
  donmain?: string;
};

export default class Bid extends React.PureComponent<Props, State> {
  state: State = {};

  private onAccountChange = (accountId?: string): void => {
    this.setState({ accountId });
  }

  render () {
    return (
      <Wrapper>
        <AccountSelector onChange={this.onAccountChange} />
        <BidWrapper>
          <InputWrapper>
            <Input placeholder='Enter your username' onChange={value => this.setState({ donmain: value })} />
          </InputWrapper>
          <Button onClick={() => console.log('bid-domain:', this.state.donmain)} type='primary'>
            Bid
          </Button>
        </BidWrapper>
      </Wrapper>
    );
  }
}
