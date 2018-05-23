// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StateDb$SectionNames } from '@polkadot/storage/types';

import React from 'react';

import map from '@polkadot/storage-substrate';

// flowlint-next-line unclear-type:off
export default function createOptions (sectionName: any): Array<any> {
  const section = map[(sectionName: StateDb$SectionNames)];

  if (!section) {
    return [];
  }

  return Object
    .keys(section.keys)
    .sort()
    .filter((name) => {
      const { isDeprecated = false, isHidden = false } = section.keys[name];

      return !isDeprecated && !isHidden;
    })
    .map((name) => {
      const { description = '', params = {} } = section.keys[name];
      const inputs = Object.keys(params).join(', ');

      return {
        className: 'ui--DropdownLinked-Item',
        key: `${sectionName}_${name}`,
        text: [
          <div
            className='ui--DropdownLinked-Item-call'
            key={`${sectionName}_${name}:call`}
          >
            {name}({inputs})
          </div>,
          <div
            className='ui--DropdownLinked-Item-text'
            key={`${sectionName}_${name}:text`}
          >
            {description || name}
          </div>
        ],
        value: name
      };
    });
}
