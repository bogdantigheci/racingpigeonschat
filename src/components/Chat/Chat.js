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
    <Grid columns="equal" className="layout" style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel
        key={_.get(props.user, 'currentUser.uid')}
        currentUser={_.get(props.user, 'currentUser')}
      />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={_.get(props.channel, 'currentChannel.id')}
          currentChannel={_.get(props.channel, 'currentChannel')}
          currentUser={_.get(props.user, 'currentUser')}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  channel: state.channel,
});

export default connect(mapStateToProps)(Chat);
