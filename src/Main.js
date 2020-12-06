import React, {useState, useEffect } from "react";
import PropTypes from "prop-types"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import { StyleSheet, Text, View } from "react-native";
import { GRAPHQL_ENDPOINT } from '../config'
import {insertUsers} from '../data/mutations'

const Main = ({token, user}) => {

  const [client, setClient] = useState(null)

  useEffect(()=>{

    const {id, name, isNewUser} = user

    const client = new ApolloClient({
        uri: GRAPHQL_ENDPOINT,
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

    if(isNewUser){
      client.mutate({
        mutation: insertUsers,
        variables: {id, name}
      })
    }

    setClient(client)
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
