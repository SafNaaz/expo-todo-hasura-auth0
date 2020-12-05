import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Auth from "./src/Auth";
import Main from "./src/Main";
import { ID_TOKEN_KEY } from "./config"

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    handleLogin()
  }, [])

  const handleLogin = () =>{
    SecureStore.getItemAsync(ID_TOKEN_KEY).then(session =>{
      if(session){
        const sessionObj = JSON.parse(session)
        const { exp, token } = sessionObj
        if(exp > Math.floor(new Date().getTime() / 1000)){
          setToken(token)
        }
      }
    })
  }

  return (
    <View style={styles.container}>
      {token && <Main token={token}/>}
        <Auth
          token={token}
          onLogin={handleLogin}
          onLogout={() => {
            setToken(null);
          }}
        />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
