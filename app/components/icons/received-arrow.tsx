import React from 'react';
import { Box, color } from '@stacks/ui';

export const ReceivedArrow = () => {
  return (
    <Box color={color('brand')} as="svg" width="12px" height="16px" fill="none" viewBox="0 0 12 16">
      <Box
        as="path"
        fill="currentColor"
        d="M5.997 0c.613 0 1.028.427 1.028 1.057v7.385l-.068 1.472 1.28-1.478L9.79 6.889c.191-.183.43-.318.736-.318.552 0 .974.4.974.983 0 .264-.109.515-.32.732l-4.427 4.408c-.191.19-.477.305-.756.305-.28 0-.566-.115-.756-.305L.82 8.286C.608 8.07.5 7.82.5 7.554c0-.583.422-.983.974-.983.306 0 .545.135.729.318l1.553 1.547 1.28 1.478-.061-1.472V1.057C4.975.427 5.384 0 5.997 0z"
      />
      <Box as="path" fill="currentColor" d="M.5 15a1 1 0 001 1h9a1 1 0 100-2h-9a1 1 0 00-1 1z" />
    </Box>
  );
};
