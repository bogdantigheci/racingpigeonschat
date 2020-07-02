import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

const MessagesHeader = (props) => {
  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {props.channelName}
          <Icon name={'star outline'} color="black" />
        </span>
        <Header.Subheader>{props.uniquesUsersNo}</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          onChange={props.handleSearchChange}
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search messages"
          value={props.searchTerm}
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;