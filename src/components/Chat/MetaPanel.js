import React from 'react';
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
} from 'semantic-ui-react';

const MetaPanel = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const getActiveIndex = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  if (props.isPrivateChannel || !props.currentChannel) {
    return null;
  }

  const formatCount = (num) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`;

  const showTopPosters = (posts) =>
    Object.entries(posts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description>{formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);

  return (
    <Segment className="meta_panel">
      <Header as="h3" attached="top">
        About # {props.currentChannel && props.currentChannel.name}
      </Header>
      <Accordion styled attached="true">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={getActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="info" />
          Channel details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {props.currentChannel && props.currentChannel.details}
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={getActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="user circle" />
          Most active users
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <List> {props.userPosts && showTopPosters(props.userPosts)}</List>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={getActiveIndex}
        >
          <Icon name="dropdown" />
          <Icon name="info" />
          Created by
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Header as="h3">
            <Image
              circular
              src={
                props.currentChannel && props.currentChannel.createdBy.avatar
              }
            />
            {props.currentChannel && props.currentChannel.createdBy.name}
          </Header>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

export default MetaPanel;
