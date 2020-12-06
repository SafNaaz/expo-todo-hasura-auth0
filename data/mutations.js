import gql from "graphql-tag"

export const INSERT_USER = gql`
    mutation($id:String, $name: String) {
        insert_users(objects : [{ id: $id, name: $name }]){
            affected_rows
        }
    }
`

export const INSERT_TODO = gql`
    mutation($text: String){
        insert_todos(objects: {text: $text}){
            returning{
                id
                text
                is_completed
            }
        }
    }
`