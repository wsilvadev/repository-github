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
import Style from '../styles/styleshomeScreen';
import {PacmanIndicator} from 'react-native-indicators';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';
YellowBox.ignoreWarnings([
  'Warning: Async Storage has been extracted from react-native core',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class screens extends Component {
  async componentDidMount() {
    this.renderRepos();
  }
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      OrgRepos: '',
      loading: false,
    };
  }

  saveRepos = async () => {
    this.setState({loading: true});
    const {docs, OrgRepos} = this.state;
    const response = await api.get(`/repos/${OrgRepos}`);
    const newDocs = docs.slice();
    newDocs.push(response.data);

    this.setState({
      docs: newDocs,
      loading: false,
    });
    await AsyncStorage.setItem('orgRepos', JSON.stringify(newDocs));
    console.log(newDocs);
  };
  renderRepos = async () => {
    const element = await AsyncStorage.getItem('orgRepos');

    const values = JSON.parse(element);

    if (values.length >= 0) {
      this.setState({docs: values});
    }
  };
  LoadEnpty = () => {
    if (this.state.loading === true) {
      return <PacmanIndicator />;
    } else if (this.state.docs.length <= 0) {
      return (
        <View style={Style.EmptyView}>
          <Image
            style={Style.EmptyToShow}
            source={{
              uri:
                'https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png',
            }}
          />
          <Text style={Style.TextDescription}>
            You need to add Organizatoin and Repository in the following format
            "organization-name/Repository-name"i.e:facebook/react
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.docs}
          keyExtractor={item => item.node_id}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.1}
        />
      );
    }
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
  removeItem = async id => {
    this.setState({docs: this.state.docs.filter(item => item.id !== id)});
    await AsyncStorage.removeItem(JSON.stringify(id));
    await AsyncStorage.setItem('orgRepos', JSON.stringify(this.state.docs));

    console.log(id);
  };
  renderItem = ({item}) => {
    console.log(item);

    let swiiperoutBtns = [
      {
        text: 'deleter',
        onPress: () => this.removeItem(item.id),
        backgroundColor: 'tranparent',
        component: (
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
            placeholder="Organizaton/Repository"
            style={Style.InputContainer}
            onChangeText={Org_repos =>
              this.setState({OrgRepos: Org_repos.toString()})
            }
          />
          <TouchableOpacity onPress={this.saveRepos.bind(this)}>
            <Text style={Style.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.linhaView} />

        <View>{this.LoadEnpty()}</View>
      </View>
    );
  }
}
