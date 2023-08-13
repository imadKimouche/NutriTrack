import {useTheme} from '@shopify/restyle';
import React from 'react';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {Theme} from '../style/theme';
import {getSurroundingDates} from '../utils';

type CalendarItemProps = {
  date: string;
  selected: boolean;
  onPress: () => void;
};

const CalendarItem: React.FC<CalendarItemProps> = ({date, selected, onPress}) => {
  const dateSplit = date.split('-');
  const dayInWeek = dateSplit[0];
  const day = dateSplit[1];
  const {elevationVariants} = useTheme<Theme>();

  return (
    <Pressable
      onPress={onPress}
      bg={selected ? '$info' : '$cardBackground'}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={'sm'}
      p={'m'}
      {...elevationVariants['elevation-1']}>
      <Text py={'xs'} color={selected ? '$buttonTextPrimary' : '$textBody'} variant={'body1'} textTransform={'capitalize'}>
        {dayInWeek}
      </Text>
      <Text color={selected ? '$buttonTextPrimary' : '$textBody'} variant={'body1'}>
        {day}
      </Text>
    </Pressable>
  );
};

type TrackerCalendarProps = {
  currentDate: string;
  onPress: () => void;
};
const TrackerCalendar: React.FC<TrackerCalendarProps> = ({currentDate, onPress}) => {
  const dates = getSurroundingDates(currentDate, 2, 2); // get 2 days before, 2 days after
  return (
    <Box flexDirection={'row'} justifyContent={'space-around'} alignSelf={'stretch'} p={'m'}>
      {dates.map(date => (
        <CalendarItem key={date} date={date} selected={date === currentDate} onPress={onPress} />
      ))}
    </Box>
  );
};

export default TrackerCalendar;
