import React from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser } from '../../actions/user';

const UserPanel = (props) => {
  const dropDownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed in as{' '}
          <strong>{props.currentUser && props.currentUser.displayName}</strong>
        </span>
      ),

      disabled: true,
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>,
    },
    {
      key: 'signout',
      text: <span onClick={handleSignOut}>Sign out</span>,
    },
  ];

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signed out');
        props.clearUser();
      });
  };

  return (
    <Grid style={{ background: 'blue' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2rem', margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>Racing Pigeons Chat</Header.Content>
          </Header>
          <Header style={{ padding: '0.25rem' }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={props.currentUser && props.currentUser.photoURL}
                    spaced="right"
                    avatar
                  />
                  {props.currentUser && props.currentUser.displayName}
                </span>
              }
              options={dropDownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(clearUser()),
});

export default connect(null, mapDispatchToProps)(UserPanel);
