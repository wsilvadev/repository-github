import React, {Component} from 'react';
import api from '../services/api';
import Style from '../styles/StylePage2';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Linking,
  YellowBox,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection']);

// import { Container } from './styles';

export default class rocketNative extends Component {
  componentDidMount() {
    this.loadAllIssueApi(this.state.page);
  }
  constructor(props) {
    super(props);
    this.pressed = false;
    this.pressedClosed = false;
    this.pressedOpen = false;

    this.state = {
      issueOpen: [],
      issueClosed: [],
      issue: [],
      page: 1,
      pageClosed: 1,
      pageOpen: 1,
      opacity1: 1,
      opacity2: 1,
      opacity3: 1,

      loading: false,
      states: 'all',
    };
  }

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
    if (!this.pressed) {
      this.pressed = false;
      const {navigation} = this.props;
      const orgsRepos = navigation.getParam('textRepos');
      this.setState({loading: true});
      await api
        .get(
          `https://api.github.com/repos/${orgsRepos}/issues?page=${page}&state=all`,
        )
        .then(res => {
          const listItems = this.state.issue;
          const data = listItems.concat(res.data);

          this.setState({
            issue: data.filter(item => item.id !== this.state.issue.id),
            loading: false,
            page,
            opacity1: 0.8,
            opacity2: 0.2,
            opacity3: 0.2,
          });
        })
        .catch(error => console.warn(error));
    }
  };
  loadOpenIssue = async (pageOpen = 1) => {
    if (!this.pressedOpen) {
      const {navigation} = this.props;
      const orgsRepos = navigation.getParam('textRepos');
      this.setState({loading: true});
      await api
        .get(
          `https://api.github.com/repos/${orgsRepos}/issues?page=${pageOpen}&state=open`,
        )
        .then(res => {
          const listItems = this.state.issueOpen;
          const data = listItems.concat(res.data);

          this.setState({
            issueOpen: data.filter(item => item.id !== this.state.issueOpen.id),
            loading: false,
            pageOpen,
            opacity1: 0.2,
            opacity2: 0.8,
            opacity3: 0.2,
          });
        })
        .catch(error => console.warn(error));
    }
    this.pressedOpen = true;
  };
  loadClosedIssue = async (pageClosed = 1) => {
    const {navigation} = this.props;
    if (!this.pressedClosed) {
      this.pressedClosed = false;
      const orgsRepos = navigation.getParam('textRepos');
      this.setState({loading: true});
      await api
        .get(
          `https://api.github.com/repos/${orgsRepos}/issues?page=${pageClosed}&state=closed`,
        )
        .then(res => {
          const listItems = this.state.issueClosed;
          const data = listItems.concat(res.data);

          this.setState({
            issueClosed: data.filter(
              item => item.id !== this.state.issueClosed.id,
            ),
            loading: false,
            pageClosed,
            opacity1: 0.2,
            opacity2: 0.2,
            opacity3: 0.8,
          });
        })
        .catch(error => console.warn(error));
    }
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
  loadMoreOpen = () => {
    const {pageOpen} = this.state;

    const pageOpens = pageOpen + 1;
    this.loadOpenIssue(pageOpens);
  };
  loadMoreClosed = () => {
    const {pageClosed} = this.state;
    const pageCloseds = pageClosed + 1;
    this.loadClosedIssue(pageCloseds);
  };
  loadMoreAll = () => {
    const {page} = this.state;
    const pages = page + 1;
    this.loadAllIssueApi(pages);
  };
  loadIssue = () => {
    const {loading, issue} = this.state;
    if (loading === true && issue.length <= 0) {
      return (
        <View>
          <DotIndicator size={10} color={'#F87d493e'} />
        </View>
      );
    } else if (this.state.states === 'all') {
      return (
        <FlatList
          data={this.state.issue}
          keyExtractor={item => item.node_id}
          renderItem={this.renderItem}
          onEndReached={this.loadMoreAll}
          onEndReachedThreshold={0.4}
        />
      );
    } else if (this.state.states === 'open') {
      return (
        <FlatList
          data={this.state.issueOpen}
          keyExtractor={item => item.node_id}
          renderItem={this.renderItem}
          onEndReached={this.loadMoreOpen}
          onEndReachedThreshold={0.4}
        />
      );
    } else if (this.state.states === 'closed') {
      return (
        <FlatList
          data={this.state.issueClosed}
          keyExtractor={item => item.node_id}
          renderItem={this.renderItem}
          onEndReached={this.loadMoreClosed}
          onEndReachedThreshold={0.4}
        />
      );
    }
  };
  render() {
    return (
      <View style={Style.ContainerScreenThwo}>
        <View style={Style.Buttons}>
          <TouchableOpacity
            style={Style.ButtonAll}
            onPress={() => {
              this.setState({
                states: 'all',
              });
              this.loadAllIssueApi();
            }}>
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
            onPress={() => {
              this.setState({
                states: 'open',
              });
              this.loadOpenIssue();
            }}>
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
            onPress={() => {
              this.setState({
                states: 'closed',
              });
              this.loadClosedIssue();
            }}>
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
        {this.loadIssue()}
      </View>
    );
  }
}
