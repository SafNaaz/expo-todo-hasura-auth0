import React from "react";
import PropTypes from "prop-types"
import { Button } from "react-native";

export default function Auth({onLogin}) {
  return <Button title="Login" onPress={onLogin}/>;
}

Auth.propTypes ={
    onLogin : PropTypes.func
}
