import React, { FC } from 'react';
import { Box, BoxProps } from '@blockstack/ui';

type DurationSelectProps = BoxProps;

export const DurationSelect: FC<DurationSelectProps> = props => (
  <Box
    mt="extra-loose"
    boxShadow="low"
    border="1px solid #F0F0F5"
    borderRadius="8px"
    width={[null, '432px']}
    {...props}
  />
);
