import { StyleSheet } from 'react-native';
import color from '../Color';

/* Global style */
const styles = StyleSheet.create({
  header: {
    backgroundColor: color.headerColor,
    borderBottomColor: color.headerColor,
  },
  headerGray: {
    backgroundColor: color.headerColorGray,
    borderBottomColor: color.headerColorGray,
  },
  body: {
    backgroundColor: color.headerColor,
  },
});

export default styles;
