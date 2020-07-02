import React from 'react';
import './index.css';
import { Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import { setUser, clearUser } from './actions/user';
import { connect } from 'react-redux';

const App = ({ setUser, clearUser, history }) => {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        clearUser();
        history.push('/login');
      }
    });
  }, []);

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Chat} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
