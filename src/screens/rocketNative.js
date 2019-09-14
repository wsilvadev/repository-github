import React, {Component} from 'react';
import api from '../services/api';
import Style from '../styles/styles';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Linking,
} from 'react-native';

// import { Container } from './styles';

export default class rocketNative extends Component {
  componentDidMount() {
    this.load();
  }
  state = {
    issue: [],
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name'),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        fontWeight: 'bold',
      },
    };
  };
  load = async () => {
    const {navigation} = this.props;
    const repos = navigation.getParam('name');
    const orgs = navigation.getParam('text');

    const response = await api.get(
      `https://api.github.com/repos/${orgs}/${repos}/issues`,
    );
    this.setState({issue: response.data});
    console.log(response);
  };
  renderItem = ({item}) => {
    const {navigation} = this.props;

    const repos = navigation.getParam('name');
    const orgs = navigation.getParam('text');
    return (
      <View style={Style.ContainerFlexList}>
        <Image
          source={{
            uri: `https://avatars3.githubusercontent.com/u/${item.user.id}?v=4`,
          }}
          style={Style.Imagen}
        />
        <View style={Style.RenderText}>
          <Text
            style={Style.TitleApiName}
            numberOfLines={2}
            ellipsizeMode={'middle'}>
            {item.user.login}
          </Text>
          <Text
            numberOfLines={3}
            ellipsizeMode="middle"
            style={Style.ApiDescription}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://github.com/repos/facebook/codemode/issues')
          }>
          <Image source={require('../img/icon.png')} style={Style.Icon} />
        </TouchableOpacity>
      </View>
    );
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
        <View>
          <FlatList
            data={this.state.issue}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}
