import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  //this this onSumbit callback fn is now not pass into jsx onSumbit directly but we will pass it to the handleSumbit fn, provided by redux form props. no need to write event.preventDefault() or pass event obj inside onSubmit function.
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };
  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream: createStream })(StreamCreate);
