import {StyleSheet} from 'react-native';
import {colors, layouts, spacing} from '../../styles';

const Styles = StyleSheet.create({
  ContainerFlexList: {
    ...layouts.centered,
    ...layouts.flexRow,
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: spacing.moderate.size_10,
  },
  ContainerScreenThwo: {
    ...layouts.container,
    backgroundColor: colors.lightGray,
  },
  RenderText: {
    ...layouts.container,
  },
  Buttons: {
    ...layouts.flexRow,
    margin: spacing.moderate.size_20,
    borderRadius: 5,
    backgroundColor: colors.gainsboro,
  },
  Imagen: {
    width: spacing.moderate.size_42,
    height: spacing.moderate.size_42,
    margin: spacing.moderate.size_10,
    borderRadius: 30,
  },
  Icon: {
    width: spacing.moderate.size_14,
    height: spacing.moderate.size_14,
    margin: spacing.moderate.size_10,
  },
  ButtonAll: {
    ...layouts.container,
    backgroundColor: colors.gainsboro,
    borderRadius: 5,
  },
  ButtonOpeneds: {
    ...layouts.container,
    borderRadius: 5,
    backgroundColor: colors.gainsboro,
  },
  ButtonCloseds: {
    ...layouts.container,
    borderRadius: 5,
    backgroundColor: colors.gainsboro,
  },
  ApiDescription: {
    fontSize: spacing.moderate.size_10,
    opacity: 0.4,
  },
});
export default Styles;
