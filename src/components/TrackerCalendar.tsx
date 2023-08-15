import React from 'react';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
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

  return (
    <Pressable
      onPress={onPress}
      bg={selected ? '$secondary' : '$bg'}
      alignItems={'center'}
      justifyContent={'center'}
      borderWidth={selected ? 0 : 1}
      borderColor={'$line'}
      borderRadius={'sm'}
      p={'m'}>
      <Text py={'xs'} color={selected ? '$buttonTextPrimary' : '$header'} variant={'text-small'} textTransform={'capitalize'}>
        {dayInWeek}
      </Text>
      <Text color={selected ? '$buttonTextPrimary' : '$body'} variant={'text-small-tight'}>
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
    <Box flexDirection={'row'} justifyContent={'space-around'} alignSelf={'stretch'} p={'s'}>
      {dates.map(date => (
        <CalendarItem key={date} date={date} selected={date === currentDate} onPress={onPress} />
      ))}
    </Box>
  );
};

export default TrackerCalendar;
