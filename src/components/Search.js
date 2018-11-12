import React from 'react'
import { StyleSheet, View, TextInput, ActivityIndicator, Button, FlatList } from 'react-native'

import UserItem from './UserItem'
import fetchUsers from '../api'

class Search extends React.Component {
constructor(props){
    super(props)
    this.searchedText = "";//initialisation de la recherche vide
    this.state = { 
        users: [],
        searchUsers: [],
        isLoading: false // initialisation loading false pour lancement lors recherche
    }
}

// Montage de la liste utilisateurs
  componentDidMount(){
    fetchUsers().then(data => {
        this.setState({users: data})
    });
  }

  // input 
  _searchTextInputChanged(text) {
    this.searchedText = text;
}
// réinitialisation de la recherche
_searchUserss() {
    this.setState({
        searchUsers: []
    }, () => {
        this._loadUsers()
    })  
}
 // systeme d' icone de loading
_displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

//   chargement de la nouvelle liste utilisateurs
_loadUsers(){
    if (this.searchedText.length > 0) { 
        this.setState({isLoading: true})// Lancement du chargement
        fetchUsers(this.searchedText).then(data => {
            this.setState({
                searchUsers: [ ...this.state.users, ...data ], //  spread
                isLoading: false //Arret du chargement recherche effectuée
            });
        });
    }
}

_displayDetailForUser = (uuid) => {
    this.props.navigation.navigate("UserDetail", {uuid: uuid}) // navigation vers UserDetail
}
    render() {
      return (
        <View style={styles.main_container}>
          <TextInput style={styles.textinput} placeholder='Recherche utilisateur'/>

          <Button style={{ height: 50 }} title='Rechercher' onPress={() => this. _loadUsers()}/>

          <FlatList
            data={this.state.users}
            keyExtractor={(item) => item.uuid.toString()}
            renderItem={({item}) =>
            
            <UserItem user = {item} displayDetailForUser = {this._displayDetailForUser}/>}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (this.state.users.length > 0){
                  this._loadUsers()
                } 
            }}
          />
           {this._displayLoading()}
        </View>
      )
    }
  }

  // Style composants
  const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },    
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    }
  })

  export default Search