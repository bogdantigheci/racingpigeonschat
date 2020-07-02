import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../../firebase';

const DirectMessages = (props) => {
  const [users, setUsers] = React.useState([]);
  const usersRef = firebase.database().ref('users');
  const connectedRef = firebase.database().ref('.info/connected');
  const presenceRef = firebase.database().ref('presence');

  React.useEffect(() => {
    if (props.currentUser) {
      getUsersList(props.currentUser.uid);
    }
  }, [users.length]);

  const getUsersList = (currentUserUid) => {
    let loadedUsers = [];
    usersRef.on('child_added', (snap) => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';
        loadedUsers.push(user);
        setUsers(loadedUsers);
      }
    });
    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        const ref = presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.error(err);
          }
        });
      }
    });
    presenceRef.on('child_added', (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key);
      }
    });
    presenceRef.on('child_removed', (snap) => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key, false);
      }
    });
  };

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = users.reduce((acc, user) => {
      if (user.uid === userId) {
        user['status'] = `${connected ? 'online' : 'offline'}`;
      }
      return acc.concat(user);
    }, []);
    setUsers(updatedUsers);
  };

  const isUserOnline = (user) => user.status === 'online';

  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" />
          Direct messages
        </span>{' '}
        ({users.length})
      </Menu.Item>
      {users.map((user) => (
        <Menu.Item
          key={user.uid}
          style={{ opacity: 0.7, fontStyle: 'italic' }}
          onClick={() => console.log(user)}
        >
          <Icon name="circle" color={isUserOnline(user) ? 'green' : 'red'} />@{' '}
          {user.name}
        </Menu.Item>
      ))}
    </Menu.Menu>
  );
};

export default DirectMessages;
