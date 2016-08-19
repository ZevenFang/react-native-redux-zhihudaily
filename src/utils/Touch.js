import {Platform,TouchableNativeFeedback,TouchableOpacity} from 'react-native';

let Touch = TouchableOpacity;
if (Platform.OS === 'android')
  Touch = TouchableNativeFeedback;
export default Touch;