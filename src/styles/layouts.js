import {StyleSheet} from 'react-native';

const layouts = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default layouts;
