// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import AccountSelector from './AccountSelector';
import { Input, Tooltip, Icon, Button } from 'antd';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { Text } from '@polkadot/types'
import { TxButton, InputNumber } from '@polkadot/ui-app';
import BN from 'bn.js';

const Wrapper = styled.div`
  padding: 1rem;
`;

const BidWrapper = styled.div`
  padding-left: 15rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 30rem;
  margin-right: 1rem;
  margin: 1rem 0;
`;

type Props = {
  onChange: (accountId?: string) => void;
};

type State = {
  accountId?: string;
  donmain?: Text;
  price?: BN
};

export default class Bid extends React.PureComponent<Props, State> {
  state: State = {};

  private onAccountChange = (accountId?: string): void => {
    this.setState({ accountId });
  }

  private onPriceChange = (price?: BN): void => {
    this.setState({ price });
  }

  render () {
    const { accountId, donmain, price } = this.state;

    return (
      <Wrapper>
        <AccountSelector onChange={this.onAccountChange} />
        <BidWrapper>
          <InputWrapper>
            <Input
              placeholder='Enter your price'
              prefix={<Icon type='dollar' style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Tooltip title='Extra information'>
                  <div style={{ color: 'rgba(0,0,0,.25)' }}>CPAY</div>
                </Tooltip>
              }
              onChange={price => this.onPriceChange(new BN(price))}
            />
          </InputWrapper>
          <div>
            <InputWrapper>
              <Input placeholder='Enter the domain name' onChange={value => this.setState({ donmain: new Text(value) })} />
            </InputWrapper>
          </div>
          <TxButton
              accountId={accountId}
              label='Bid'
              params={[donmain, price]}
              tx='domainService.bid'
            />
        </BidWrapper>
      </Wrapper>
    );
  }
}
