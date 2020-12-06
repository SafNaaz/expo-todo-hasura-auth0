import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import TodoItem from './TodoItem'

const TodoList = ({item}) => {
    return (
        <View style={styles.container}>
            <FlatList
                //data={data.todos}
                data = {[
                    {id:1, text: 'bla bla bla'},
                    {id:2, text: 'bla blu bla'},
                    {id:3, text: 'bla ble bla'},
                ]}
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
