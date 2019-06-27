// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import AccountSelector from './AccountSelector';
import { Input, Tooltip, Icon } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
`;

const InputWrapper = styled.div`
  padding: 1rem;
`;

type Props = {
  onChange: (accountId?: string) => void;
};

type State = {
  accountId?: string;
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
        <InputWrapper>
          <Input
            placeholder='Enter the domain you want!'
            suffix={
              <Tooltip title='Extra information'>
                <Icon type='info-circle' style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
        </InputWrapper>
      </Wrapper>
    );
  }
}
