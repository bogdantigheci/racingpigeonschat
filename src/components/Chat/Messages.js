import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import firebase from '../../firebase';

const Messages = (props) => {
  const messagesRef = firebase.database().ref('messages');
  const privateMessagesRef = firebase.database().ref('privateMessages');
  const [messagesList, setMessagesList] = React.useState([]);
  const [messagesLoading, setMessagesLoading] = React.useState(true);
  const [uniquesUsersNo, setUniquesUsersNo] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    if (props.currentChannel) {
      getMessages(props.currentChannel.id);
    }
  }, [messagesList.length]);

  const getMessages = (channelId) => {
    let loadedMessages = [];
    const ref = getMessagesRef();
    ref.child(channelId).on('child_added', (snap) => {
      loadedMessages.push(snap.val());
      setMessagesList(loadedMessages);
      setMessagesLoading(false);
      displayUniqueUsers(loadedMessages);
    });
  };

  const getMessagesRef = () => {
    return props.privateChannel ? privateMessagesRef : messagesRef;
  };

  const displayChannelName = (channel) => {
    return channel
      ? `${props.isPrivateChannel ? '@' : '#'}${channel.name}`
      : '';
  };
  const displayUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((usersInChannel, message) => {
      if (!usersInChannel.includes(message.user.name)) {
        usersInChannel.push(message.user.name);
      }
      return usersInChannel;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const noOfUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
    setUniquesUsersNo(noOfUsers);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setSearchLoading(true);

    handleSearchMessages();
  };

  const handleSearchMessages = () => {
    const regex = new RegExp(searchTerm, 'gi');
    const result = messagesList.reduce((acc, message) => {
      if (message.content && message.content.match(regex)) {
        acc.push(message);
      }
      return acc;
    }, []);
    setSearchResults(result);
  };

  return (
    <React.Fragment>
      {props.currentChannel ? (
        <React.Fragment>
          <MessagesHeader
            channelName={displayChannelName(props.currentChannel)}
            uniquesUsersNo={uniquesUsersNo}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            isPrivateChannel={props.isPrivateChannel}
          />
          <Segment>
            <Comment.Group className="messages">
              {searchTerm ? (
                <MessagesList
                  messagesList={searchResults}
                  currentUser={props.currentUser}
                />
              ) : (
                <MessagesList
                  messagesList={messagesList}
                  currentUser={props.currentUser}
                />
              )}
            </Comment.Group>
          </Segment>
          <MessageForm
            messagesRef={messagesRef}
            currentChannel={props.currentChannel}
            currentUser={props.currentUser}
            updateMessages={getMessages}
            isPrivateChannel={props.isPrivateChannel}
            getMessagesRef={getMessagesRef}
          />
        </React.Fragment>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50%' }}>
          Select a channel
        </div>
      )}
    </React.Fragment>
  );
};

export default Messages;
