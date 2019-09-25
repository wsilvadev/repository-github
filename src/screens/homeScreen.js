import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  YellowBox,
} from 'react-native';
import Style from '../styles/styles';
import api from '../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { async } from 'rxjs/internal/scheduler/async';
YellowBox.ignoreWarnings([
  'Warning: Async Storage has been extracted from react-native core',
]);

// import { Container } from './styles';

export default class screens extends Component {
  async componentDidMount() {
    this.renderRepos();
  }
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      OrgRepos: '',
    };
  }
  saveRepos = async () => {
    const { docs, OrgRepos } = this.state;
    const response = await api.get(`/repos/${OrgRepos}`);
    const position = docs.length;

    docs[position] = response.data;
    this.setState({
      docs: [...docs],
    });
    await AsyncStorage.setItem('orgRepos', JSON.stringify(docs));

    console.log(this.state.docs);

    // const response = await fetch('  https://api.github.com/users/wsilvadev');
  };
  renderRepos = async () => {
    const element = await AsyncStorage.getItem('orgRepos');

    if (element !== null) {
      const values = JSON.parse(element);
      this.setState({ docs: values });
      console.log(this.state.docs);
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
  renderItem = ({ item }) => {
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
            {item.organization.login}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ScreenNative', {
              name: item.name,
              textRepos: item.full_name,
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
            onChangeText={Org_repos =>
              this.setState({ OrgRepos: Org_repos.toString() })
            }
          />
          <TouchableOpacity style={Style.ButtonInput} onPress={this.saveRepos}>
            <Text style={Style.textButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.linhaView} />
        <ScrollView>
          <FlatList
            data={this.state.docs}
            keyExtractor={item => item.node_id}
            renderItem={this.renderItem}
            onEndReachedThreshold={0.1}
          />
        </ScrollView>
      </View>
    );
  }
}
