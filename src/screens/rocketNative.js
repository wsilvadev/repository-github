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
    protection: false,
    opacity1: 1,
    opacity2: 0.2,
    opacity3: 0.2,
    all: true,
    close: false,
    open: false,
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
    const {all, close, open} = this.state;
    if (all === true) {
      this.setState({issue: response.data});
      console.log(this.state.issue);
    } else if (close === true) {
      if (this.state.issue.state === 'closed') {
        this.setState({issue: ''});
      }
    } else if (open === true) {
      if (this.state.issue.state === 'open') {
        this.setState({issue: response.data});
      }
    }
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
            Linking.openURL(`https://github.com/repos/${orgs}/${repos}/issues`)
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
          <TouchableOpacity
            style={Style.ButtonAll}
            onPress={() =>
              this.setState({
                opacity1: 0.8,
                opacity2: 0.2,
                opacity3: 0.2,
                all: true,
                close: false,
                open: false,
              })
            }>
            <Text
              style={{
                margin: 5,
                textAlign: 'center',
                opacity: this.state.opacity1,
              }}>
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.ButtonOpeneds}
            onPress={() =>
              this.setState({
                opacity1: 0.2,
                opacity2: 0.8,
                opacity3: 0.2,
                open: true,
                all: false,
                close: false,
              })
            }>
            <Text
              style={{
                margin: 5,
                textAlign: 'center',
                opacity: this.state.opacity2,
              }}>
              Abertas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.ButtonCloseds}
            onPress={() =>
              this.setState({
                opacity1: 0.2,
                opacity2: 0.2,
                opacity3: 0.8,
                close: true,
                all: false,
                open: false,
              })
            }>
            <Text
              style={{
                margin: 5,
                textAlign: 'center',
                opacity: this.state.opacity3,
              }}>
              Fechadas
            </Text>
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
