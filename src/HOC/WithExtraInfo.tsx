import { useState } from '@storybook/addons';
import React from 'react';

type ExtraInfoType = {
  extraInfo: string;
};

export function WithExtraInfo<P>(
  WrappedComponent: React.ComponentType<P & ExtraInfoType>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const [extraInfo, setExtraInfo] = useState('info');
    setExtraInfo('set new onfo');
    return <WrappedComponent {...props} extraInfo={extraInfo} />;
  };
  return ComponentWithExtraInfo;
}
