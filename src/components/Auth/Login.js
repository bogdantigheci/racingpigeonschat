import React from 'react';
import firebase from '../../firebase';
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
import { connect } from 'react-redux';
import { setUser } from '../../actions/user';
import Spinner from '../utils/Spinner';

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((signedInUser) => {
        props.setUser(signedInUser);
        setLoading(false);
      })
      .catch((err) => {
        setErrors(errors.concat(err));
        setLoading(false);
      });
  };

  const handleInputError = (errors, inputName) => {
    return errors.includes(inputName) ? 'error' : '';
  };

  return props.isLoading ? (
    <Spinner />
  ) : (
    <Grid textAlign="center" verticalAlign="middle" className="layout">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="blue" textAlign="center">
          <Icon name="wechat" color="blue" />
          Login to Racing Pigeons Chat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
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

            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color="blue"
              fluid
              size="large"
            >
              Log in
            </Button>
            <Message>
              Don't have an account? <Link to="/register">Register</Link>
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

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
