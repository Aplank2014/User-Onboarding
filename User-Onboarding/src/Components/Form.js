import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
  // temporary state used to display response from API. this is not a commonly used convention
  const [post, setPost] = useState([]);

  // server error
  const [serverError, setServerError] = useState("");

  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: true
  });

  // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error
  const [errors, setErrors] = useState({
    name: "", // strings describing error that has occured, set from yup in schema when invalid
    email: "",
    password: "",
    terms: ""
  });

  // Schema used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"), // must include name or else error
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email"), // must have string present, must be of the shape of an email
      password: yup.string().required("Password is a required field"), // must include password or else error
      terms: yup.boolean().oneOf([true], "Please agree to terms to continue")
  });

  // whenever state updates, validate the entire form. if valid, then change button to be enabled.
  useEffect(() => {
    console.log(
      "checking to see if all values in form state follows the rules set in formSchema"
    );
    formSchema.isValid(formState).then(isFormValid => {
      console.log("is form valid?", isFormValid);
      // <expression> ? <execute true logic> : <execute the false logic> ---> ternary

      // if the form is valid, and we take the opposite --> we do not want disabled btn
      // if the form is invalid (false) and we take the opposite (!) --> we will disable the btn
      setButtonDisabled(!isFormValid); // disabled= false if form is valid
    });
  }, [formState]);

  // onSubmit function
  const formSubmit = e => {
    e.preventDefault(); // <form> onSubmit has default behavior from HTML!

    // send out POST request with obj as second param, for us that is formState.
    // trigger .catch by changing URL in post to something invalid like "a"
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        // update temp state with value from API to display in <pre>
        setPost(res.data);
        console.log("successful API POST!");

        // clear state, could also use 'initialState' here
        setFormState({
          name: "",
          email: "",
          password: "",
          terms: true
        });

        // if successful request, clear any server errors
        setServerError(null);
      })
      .catch(err => {
        // this is where we could create a server error in the form! if API request fails, say for authentication (that user doesn't exist in our DB),
        // set serverError
        setServerError("oops! something happened!");
      });
  };

  // inline validation, validating one key/value pair at a time
  const validateChange = e => {
    // get the value out of schema at key "e.target.name" --> "name="
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value) // value in input
      .then(inputIsValid => {
        // if inputIsValid is true, then erase any errors in error state at that key/value in errors
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        // if failing validation, set error in state
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  // onChange function
  const inputChange = e => {
    // use persist with async code
    e.persist(); // necessary because we're passing the event asyncronously and we need it to exist even after this function completes (which will complete before validateChange finishes)
    

    let checkboxVal = true;

    if (e.target.name === "terms") {
      checkboxVal = e.target.checked;
    } else {
      checkboxVal = formState.terms;
    }

    const newFormData = {
      ...formState,
      terms: checkboxVal,
      [e.target.name]:
        e.target.name === "terms" ? e.target.checked : e.target.value // // remember value of the checkbox is in "checked" and all else is "value"
    };

    validateChange(e); // for each change in input, do inline validation
    setFormState(newFormData); // update state with new data
  };

  return (
    <form onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          onChange={inputChange}
          value={formState.name}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <br></br>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          onChange={inputChange}
          value={formState.email}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <br></br>
      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          value={formState.password}
          onChange={inputChange}
        />
      </label>
      <br></br>
      
      <label htmlFor="terms" className="terms">
        <input
          id="terms"
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms and Conditions
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </label>
      <br></br>
      <br></br>
      <button type="submit" disabled={buttonDisabled}>
        Submit
      </button>
    </form>
  );
}
