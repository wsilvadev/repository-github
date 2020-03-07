import AsyncStorage from '@react-native-community/async-storage';

const Keys = {
  orgRepos: 'orgRepos',
};

const Persist = {
  saveRepositories: async repositories =>
    AsyncStorage.setItem(Keys.orgRepos, JSON.stringify(repositories || [])),
  getRepositories: async () => {
    const data = await AsyncStorage.getItem(Keys.orgRepos);

    const repositories = JSON.parse(data) || [];
    return repositories;
  },
};

export default Persist;
