import {StyleSheet} from 'react-native';
import {black} from 'ansi-colors';

const Styles = StyleSheet.create({
  ContainerMain: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  ContainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputContainer: {
    backgroundColor: 'white',
    margin: 15,
    height: 45,
    width: '82%',
    fontSize: 15,
    borderRadius: 5,
    paddingLeft: 15,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  linhaView: {
    height: 1,
    backgroundColor: '#CCC',
    margin: 20,
    marginTop: -3,
  },

  textButton: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  ContainerFlexList: {
    backgroundColor: '#fff',
    height: 80,
    borderRadius: 5,
    margin: 15,
    marginTop: -1,
    flexDirection: 'row',
  },
  RenderText: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    width: '30%',
  },
  EmptyView: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 100,
  },
  EmptyToShow: {
    width: 100,
    height: 100,
    opacity: 0.3,
  },
  Imagen: {
    width: 50,
    height: 50,
    borderRadius: 30,
    margin: 10,
    marginTop: 15,
  },
  IconTash: {
    width: 42,
    height: 42,
    margin: 18,
  },
  TextDescription: {
    fontSize: 15,
    opacity: 0.6,
    paddingLeft: 20,
  },
  Icon: {
    width: 15,
    height: 15,
    margin: 10,
    marginTop: 35,
  },
  TitleApiName: {
    fontSize: 15,
  },
  ApiDescription: {
    fontSize: 10,
    opacity: 0.4,
  },
});
export default Styles;
