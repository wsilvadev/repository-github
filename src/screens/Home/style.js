import {StyleSheet} from 'react-native';

import {moderateScale} from '../../utils/dimensions';
import {layouts, colors, spacing} from '../../styles';

const Styles = StyleSheet.create({
  containerMain: {
    ...layouts.container,
    backgroundColor: colors.lightGray,
  },
  containerInput: {
    ...layouts.flexRow,
    ...layouts.centered,
    paddingLeft: spacing.moderate.size_14,
    paddingRight: spacing.moderate.size_14,
  },
  inputContainer: {
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
  containerFlexList: {
    ...layouts.centered,
    ...layouts.flexRow,
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: spacing.moderate.size_10,
  },
  containerTrash: {
    ...layouts.container,
    ...layouts.centered,
  },
  renderText: {
    ...layouts.container,
  },
  emptyView: {
    ...layouts.centered,
    marginTop: spacing.moderate.size_75,
  },
  emptyToShow: {
    width: spacing.moderate.size_100,
    height: spacing.moderate.size_100,
    opacity: 0.3,
  },
  image: {
    width: spacing.moderate.size_42,
    height: spacing.moderate.size_42,
    margin: spacing.moderate.size_10,
    borderRadius: 30,
  },
  iconTrash: {
    width: spacing.moderate.size_42,
    height: spacing.moderate.size_42,
  },
  textDescription: {
    fontSize: spacing.moderate.size_14,
    opacity: 0.6,
    margin: spacing.moderate.size_20,
  },
  icon: {
    width: spacing.moderate.size_14,
    height: spacing.moderate.size_14,
    margin: spacing.moderate.size_10,
  },
  titleApiName: {
    fontSize: spacing.moderate.size_14,
  },
  apiDescription: {
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
