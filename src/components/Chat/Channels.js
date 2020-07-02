import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { setCurrentChannel, setPrivateChannel } from '../../actions/channel';
import { connect } from 'react-redux';

const Channels = (props) => {
  const [channels, setChannels] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [channelName, setChannelName] = React.useState('');
  const [channelDetails, setChannelDetails] = React.useState('');
  const [activeChannel, setActiveChannel] = React.useState('');
  const channelsRef = firebase.database().ref('channels');

  React.useEffect(() => {
    getChannels();

    return () => {
      channelsRef.off();
    };
  }, []);

  const getChannels = () => {
    let loadedChannels = [];
    channelsRef.on('child_added', (snap) => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const handleChannelNameOnChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };
  const handleChannelDetailsOnChange = (e) => {
    e.preventDefault();
    setChannelDetails(e.target.value);
  };

  const addChannel = () => {
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: props.currentUser.displayName,
        avatar: props.currentUser.photoURL,
      },
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        setChannelName('');
        setChannelDetails('');
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  const handleActiveChannel = (channel) => {
    setActiveChannel(channel.id);
  };

  const changeChannel = (channel) => {
    handleActiveChannel(channel);
    props.setCurrentChannel(channel);
    props.setPrivateChannel(false);
  };

  const showChannels = (channels) =>
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
    addChannel();
  };
  return (
    <React.Fragment>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>{' '}
          ({channels.length})<Icon name="add" onClick={openModal} />
        </Menu.Item>
        {showChannels(channels)}
      </Menu.Menu>

      <Modal basic open={modalOpen} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Channel Name"
                name="channelName"
                onChange={handleChannelNameOnChange}
                value={channelName}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="Channel Details"
                name="channelDetails"
                onChange={handleChannelDetailsOnChange}
                value={channelDetails}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={handleSubmit} inverted>
            <Icon name="checkmark" />
            Add
          </Button>
          <Button color="red" onClick={closeModal} inverted>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentChannel: (channel) => dispatch(setCurrentChannel(channel)),
  setPrivateChannel: (channel) => dispatch(setPrivateChannel(channel)),
});
export default connect(null, mapDispatchToProps)(Channels);
