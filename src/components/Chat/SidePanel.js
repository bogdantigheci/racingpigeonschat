import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';

const SidePanel = (props) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: 'blue', fontSize: '1.2rem' }}
    >
      <UserPanel currentUser={props.currentUser} />
      <Channels currentUser={props.currentUser} />
    </Menu>
  );
};

export default SidePanel;