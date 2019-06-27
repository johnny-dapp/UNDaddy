// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import { Bubble, InputAddress } from '@polkadot/ui-app';
import { AccountIndex, Balance, Nonce } from '@polkadot/ui-reactive';
import { List, Typography, Button, Icon } from 'antd';
import styled from 'styled-components';
import AccountSelector from './AccountSelector';

const data = ['www.test.ai', 'www.winning.ai', 'www.blockchain.ai'];

type Props = {
  onChange: (accountId?: string) => void;
  domains: Array<string> | null;
};

type State = {
  accountId?: string;
};

const RenderItems = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-around;
`;

const RenderItem = styled.div`
  flex: 1;
  font-size: 18px;
`;

const ButtonGroup = styled.div`
  flex: 1;
`;

export default class Bid extends React.PureComponent<Props, State> {
  state: State = {};

  render () {
    return (
      <div>
        <AccountSelector onChange={() => console.log('this')} />
        <List
          size='large'
          header={
            <div>
              <Icon type='"account-book' style={{ color: 'rgba(0,0,0,.25)' }} /> Your domian
            </div>
          }
          dataSource={data}
          renderItem={item => (
            <RenderItems>
              <RenderItem>
                <List.Item>{item}</List.Item>
              </RenderItem>
              <ButtonGroup>
                <Button onClick={() => console.log('bid-domain:')} type='primary' style={{ margin: '1rem' }}>
                  Publish
                </Button>
                <Button onClick={() => console.log('bid-domain:')} type='primary' style={{ margin: '1rem' }}>
                  UNPublish
                </Button>
              </ButtonGroup>
            </RenderItems>
          )}
        />
      </div>
    );
  }
}
