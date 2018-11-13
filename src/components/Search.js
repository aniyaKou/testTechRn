import React from 'react'
import { StyleSheet, View, TextInput, ActivityIndicator, Button, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { initDataUsers } from '../actions/users'
import UserItem from './UserItem'


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = "";//initialisation de la recherche vide
    this.state = {
        isLoading: false // par defaut il n'y a pas de chargement
    }
}


// Montage de la liste utilisateurs
  componentDidMount(){
    this.props.initDataUsers()
  }
  _searchTextInputChanged(text) {
    this.searchedText = text;
}
_searchUsers() {
  this.setState({
      users: [] // reinitialise la recherche
  }, () => {
      this._loadUsers()
  })  
}

_loadUsers(){
  if (this.searchedText.length > 0) { 
      this.setState({isLoading: true})// Lancement du chargement
      initDataUsers(this.searchedText).then(data => {
          this.setState({
              users: [  ...data ], // ajout des films en spread
              isLoading: false //Arret du chargement
          });
      });
  }
}
  _displayDetailForUser = (uuid) => {
    this.props.navigation.navigate("UserDetail", {uuid: uuid}) // navigation dvers UserDetail
}

_displayLoading() { // systeme de icone loading
  if (this.state.isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}
    render() {
      return (
        <View style={styles.main_container}>
          <TextInput style={styles.textinput} 
          placeholder='Recherche utilisateur'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          />

          <Button style={{ height: 50 }} title='Rechercher' onPress={() => this. _searchUsers()}/>

          <FlatList
            data={this.props.users}
            keyExtractor={(item) => item.uuid.toString()}
            renderItem={({item}) =>
             <UserItem 
             user={item}
             displayDetailForUser = {this._displayDetailForUser}/>}
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
const mapStateToProps = (state) => {

    return {
        users: state.users

    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({initDataUsers}, dispatch)
})

  export default connect(mapStateToProps, mapDispatchToProps)(Search)