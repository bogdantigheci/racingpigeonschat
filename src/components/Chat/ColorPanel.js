import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setColors } from '../../actions/colors';
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';
import { SliderPicker } from 'react-color';

const ColorPanel = (props) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [primary, setPrimary] = React.useState('');
  const [secondary, setSecondary] = React.useState('');
  const usersRef = firebase.database().ref('users');
  const [userColors, setUserColors] = React.useState([]);

  React.useEffect(() => {
    if (props.currentUser) {
      addListener(props.currentUser.uid);
    }
  }, [props.currentUser, userColors.length]);

  const addListener = (userId) => {
    let userColors = [];
    usersRef.child(`${userId}/colors`).on('child_added', (snap) => {
      userColors.unshift(snap.val());
      setUserColors(userColors);
    });
  };

  const handleChangePrimary = (color) => setPrimary(color.hex);

  const handleChangeSecondary = (color) => setSecondary(color.hex);

  const handleSaveColors = () => {
    if (primary && secondary) {
     
      saveColors(primary, secondary);
    }
  };

  const saveColors = (primary, secondary) => {
    props.currentUser &&
      usersRef
        .child(`${props.currentUser.uid}/colors`)
        .push()
        .update({
          primary,
          secondary,
        })
        .then(() => {
          closeModal();
        })
        .catch((err) => console.error(err));
  };

  const displayUserColors = (colors) =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className="color_container"
          onClick={() => props.setColors(color.primary, color.secondary)}
        >
          <div className="color_square" style={{ background: color.primary }}>
            <div
              className="color_overlay"
              style={{ background: color.secondary }}
            />
          </div>
        </div>
      </React.Fragment>
    ));

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);
  return (
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="very thin"
    >
      <Divider />
      <Button icon="add" size="small" color="blue" onClick={openModal} />
      {displayUserColors(userColors)}

      <Modal basic open={modalOpen} onClose={closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment inverted>
            <Label content="Primary Color" />
            <SliderPicker color={primary} onChange={handleChangePrimary} />
          </Segment>

          <Segment inverted>
            <Label content="Secondary Color" />
            <SliderPicker color={secondary} onChange={handleChangeSecondary} />
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSaveColors}>
            <Icon name="checkmark" /> Save Colors
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Sidebar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setColors: (primaryColor, secondaryColor) =>
    dispatch(setColors(primaryColor, secondaryColor)),
});

export default connect(null, mapDispatchToProps)(ColorPanel);
