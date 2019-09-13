import React, {Component} from 'react';
import fetch from 'node-fetch';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import Style from '../styles/styles';
import api from '../services/api';

// import { Container } from './styles';

export default class screens extends Component {
  componentDidMount() {
    this.loadObjets();
  }
  state = {
    docs: [],
    text: '',
  };
  loadObjets = async () => {
    const response = await api.get('/repos');
    this.setState({docs: response.data});
    console.log(this.state.docs);

    // const response = await fetch('  https://api.github.com/users/wsilvadev');
  };
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
  renderItem = () => {
    return (
      <View style={Style.ContainerFlexList}>
        {this.state.docs.map(product => (
          <View key={product.id}>
            <Text key={product.id} style={Style.TitleApiName}>
              {product.name}
            </Text>
            {/* <Text style={Style.ApiDescription}>{product.description}</Text> */}
          </View>
        ))}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ScreenNative')}
        />
      </View>
    );
  };
  seachElement = () => {
    const {text} = this.state.text;
  };

  render() {
    return (
      <View style={Style.ContainerMain}>
        <View style={Style.ContainerInput}>
          <TextInput
            placeholder="Adicionar novo repositório"
            style={Style.InputContainer}
            onChangeText={text => this.setState({text: text})}
          />
          <TouchableOpacity
            style={Style.ButtonInput}
            onPress={() => this.seachElement}>
            <Text style={Style.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.linhaView} />
        <View>
          <FlatList
            data={this.state.docs}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.name}
          />
        </View>
      </View>
    );
  }
}
