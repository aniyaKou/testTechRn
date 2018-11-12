

import React, {Component}  from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import fetchUsers from '../api'

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      isLoading: true
    }
  }
// Montage details utilisateurs
  componentDidMount() {
    fetchUsers(this.props.navigation.state.params.uuid).then(data => {
      this.setState({
        user: data,
        isLoading: false
      })
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

  _displayUser() {
    const { user } = this.state
    
    if (user != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
         <Image
              style={styles.image}
              source={{uri: user.avatar}}
            />
          <Text style={styles.name_text}>{user.username}</Text>
          <Text style={styles.bio_text}>Bio : {user.bio}</Text>
          <Text style={styles.default_text}>job : {user.job}</Text>
          <Text style={styles.default_text}>Phone : {user.phone}</Text>
          <Text style={styles.default_text}>Email : {user.email}</Text>
          <Text style={styles.default_text}>Company : {user.company}</Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayUser()}
      </View>
    )
  }
}

  // Style composants
const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  name_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  bio_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

export default UserDetail