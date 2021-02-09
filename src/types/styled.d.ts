import 'styled-components/native';
import { Colors } from '../theme/colors';
import { FontSizes } from '../theme/sizes';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: Colors;
    fontSizes: FontSizes;
  }
}