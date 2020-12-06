import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import TodoItem from './TodoItem'
import {GET_TODOS} from '../data/queries'

const TodoList = ({item}) => {

    const {loading, error, data } = useQuery(GET_TODOS)

    if(loading) return <Text>'Loading..'</Text>
    if(error) return <Text>`Error! ${error.message}`</Text>

    return (
        <View style={styles.container}>
            <FlatList
                //data={data.todos}
                data = {data.todos}
                renderItem={({item}) => <TodoItem item={item}/>}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 500,
    }
})

export default TodoList
