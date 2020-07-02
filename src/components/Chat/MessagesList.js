import React from 'react';
import { Comment, Image } from 'semantic-ui-react';
import moment from 'moment';

const MessagesList = (props) => {
  const isOwnMessage = (message, user) => {
    return message.user.id === user.uid ? 'own_message' : '';
  };

  const hasImage = (message) => {
    return (
      message.hasOwnProperty('image') && !message.hasOwnProperty('content')
    );
  };

  const getMessageTime = (timestamp) => moment(timestamp).fromNow();

  return (
    props.messagesList &&
    props.messagesList.map((message) => (
      <Comment key={message.timestamp}>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content>
          <Comment.Author as="a">{message.user.name}</Comment.Author>
          <Comment.Metadata>
            {getMessageTime(message.timestamp)}
          </Comment.Metadata>

          {hasImage(message) ? (
            <Image src={message.image} className="message_image" />
          ) : (
            <Comment.Text className={isOwnMessage(message, props.currentUser)}>
              {message.content}
            </Comment.Text>
          )}
        </Comment.Content>
      </Comment>
    ))
  );
};
export default MessagesList;
