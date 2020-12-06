import React from "react";
import PropTypes from "prop-types";
import { Button, Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as Random from "expo-random";
import * as SecureStore from "expo-secure-store";
import jwtDecoder from "jwt-decode";
import queryString from "query-string";
import {
  AUTH_CLIENT_ID,
  AUTH_DOMAIN,
  AUTH_NAMESPACE,
  ID_TOKEN_KEY,
  NONCE_KEY,
} from "../config";

const generateNonce = async () => {
  const nonce = String.fromCharCode.apply(
    null,
    await Random.getRandomBytesAsync(16)
  );
  await SecureStore.setItemAsync(NONCE_KEY, nonce);
  return nonce;
};

const Auth = ({ token, onLogin, onLogout }) => {
  const handleLoginPress = async () => {
    const nonce = await generateNonce();
    AuthSession.startAsync({
      authUrl:
        `${AUTH_DOMAIN}/authorize?` +
        queryString.stringify({
          client_id: AUTH_CLIENT_ID,
          response_type: "id_token",
          scope: "openid profile email",
          redirect_uri: AuthSession.getDefaultReturnUrl("redirect"),
          nonce,
        }),
    }).then((result) => {
      if (result.type === "success") {
        decodeToken(result.params.id_token);
      } else if (result.params && result.params.error) {
        Alert.alert(
          "Error",
          result.params.error_description ||
            "Something went wrong while logging in."
        );
      }
    });
  };

  const decodeToken = (token) => {
    const decodedToken = jwtDecoder(token);
    const { nonce, sub, email, name, exp } = decodedToken;

    SecureStore.getItemAsync(NONCE_KEY).then((storedNonce) => {
      if (nonce == storedNonce) {
        // save token and login
        SecureStore.setItemAsync(
          ID_TOKEN_KEY,
          JSON.stringify({
            id: sub,
            email,
            name,
            exp,
            token,
          })
        ).then(() => onLogin(decodeToken[AUTH_NAMESPACE].isNewUser));
      } else {
        Alert.alert("Error", "Nonces don't match");
        return;
      }
    });
  };

  const handleLogoutPress = () =>{
    SecureStore.deleteItemAsync(ID_TOKEN_KEY).then(onLogout)
  }

  return token ? (
    <Button title="Logout" onPress={handleLogoutPress} />
  ) : (
    <Button title="Login" onPress={handleLoginPress} />
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

export default Auth;
