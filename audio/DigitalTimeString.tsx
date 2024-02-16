import React from 'react';
import { Text, TextStyle } from 'react-native';
import styles from './styles';

interface DigitalTimeStringProps {
    time: number; // Assuming time is a number
}

const DigitalTimeString: React.FC<DigitalTimeStringProps> = ({ time }) => {
    const str_pad_left = (string: string, pad: string, length: number) => {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    const convertNumberToTime = (total_milli_seconds: number) => {
        if (total_milli_seconds < 0) {
            return '00:00:00'
        }
        let total_seconds = total_milli_seconds / 1000;
        total_seconds = Number((total_seconds).toFixed(0));

        let hours = Math.floor(total_seconds / 3600);
        let seconds_left = total_seconds - hours * 3600;
        let minutes = Math.floor(seconds_left / 60);
        let seconds = seconds_left - minutes * 60;

        let finalTime = str_pad_left(hours.toString(), '0', 2) + ':' + str_pad_left(minutes.toString(), '0', 2) + ':' + str_pad_left(seconds.toString(), '0', 2);
        return finalTime
    }

    // console.log('Time prop:', time);
    const formattedTime = convertNumberToTime(time);
    
    return (
        <Text style={styles.StandardText}>
            {formattedTime}
        </Text>
    );
}

export default DigitalTimeString;
