import React, {Component} from 'react';

import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import Style from '../styles/styles';

// import { Container } from './styles';

export default class screens extends Component {
  static navigationOptions = {
    title: 'GitIssues',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow: 1,
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  };
  renderItem = ({Item}) => {
    return (
      <View>
        <Text>Denscinção</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={Style.ContainerMain}>
        <View style={Style.ContainerInput}>
          <TextInput
            placeholder="Adicionar novo repositório"
            style={Style.InputContainer}
          />
          <TouchableOpacity
            style={Style.ButtonInput}
            onPress={() => this.props.navigation.navigate('ScreenNative')}>
            <Text style={Style.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.linhaView} />
        <View style={Style.ContainerFlexList}>
          <FlatList renderItem={this.renderItem} />
        </View>
      </View>
    );
  }
}
