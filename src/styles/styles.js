import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  ContainerMain: {
    backgroundColor: '#ddd',
    flex: 1,
  },
  ContainerInput: {
    flexDirection: 'row',
  },
  InputContainer: {
    backgroundColor: 'white',
    margin: 20,
    height: 40,
    width: '80%',
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
  ButtonInput: {
    backgroundColor: '#ddd',
    marginTop: 18,
  },
  textButton: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  ContainerFlexList: {
    height: 70,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 5,
    flexDirection: 'column',
    marginTop: 1,
  },
  //Segunda tela de Navegação
  //#########################################################################################
  ContainerScreenThwo: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  Buttons: {
    flexDirection: 'row',
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#CCC',
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
  TextOpeneds: {
    margin: 5,
    textAlign: 'center',
  },
  TextClosed: {
    margin: 5,
    textAlign: 'center',
  },
  TitleApiName: {
    fontSize: 10,
  },
});
export default Styles;
