// Copyright 2017-2019 @polkadot/app-123code authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// some types, AppProps for the app and I18nProps to indicate
// translatable strings. Generally the latter is quite "light",
// `t` is inject into props (see the HOC export) and `t('any text')
// does the translation
import { AppProps, I18nProps } from '@polkadot/ui-app/types';
import basicMd from '@polkadot/app-accounts/md/basic.md';
import { Route, Switch } from 'react-router';
import { HelpOverlay, Tabs } from '@polkadot/ui-app';
import { ComponentProps, LocationProps } from './types';
import 'antd/dist/antd.css';

// external imports (including those found in the packages/*
// of this repo)
import React from 'react';

// our app-specific styles
import './index.css';

// local imports and components
import Search from './Search';
import Bid from './Bid';
import YourDomain from './YourDomain';
import translate from './translate';

// define out internal types
type Props = AppProps & I18nProps;
type State = {
  accountId?: string;
  hidden: Array<string>;
  tabs: Array<TabItem>;
};

class UNDaddyApp extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props);

    const { t } = props;
    this.state = {
      tabs: [
        {
          name: 'search',
          text: t('Search Domain')
        },
        {
          hasParams: true,
          name: 'bid',
          text: t('Bid domain')
        },
        {
          name: 'your-domain',
          text: t('Your Domain')
        }
      ]
    };
  }

  render () {
    const { basePath } = this.props;
    const { tabs } = this.state;

    return (
      <main className='accounts--App'>
        <HelpOverlay md={basicMd} />
        <header>
          <Tabs basePath={basePath} items={tabs} />
        </header>
        <Switch>
          <Route path={`${basePath}/`} exact render={this.renderComponent(Search)} />
          <Route path={`${basePath}/bid`} render={this.renderComponent(Bid)} />
          <Route path={`${basePath}/your-domain`} render={this.renderComponent(YourDomain)} />
        </Switch>
      </main>
    );
  }

  private renderComponent (Component: React.ComponentType<ComponentProps>) {
    return ({ match }: LocationProps) => {
      const { basePath, location, onStatusChange } = this.props;

      return <Component basePath={basePath} location={location} match={match} onStatusChange={onStatusChange} />;
    };
  }

  private onAccountChange = (accountId?: string): void => {
    this.setState({ accountId });
  }
}

export default translate(UNDaddyApp);
