import Reactotron, {asyncStorage} from 'reactotron-react-native';

Reactotron.configure() // we can use plugins here -- more on this later
  .use(asyncStorage({ignore: ['secret']})) // <--- here we go!
  .connect({
    enabled: true,
    host: '192.168.1.200', // server ip
    port: 9090,
  });
