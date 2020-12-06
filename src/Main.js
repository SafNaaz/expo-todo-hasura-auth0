import React, {useState, useEffect } from "react";
import PropTypes from "prop-types"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import { StyleSheet, Text, View } from "react-native";
import { GRAPHQL_ENDPOINT } from '../config'

const Main = ({token, user}) => {

  const [client, setClient] = useState(null)

  useEffect(()=>{
    setClient(
      new ApolloClient({
        uri: GRAPHQL_ENDPOINT,
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    )
  },[])

  if(!client){
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ApolloProvider client={client}>
      <View>
        <Text>Welcome {user.name}</Text>
      </View>
    </ApolloProvider>
  )

}

Main.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default Main
