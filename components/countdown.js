import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

function Countdown({ startDate }) {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const durationInSeconds = Math.floor((startDate - currentDate) / 1000);
    const days = Math.ceil(durationInSeconds / (24 * 3600));

    setDaysRemaining(days);
  }, [startDate]);

  const countdownTextStyle = {
    fontSize: 18,
    color: '#B726DC',
  };

  const countdownCircleSize = 80;

  return (
    <CountdownCircleTimer
      isPlaying
      duration={daysRemaining * 24 * 3600} // Convert days to seconds
      colors={['#B726DC', '#F7B801', '#A30000', '#A30000']}
      size={countdownCircleSize}
      strokeWidth={4}
    >
      {() => (
        <Text style={countdownTextStyle}>
          {daysRemaining} days
        </Text>
      )}
    </CountdownCircleTimer>
  );
}

export default Countdown;
