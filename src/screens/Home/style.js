import {StyleSheet} from 'react-native';

import {moderateScale} from '../../utils/dimensions';
import {layouts, colors, spacing} from '../../styles';

const Styles = StyleSheet.create({
  ContainerMain: {
    ...layouts.container,
    backgroundColor: colors.lightGray,
  },
  ContainerInput: {
    ...layouts.flexRow,
    ...layouts.centered,
    paddingLeft: spacing.moderate.size_14,
    paddingRight: spacing.moderate.size_14,
  },
  InputContainer: {
    ...layouts.container,
    backgroundColor: colors.white,
    fontSize: spacing.moderate.size_14,
    borderRadius: 5,
    paddingLeft: spacing.moderate.size_14,
    borderColor: colors.gainsboro,
    borderWidth: 1,
  },
  linhaView: {
    height: moderateScale(1),
    backgroundColor: colors.gainsboro,
    marginBottom: spacing.moderate.size_10,
  },

  textButton: {
    fontSize: spacing.moderate.size_42,
    fontWeight: 'bold',
    padding: spacing.moderate.size_14,
  },
  ContainerFlexList: {
    ...layouts.centered,
    ...layouts.flexRow,
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: spacing.moderate.size_10,
  },
  RenderText: {
    ...layouts.container,
  },
  EmptyView: {
    ...layouts.centered,
    marginTop: spacing.moderate.size_75,
  },
  EmptyToShow: {
    width: spacing.moderate.size_100,
    height: spacing.moderate.size_100,
    opacity: 0.3,
  },
  Imagen: {
    width: spacing.moderate.size_42,
    height: spacing.moderate.size_42,
    margin: spacing.moderate.size_10,
    borderRadius: 30,
  },
  IconTash: {
    width: spacing.moderate.size_42,
    height: spacing.moderate.size_42,
  },
  TextDescription: {
    fontSize: spacing.moderate.size_14,
    opacity: 0.6,
    margin: spacing.moderate.size_20,
  },
  Icon: {
    width: spacing.moderate.size_14,
    height: spacing.moderate.size_14,
    margin: spacing.moderate.size_10,
  },
  TitleApiName: {
    fontSize: spacing.moderate.size_14,
  },
  ApiDescription: {
    fontSize: spacing.moderate.size_10,
    opacity: 0.4,
  },
  headerTitleStyle: {
    flexGrow: 1,
    fontSize: spacing.moderate.size_20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Styles;
