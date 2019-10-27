import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  YellowBox,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage';

import Style from './style';
import api from '../../services/api';

YellowBox.ignoreWarnings([
  'Warning: Async Storage has been extracted from react-native core',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);
/**
 *
 * @param {Array<any>} repositories
 */
const saveRepositories = async repositories => {
  await AsyncStorage.setItem('orgRepos', JSON.stringify(repositories || []));
};

const getRepositories = async () => {
  const data = await AsyncStorage.getItem('orgRepos');

  const repositories = JSON.parse(data) || [];
  return repositories;
};
const pushRepository = async (repositories, repository) => {
  const repos = repositories.slice();
  repos.push(repository);
  await saveRepositories(repos);
  return repos;
};
const removeRepository = async (repositories, id) => {
  const repos = repositories.filter(item => item.id !== id);
  await saveRepositories(repos);
  return repos;
};

export default class Home extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      repositoryPath: '',
      isLoading: false,
    };
  }

  async componentDidMount() {
    const repositories = await getRepositories();
    this.setState({repositories});
  }

  handleRepositoryPathChange = repositoryPath =>
    this.setState({repositoryPath});

  handleAddRepositoryPress = async () => {
    this.setState({isLoading: true});
    const {repositories, repositoryPath} = this.state;
    const response = await api.get(`/repos/${repositoryPath}`);
    const newRepositories = await pushRepository(repositories, response.data);

    this.setState({
      repositories: newRepositories,
      isLoading: false,
    });
  };

  renderRepositories = () => {
    if (this.state.isLoading) {
      return <DotIndicator size={10} color={'#F87d493e'} />;
    }

    const EmptyResult = (
      <View style={Style.EmptyView}>
        <Image
          style={Style.EmptyToShow}
          source={{
            uri:
              'https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png',
          }}
        />
        <Text style={Style.TextDescription}>
          You need to add Organizatoin and Repository in the following format:
          "organization-name/repository-name" (i.e: facebook/react)
        </Text>
      </View>
    );

    return (
      <FlatList
        data={this.state.repositories}
        keyExtractor={item => item.node_id}
        renderItem={this.renderItem}
        ListEmptyComponent={EmptyResult}
        onEndReachedThreshold={0.1}
      />
    );
  };

  removeItem = async id => {
    const repositories = await removeRepository(this.state.repositories, id);
    this.setState({
      repositories,
    });
  };

  renderItem = ({item}) => {
    let swiiperoutBtns = [
      {
        text: 'deleter',
        onPress: this.removeItem.bind(this, item.id),
        backgroundColor: 'tranparent',
        component: (
          // TODO: test without View
          <View>
            <Image
              source={{
                uri:
                  'https://cdn.icon-icons.com/icons2/1572/PNG/512/3592821-garbage-can-general-office-recycle-bin-rubbish-bin-trash-bin-trash-can_107760.png',
              }}
              style={Style.IconTash}
            />
          </View>
        ),
      },
    ];
    return (
      <Swipeout right={swiiperoutBtns}>
        <TouchableOpacity
          style={Style.ContainerFlexList}
          onPress={() =>
            this.props.navigation.navigate('ScreenNative', {
              name: item.name,
              textRepos: item.full_name,
            })
          }>
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
              {item.organization.login}
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
      </Swipeout>
    );
  };

  render() {
    return (
      <View style={Style.ContainerMain}>
        <View style={Style.ContainerInput}>
          <TextInput
            placeholder="organizaton/repository"
            style={Style.InputContainer}
            onChangeText={this.handleRepositoryPathChange}
          />
          <TouchableOpacity onPress={this.handleAddRepositoryPress}>
            <Text style={Style.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.linhaView} />
        {this.renderRepositories()}
      </View>
    );
  }
}
