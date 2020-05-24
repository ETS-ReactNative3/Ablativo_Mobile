import React from 'react';
import { Button, Icon } from '@ui-kitten/components';

export const FacebookIcon = (props) => (
  <Icon name='facebook' {...props} />
);

export const FacebookButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);