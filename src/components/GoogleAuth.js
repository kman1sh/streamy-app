import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      //async init call
      window.gapi.client
        .init({
          clientId:
            "205626243888-4f49s1t4k2fru5l0n4786ieofn1aflhu.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // get auth instance after successful init with client details and saving it on a referance on compoment level.
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen() is func that take a call back function. Anytime user authentication status changed (isSignedIn), this listen func will invoke our callback function tooo.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapstateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapstateToProps, { signIn, signOut })(GoogleAuth);
