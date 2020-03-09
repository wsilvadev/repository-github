import React, {Component} from 'react';
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

import api from '../../services/api';
import styles from './style';
import {Urls, Issues} from '../../strings';
YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection']);

// import { Container } from './styles';

export default class issueList extends Component {
  componentDidMount() {
    this.loadIssuesApi(this.state.page);
  }

  constructor(props) {
    super(props);

    this.state = {
      issue: [],
      page: 1,
      opacity1: 1,
      opacity2: 0.3,
      opacity3: 0.3,
      loading: false,
      states: 'all',
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name'),
      headerTitleStyle: styles.headerTitleStyle,
    };
  };

  loadIssuesApi = async (page = 1) => {
    const {navigation} = this.props;
    const orgsRepos = navigation.getParam('textRepos');
    this.setState({loading: true});
    await api
      .get(Urls.issues(orgsRepos, page, this.state.states))
      .then(res => {
        const listItems = this.state.issue;
        const data = listItems.concat(res.data);

        this.setState({
          issue: data.filter(item => item.id !== this.state.issue.id),
          loading: false,
          page: page,
        });
      })
      .catch(error => console.warn(error));
  };

  renderItem = ({item}) => {
    const {navigation} = this.props;

    const orgsRepos = navigation.getParam('textRepos');

    return (
      <View>
        <TouchableOpacity
          style={styles.containerFlexList}
          onPress={() => Linking.openURL(Urls.user(orgsRepos, item.number))}>
          <Image
            source={{
              uri: Urls.avatarIssue(item.user.id),
            }}
            style={styles.image}
          />
          <View style={styles.renderText}>
            <Text
              style={styles.titleApiName}
              numberOfLines={2}
              ellipsizeMode={'middle'}>
              {item.title}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="middle"
              style={styles.apiDescription}>
              {item.user.login}
            </Text>
          </View>
          <Image
            source={{
              uri: Urls.union,
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  loadMore = () => {
    const {page} = this.state;
    const pages = page + 1;

    if (pages <= this.state.issue.length) {
      this.loadIssuesApi(pages);
    } else {
      this.loadIssuesApi(this.state.page);
    }
  };

  loadIssue = () => {
    const {loading, issue} = this.state;
    if (loading && issue.length <= 0) {
      return (
        <View>
          <DotIndicator size={10} color={'#F87d493e'} />
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.issue}
          keyExtractor={item => item.node_id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.4}
        />
      );
    }
  };
  handleAll = () => {
    this.setState({
      states: 'all',
      issue: [],
      opacity1: 1,
      opacity2: 0.3,
      opacity3: 0.3,
      page: 1,
    });
    this.loadIssuesApi(this.state.page);
  };
  handleOpen = () => {
    this.setState({
      states: 'open',
      issue: [],
      opacity1: 0.3,
      opacity2: 1,
      opacity3: 0.3,
      page: 1,
    });
    this.loadIssuesApi(this.state.page);
  };
  handleClose = () => {
    this.setState({
      states: 'closed',
      issue: [],
      opacity1: 0.3,
      opacity2: 0.3,
      opacity3: 1,
      page: 1,
    });
    this.loadIssuesApi(this.state.page);
  };
  render() {
    return (
      <View style={styles.containerScreenThwo}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonAll} onPress={this.handleAll}>
            <Text
              style={[
                styles.textButton,
                {
                  opacity: this.state.opacity1,
                },
              ]}>
              {Issues.all}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOpeneds}
            onPress={this.handleOpen}>
            <Text
              style={[
                styles.textButton,
                {
                  opacity: this.state.opacity2,
                },
              ]}>
              {Issues.open}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCloseds}
            onPress={this.handleClose}>
            <Text
              style={[
                styles.textButton,
                {
                  opacity: this.state.opacity3,
                },
              ]}>
              {Issues.closed}
            </Text>
          </TouchableOpacity>
        </View>
        {this.loadIssue()}
      </View>
    );
  }
}
