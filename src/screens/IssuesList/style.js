import {StyleSheet} from 'react-native';
import {colors, layouts, spacing} from '../../styles';

const Styles = StyleSheet.create({
  containerFlexList: {
    ...layouts.centered,
    ...layouts.flexRow,
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: spacing.moderate.size_10,
  },
  containerScreenThwo: {
    ...layouts.container,
    backgroundColor: colors.lightGray,
  },
  renderText: {
    ...layouts.container,
  },
  buttons: {
    ...layouts.flexRow,
    margin: spacing.moderate.size_20,
    borderRadius: 5,
    backgroundColor: colors.gainsboro,
  },
  image: {
    width: spacing.moderate.size_42,
    height: spacing.moderate.size_42,
    margin: spacing.moderate.size_10,
    borderRadius: 30,
  },
  icon: {
    width: spacing.moderate.size_14,
    height: spacing.moderate.size_14,
    margin: spacing.moderate.size_10,
  },
  buttonAll: {
    ...layouts.container,
    backgroundColor: colors.gainsboro,
    borderRadius: 5,
  },
  buttonOpeneds: {
    ...layouts.container,
    borderRadius: 5,
    backgroundColor: colors.gainsboro,
  },
  buttonCloseds: {
    ...layouts.container,
    borderRadius: 5,
    backgroundColor: colors.gainsboro,
  },
  apiDescription: {
    fontSize: spacing.moderate.size_10,
    opacity: 0.4,
  },
  headerTitleStyle: {
    flexGrow: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Styles;
