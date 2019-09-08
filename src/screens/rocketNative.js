import React, {Component} from 'react';

import Style from '../styles/styles';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';

// import { Container } from './styles';

export default class rocketNative extends Component {
  static navigationOptions = {
    title: 'rocketnative',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow: 1,
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={Style.ContainerScreenThwo}>
        <View style={Style.Buttons}>
          <TouchableOpacity style={Style.ButtonAll}>
            <Text style={Style.TextAll}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.ButtonOpeneds}>
            <Text style={Style.TextOpeneds}>Abertas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.ButtonCloseds}>
            <Text style={Style.TextClosed}>Fechadas</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.ContainerFlexList}>
          <FlatList />
        </View>
      </View>
    );
  }
}
