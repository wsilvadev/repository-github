import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  ContainerFlexList: {
    backgroundColor: '#fff',
    height: 80,
    borderRadius: 5,
    margin: 15,
    marginTop: -1,
    flexDirection: 'row',
  },
  ContainerScreenThwo: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  RenderText: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    width: '30%',
  },
  Buttons: {
    flexDirection: 'row',
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#CCC',
  },
  Imagen: {
    width: 50,
    height: 50,
    borderRadius: 30,
    margin: 10,
    marginTop: 15,
  },
  Icon: {
    width: 15,
    height: 15,
    margin: 10,
    marginTop: 35,
  },
  ButtonAll: {
    backgroundColor: '#CCC',
    flex: 1,
    borderRadius: 5,
  },
  ButtonOpeneds: {
    borderRadius: 5,

    flex: 1,
    backgroundColor: '#CCC',
  },
  ButtonCloseds: {
    borderRadius: 5,

    flex: 1,
    backgroundColor: '#CCC',
  },
  TextAll: {
    margin: 5,
    textAlign: 'center',
  },

  TextClosed: {
    margin: 5,
    textAlign: 'center',
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
