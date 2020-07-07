import React from 'react';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './ColorPanel';
import SidePanel from './SidePanel';
import Messages from './Messages';
import MetaPanel from './MetaPanel';
import { connect } from 'react-redux';
import _ from 'lodash';

const Chat = (props) => {
  return (
    <Grid
      columns="equal"
      className="layout"
      style={{ background: props.colors.secondaryColor }}
    >
      <ColorPanel
        key={_.get(props.user, 'currentUser.name')}
        currentUser={_.get(props.user, 'currentUser')}
        primaryColor={_.get(props.colors, 'primaryColor')}
        secondaryColor={_.get(props.colors, 'secondaryColor')}
      />
      <SidePanel
        key={_.get(props.user, 'currentUser.uid')}
        primaryColor={_.get(props.colors, 'primaryColor')}
        currentUser={_.get(props.user, 'currentUser')}
      />
      <Grid.Column style={{ marginLeft: window.innerWidth > 768 ? 235 : 110 }}>
        <Messages
          key={_.get(props.channel, 'currentChannel.id')}
          currentChannel={_.get(props.channel, 'currentChannel')}
          currentUser={_.get(props.user, 'currentUser')}
          isPrivateChannel={_.get(props.channel, 'isPrivateChannel')}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel
          currentChannel={_.get(props.channel, 'currentChannel')}
          key={_.get(props.channel, 'currentChannel.name')}
          isPrivateChannel={_.get(props.channel, 'isPrivateChannel')}
          userPosts={_.get(props.channel, 'userPosts')}
        />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  channel: state.channel,
  colors: state.colors,
});

export default connect(mapStateToProps)(Chat);
