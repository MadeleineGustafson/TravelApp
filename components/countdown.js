import React from 'react';
import { Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

function Countdown({ startDate }) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the duration in seconds from today to the start date
  const durationInSeconds = Math.floor((startDate - currentDate) / 1000);

  // Convert the duration to days
  const days = Math.ceil(durationInSeconds / (24 * 3600)); // Use Math.ceil to round up to the next whole day

  const countdownTextStyle = {
    fontSize: 18, 
    color: '#B726DC', 
  };

  const countdownCircleSize = 80;

  return (
    <CountdownCircleTimer
      isPlaying
      duration={durationInSeconds}
      colors={['#B726DC', '#F7B801', '#A30000', '#A30000']}
      size={countdownCircleSize}
      strokeWidth={4}
    >
      {({ remainingTime }) => (
        <Text style={countdownTextStyle}>
          {days} days
        </Text>
      )}
    </CountdownCircleTimer>
  );
}

export default Countdown;
