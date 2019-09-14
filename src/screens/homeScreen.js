import React, {Component} from 'react';
import fetch from 'node-fetch';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Style from '../styles/styles';
import api from '../services/api';

// import { Container } from './styles';

export default class screens extends Component {
  componentDidMount() {}
  state = {
    docs: [],
    text: '',
  };
  loadObjets = async () => {
    const text = this.state.text;
    const response = await api.get(`/orgs/${text}/repos`);
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
  renderItem = ({item}) => {
    return (
      <View style={Style.ContainerFlexList}>
        <Image
          source={{
            uri: `https://avatars3.githubusercontent.com/u/${item.id}?v=4`,
          }}
          style={Style.Imagen}
        />
        <View style={Style.RenderText}>
          <Text
            style={Style.TitleApiName}
            numberOfLines={2}
            ellipsizeMode={'middle'}>
            {item.name}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="middle"
            style={Style.ApiDescription}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ScreenNative', {
              name: item.name,
              text: this.state.text.toString(),
            })
          }>
          <Image source={require('../img/icon.png')} style={Style.Icon} />
        </TouchableOpacity>
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
            onChangeText={text => this.setState({text: text})}
          />
          <TouchableOpacity style={Style.ButtonInput} onPress={this.loadObjets}>
            <Text style={Style.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.linhaView} />
        <View>
          <FlatList
            data={this.state.docs}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
    );
  }
}
