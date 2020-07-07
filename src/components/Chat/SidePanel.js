import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import FavoriteChannel from './FavoriteChannel';

const SidePanel = (props) => {
  return (
    <Menu
      size="small"
      inverted
      fixed="left"
      vertical
      style={{
        background: props.primaryColor,
      }}
      className="side_panel"
    >
      <UserPanel
        currentUser={props.currentUser}
        primaryColor={props.primaryColor}
      />
      <FavoriteChannel currentUser={props.currentUser} />
      <Channels currentUser={props.currentUser} />
      <DirectMessages currentUser={props.currentUser} />
    </Menu>
  );
};

export default SidePanel;
