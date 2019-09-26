import React, {Component} from 'react';
import api from '../services/api';
import Style from '../styles/styleRocketNative';
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
    this.loadAllIssueApi();
  }
  state = {
    issue: [],
    opacity1: 1,
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
  loadAllIssueApi = async () => {
    const {navigation} = this.props;

    const orgsRepos = navigation.getParam('textRepos');

    const response = await api.get(
      `https://api.github.com/repos/${orgsRepos}/issues`,
    );
    this.setState({
      issue: response.data,
      opacity1: 0.8,
      opacity2: 0.2,
      opacity3: 0.2,
    });
  };
  loadOpenIssuesApi = async () => {
    const {navigation} = this.props;

    const orgsRepos = navigation.getParam('textRepos');

    const response = await api.get(
      `https://api.github.com/repos/${orgsRepos}/issues?state=open`,
    );
    this.setState({
      issue: response.data,
      opacity1: 0.2,
      opacity2: 0.8,
      opacity3: 0.2,
    });
  };
  loadClosedIssuesApi = async () => {
    const {navigation} = this.props;

    const orgsRepos = navigation.getParam('textRepos');

    const response = await api.get(
      `https://api.github.com/repos/${orgsRepos}/issues?state=closed`,
    );
    this.setState({
      issue: response.data,
      opacity1: 0.2,
      opacity2: 0.2,
      opacity3: 0.8,
    });
  };
  renderItem = ({item}) => {
    const {navigation} = this.props;

    const orgsRepos = navigation.getParam('textRepos');
    return (
      <View>
        <TouchableOpacity
          style={Style.ContainerFlexList}
          onPress={() =>
            Linking.openURL(`https://github.com/${orgsRepos}/issues/${
              item.number
            }
`)
          }>
          <Image
            source={{
              uri: `https://avatars3.githubusercontent.com/u/${
                item.user.id
              }?v=4`,
            }}
            style={Style.Imagen}
          />
          <View style={Style.RenderText}>
            <Text
              style={Style.TitleApiName}
              numberOfLines={2}
              ellipsizeMode={'middle'}>
              {item.title}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="middle"
              style={Style.ApiDescription}>
              {item.user.login}
            </Text>
          </View>
          <Image
            source={{
              uri:
                'https://cdn.icon-icons.com/icons2/731/PNG/512/right-arrow-1_icon-icons.com_62892.png',
            }}
            style={Style.Icon}
          />
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
            onPress={this.loadAllIssueApi.bind(this)}>
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
            onPress={this.loadOpenIssuesApi.bind(this)}>
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
            onPress={this.loadClosedIssuesApi.bind(this)}>
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
            keyExtractor={item => item.node_id}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}
