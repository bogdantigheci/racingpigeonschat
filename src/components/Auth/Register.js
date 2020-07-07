import React from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errors, setErrors] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const usersRef = firebase.database().ref('users');

  const saveUser = (createdUser) => {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`,
          })
          .then(() => {
            saveUser(createdUser).then(() => {
              console.log('');
            });
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setErrors(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        setErrors(err.message);
        setLoading(false);
      });
    setErrors('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleInputError = (errors, inputName) => {
    return errors.includes(inputName) ? 'error' : '';
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="layout">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="blue" textAlign="center">
          <Icon name="wechat" color="blue" />
          Register for Racing Pigeons Chat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              className={handleInputError(errors, 'email')}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              className={handleInputError(errors, 'password')}
            />
            <Form.Input
              fluid
              name="confirmPassword"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              value={confirmPassword}
              className={handleInputError(errors, 'confirmPassword')}
            />
            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color="blue"
              fluid
              size="large"
            >
              Submit
            </Button>
            <Message>
              Already a user? <Link to="/login">Login</Link>
            </Message>
          </Segment>
        </Form>
        {errors.length ? (
          <Message error>
            <h3>Error</h3>
            {errors}
          </Message>
        ) : null}
      </Grid.Column>
    </Grid>
  );
};

export default Register;
