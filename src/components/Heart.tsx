import {useTheme} from '@shopify/restyle';
import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {Theme} from '../style/theme';

type Props = {
  size: number;
  fillColor: keyof Theme['colors'];
  color: keyof Theme['colors'];
};

const HeartIcon: React.FC<Props> = ({size, fillColor, color}) => {
  const {colors} = useTheme<Theme>();

  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Path
        d="M12 21.35l-1.45-1.32C5.4 16.36 2 13.03 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 4.53-3.4 7.86-8.55 11.54L12 21.35z"
        fill={colors[fillColor]}
      />
      <Path
        d="M12 21.35l-1.45-1.32C5.4 16.36 2 13.03 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 4.53-3.4 7.86-8.55 11.54L12 21.35z"
        fill="transparent"
        stroke={colors[color]}
        strokeWidth="2"
      />
    </Svg>
  );
};

export default HeartIcon;
