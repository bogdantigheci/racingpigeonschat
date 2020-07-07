import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

const MessagesHeader = (props) => {
  return (
    <Segment clearing className="chat_messages_header">
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span className="chat_messages_header_title">
          {props.channelName}
          {!props.isPrivateChannel && (
            <Icon
              name={props.isChannelStarred ? 'star' : 'star outline'}
              color={props.isChannelStarred ? 'yellow' : 'black'}
              onClick={props.handleStar}
            />
          )}
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
          className="search_input"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
