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
import {PacmanIndicator} from 'react-native-indicators';
import {async} from 'rxjs/internal/scheduler/async';

// import { Container } from './styles';

export default class rocketNative extends Component {
  componentDidMount() {
    this.loadAllIssueApi(this.state.page);
  }
  state = {
    issue: [],
    issueOpen: [],
    issueClosed: [],
    page: 1,
    pageOpen: 1,
    pageClosed: 1,
    opacity1: 1,
    loading: false,
    bt1: false,
    bt2: false,
    bt3: false,
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
  loadAllIssueApi = async (page = 1) => {
    const {navigation} = this.props;

    const orgsRepos = navigation.getParam('textRepos');
    this.setState({loading: true});
    const response = await api.get(
      `https://api.github.com/repos/${orgsRepos}/issues?page=${page}`,
    );
    const listItems = this.state.issue;
    const data = listItems.concat(response.data);

    this.setState({
      issue: data,
      opacity1: 0.8,
      opacity2: 0.2,
      opacity3: 0.2,
      bt1: true,
      bt2: false,
      bt3: false,
      loading: false,
      page,
    });
  };
  loadOpenIssuesApi = async (pageOpen = 1) => {
    const {navigation} = this.props;
    this.setState({loading: true});

    const orgsRepos = navigation.getParam('textRepos');

    const response = await api.get(
      `https://api.github.com/repos/${orgsRepos}/issues?state=open&page=${pageOpen}`,
    );
    const listItems = this.state.issueOpen;
    const data = listItems.concat(response.data);
    this.setState({
      issueOpen: data,
      loading: false,
      opacity1: 0.2,
      opacity2: 0.8,
      opacity3: 0.2,
      bt1: false,
      bt2: true,
      bt3: false,
      pageOpen,
    });
    console.log(this.state.issueOpen.length);
  };
  loadClosedIssuesApi = async (pageClosed = 1) => {
    const {navigation} = this.props;
    this.setState({loading: true});

    const orgsRepos = navigation.getParam('textRepos');

    const response = await api.get(
      `https://api.github.com/repos/${orgsRepos}/issues?state=closed&page=${pageClosed}`,
    );
    const listItems = this.state.issueClosed;
    const data = listItems.concat(response.data);
    this.setState({
      issueClosed: data,
      loading: false,
      opacity1: 0.2,
      opacity2: 0.2,
      opacity3: 0.8,
      bt1: false,
      bt2: false,
      bt3: true,
      pageClosed,
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
  loadMore = () => {
    const {page, pageOpen, pageClosed, bt1, bt2, bt3} = this.state;
    const pages = page + 1;
    const pageOpens = pageOpen + 1;
    const pageCloseds = pageClosed + 1;
    if (bt1 === true) {
      return this.loadAllIssueApi(pages);
    } else if (bt2 === true) {
      return this.loadOpenIssuesApi(pageOpens);
    } else if (bt3 === true) {
      return this.loadClosedIssuesApi(pageCloseds);
    }
  };
  loadIssue = () => {
    if (this.state.loading === true) {
      return (
        <View>
          <PacmanIndicator />
        </View>
      );
    } else {
      if (this.state.bt1 === true) {
        return (
          <FlatList
            data={this.state.issue}
            keyExtractor={item => item.node_id}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.4}
          />
        );
      } else if (this.state.bt2 === true) {
        return (
          <FlatList
            data={this.state.issueOpen}
            keyExtractor={item => item.node_id}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.4}
          />
        );
      } else if (this.state.bt3 === true) {
        return (
          <FlatList
            data={this.state.issueClosed}
            keyExtractor={item => item.node_id}
            renderItem={this.renderItem}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.4}
          />
        );
      }
    }
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
        <View>{this.loadIssue()}</View>
      </View>
    );
  }
}
