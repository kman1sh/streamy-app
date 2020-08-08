import React from "react";
import { Field, reduxForm } from "redux-form";
// Field is compoment: to defined types of field and other configurations.
// reduxForm is function: kind of connect function from 'react-redux'
import { connect } from "react-redux";

import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      // <input
      //   onChange={formProps.input.onChange}
      //   value={formProps.input.value}
      // />
      //ShortHand Code:
      // <input {...formProps.input} />
      //this will destructure and assign all input property to <input> element
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  //this this onSumbit callback fn is now not pass into jsx onSumbit redirectly but we will pass it to the handleSumbit fn, provided by redux form props. no need to write event.preventDefault() or pass event obj inside onSubmit function.
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };
  /* the field compoment has no idea how to render some type of input
        element, so it doesn't know how to show a text input or checkbox,
        dropdown menu etc. to do so we have to define a property called
        "component" which can be either "react compoment" or func. this "react
        compoment" or "func" needs to some element that we want to show on the
        screen example an input box. */
  /**
   * Whenever we pass a props to Field component, jiske baare m Field component ko koi idea nai hai, then it will simply take that props and pass it into the renderInput func we are using right now.
   * meta.touched show if user did any intraction with the input field or not. so touched props is set when user ne input enter krke, input field se bahar aa jaye.
   */
  render() {
    console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//validate by default is called on every render or anytime user interract with
//form.Now to get this error messages to appear on the screen, redux form is going to take
// a look at every Field Component Defined above and matches it error object property name.
//agr dono match ho gye then it redux form pass this error obj to that Field component  renderInput
// method (inside meta props ) jo humne upr defined kra hai. now here it is upto us ki hum iss error msg ko kaha show karana chahte hai.
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate: validate,
})(StreamCreate);

export default connect(null, { createStream: createStream })(formWrapped);
