// Copyright 2017-2018 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';

import React from 'react';
import { AccountId, AccountIndex, Address, Balance } from '@polkadot/types';
import IdentityIcon from '@polkadot/ui-react/IdentityIcon';
import Nonce from '@polkadot/ui-react-rx/Nonce';

import classes from './util/classes';
import toShortAddress from './util/toShortAddress';
import BalanceDisplay from './Balance';
import CopyButton from './CopyButton';
import translate from './translate';
import withMulti from '@polkadot/ui-react-rx/with/multi';
import withObservable from '@polkadot/ui-react-rx/with/observable';

export type Props = I18nProps & {
  accountIdAndIndex?: [AccountId | undefined, AccountIndex | undefined],
  balance?: Balance | Array<Balance>,
  children?: React.ReactNode,
  name?: string,
  value: AccountId | AccountIndex | Address | string | null,
  withBalance?: boolean,
  withIndex?: boolean,
  identIconSize?: number,
  isShort?: boolean
  withCopy?: boolean,
  withIcon?: boolean,
  withNonce?: boolean
};

const DEFAULT_ADDR = '5'.padEnd(16, 'x');

class AddressSummary extends React.PureComponent<Props> {
  render () {
    const { accountIdAndIndex = [], className, style } = this.props;
    const [accountId, accountIndex] = accountIdAndIndex;
    const isValid = accountId || accountIndex;

    return (
      <div
        className={classes('ui--AddressSummary', !isValid && 'invalid', className)}
        style={style}
      >
        <div className='ui--AddressSummary-base'>
          {this.renderIcon()}
          {this.renderAccountId()}
          {this.renderAccountIndex()}
          {this.renderBalance()}
          {this.renderNonce()}
        </div>
        {this.renderChildren()}
      </div>
    );
  }

  protected renderAddress () {
    const { name, isShort = true, value } = this.props;

    if (!value) {
      return null;
    }

    const address = value.toString();

    return (
      <div className='ui--AddressSummary-data'>
        <div className='ui--AddressSummary-name'>
          {name}
        </div>
        <div className='ui--AddressSummary-accountId'>
          {
            isShort
              ? toShortAddress(address)
              : value
          }
        </div>
        {this.renderCopy(address)}
      </div>
    );
  }

  protected renderAccountId () {
    const { accountIdAndIndex = [], name, isShort = true } = this.props;
    const [accountId, accountIndex] = accountIdAndIndex;

    if (!accountId && accountIndex) {
      return null;
    }

    const address = accountId
      ? accountId.toString()
      : DEFAULT_ADDR;

    return (
      <div className='ui--AddressSummary-data'>
        <div className='ui--AddressSummary-name'>
          {name}
        </div>
        <div className='ui--AddressSummary-accountId'>
          {
            isShort
              ? toShortAddress(address)
              : address
          }
        </div>
        {this.renderCopy(address)}
      </div>
    );
  }

  protected renderAccountIndex () {
    const { accountIdAndIndex = [] } = this.props;
    const [, accountIndex] = accountIdAndIndex;

    if (!accountIndex) {
      return null;
    }

    const address = accountIndex.toString();
    // {this.renderCopy(address)}

    return (
      <div className='ui--AddressSummary-data'>
        <div className='ui--AddressSummary-name'></div>
        <div className='ui--AddressSummary-accountIndex'>
          {address}
        </div>
      </div>
    );
  }

  protected renderBalance () {
    const { accountIdAndIndex = [], balance, t, withBalance = true } = this.props;
    const [accountId] = accountIdAndIndex;

    if (!withBalance || !accountId) {
      return null;
    }

    return (
      <BalanceDisplay
        balance={balance}
        className='ui--AddressSummary-balance'
        label={t('addressSummary.balance', {
          defaultValue: 'balance '
        })}
        value={accountId.toString()}
      />
    );
  }

  protected renderCopy (address: string) {
    const { withCopy = true } = this.props;

    if (!withCopy || !address) {
      return null;
    }

    return (
      <CopyButton value={address} />
    );
  }

  protected renderIcon () {
    const { identIconSize = 96, value, withIcon = true } = this.props;

    if (!withIcon) {
      return null;
    }

    return (
      <IdentityIcon
        className='ui--AddressSummary-icon'
        size={identIconSize}
        value={value ? value.toString() : DEFAULT_ADDR}
      />
    );
  }

  protected renderNonce () {
    const { accountIdAndIndex = [], t, withNonce = true } = this.props;
    const [accountId] = accountIdAndIndex;

    if (!withNonce || !accountId) {
      return null;
    }

    return (
      <Nonce
        className='ui--AddressSummary-nonce'
        params={accountId.toString()}
      >
        {t('addressSummary.transactions', {
          defaultValue: ' transactions'
        })}
      </Nonce>
    );
  }

  protected renderChildren () {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <div className='ui--AddressSummary-children'>
        {children}
      </div>
    );
  }
}

export {
  DEFAULT_ADDR,
  AddressSummary
};

export default withMulti(
  translate(AddressSummary),
  withObservable('accountIdAndIndex', { paramProp: 'value' })
);
