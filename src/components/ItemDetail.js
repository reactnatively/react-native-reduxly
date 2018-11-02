import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class Item extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: `Item ${navigation.state.params.item}`
  })

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => console.log('will focus')),
      this.props.navigation.addListener('willBlur', () => console.log('will blur')),
      this.props.navigation.addListener('didFocus', () => console.log('did focus')),
      this.props.navigation.addListener('didBlur', () => console.log('did blur')),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(s => s.remove())
  }

  goToRandomItem = () => {
    const items = ['one', 'two', 'three', 'four', 'five']
    const rand = Math.floor(Math.random() * 5)
    this.props.navigation.navigate('ItemDetail', { item: items[rand], index: rand })
  }

  render() {
    const { item, index } = this.props.navigation.state.params
    return (
      <View style={[styles.container, { backgroundColor: `#${index}${index}${index}`}]}>
        <Text style={styles.text}>{`I'm item ${item} detail!`}</Text>
        <TouchableOpacity style={{ backgroundColor: 'purple', margin: 10, padding: 10 }} onPress={this.goToRandomItem}>
          <Text style={styles.text}>Go to random item</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  }
})
