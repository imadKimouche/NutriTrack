import React from 'react';
import Box from '../atoms/Box';
import Pressable from '../atoms/Pressable';
import Text from '../atoms/Text';
import {getSurroundingDates} from '../utils';

type CalendarItemProps = {
  date: Date;
  selected: boolean;
  onPress: () => void;
};

const CalendarItem: React.FC<CalendarItemProps> = ({date, selected, onPress}) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = date.getDate();
  const dayInWeek = days[date.getDay()];

  return (
    <Pressable
      flex={1}
      mx={'xs'}
      onPress={onPress}
      bg={selected ? '$secondary' : '$bg'}
      alignItems={'center'}
      justifyContent={'center'}
      borderWidth={selected ? 0 : 1}
      borderColor={'$line'}
      borderRadius={'sm'}
      p={'m'}>
      <Text
        py={'xs'}
        color={selected ? '$buttonTextPrimary' : '$header'}
        variant={'text-small-tight'}
        textTransform={'capitalize'}>
        {dayInWeek}
      </Text>
      <Text color={selected ? '$buttonTextPrimary' : '$body'} variant={'text-small-tight'}>
        {day}
      </Text>
    </Pressable>
  );
};

type TrackerCalendarProps = {
  currentDate: Date;
  onDayPress: (date: Date) => void;
};
const TrackerCalendar: React.FC<TrackerCalendarProps> = ({currentDate, onDayPress}) => {
  const dates = getSurroundingDates(currentDate, 2, 2); // get 2 days before, 2 days after

  return (
    <Box flexDirection={'row'} justifyContent={'space-around'} alignSelf={'stretch'}>
      {dates.map((date, idx) => (
        <CalendarItem key={idx} date={date} selected={date === currentDate} onPress={() => onDayPress(date)} />
      ))}
    </Box>
  );
};

export default TrackerCalendar;
