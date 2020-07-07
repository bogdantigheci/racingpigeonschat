import React from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types';

const FileUploadModal = (props) => {
  const [file, setFile] = React.useState(null);
  const authorizedTypes = ['image/jpeg', 'image/png'];

  const addFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const sendFile = () => {
    if (file !== null) {
      if (isAuthorizedType(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        props.uploadFile(file, metadata);
        props.closeModal();
        setFile(null);
      }
    }
  };

  const isAuthorizedType = (filename) =>
    authorizedTypes.includes(mime.lookup(filename));

  return (
    <Modal basic open={props.modal} onClose={props.closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          onChange={addFile}
          fluid
          label="File types: jpg, png"
          name="file"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={sendFile} color="green" inverted>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={props.closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileUploadModal;
