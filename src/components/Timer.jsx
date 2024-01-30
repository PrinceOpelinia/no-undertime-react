import React, { useState, useEffect } from 'react';
import { Button, Typography, message, Modal } from 'antd';
import '../styles/timer.css';

const { Text } = Typography;

const CountdownTimer = () => {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const startTimer = () => {
    const now = new Date();
    const newEndTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    setEndTime(newEndTime);

    setIsTimerStarted(true);

    // Update the time remaining every second
    const timerInterval = setInterval(() => {
      const remaining = newEndTime - new Date();

      if (remaining <= 0) {
        clearInterval(timerInterval);
        setIsTimerStarted(false);
        setTimeRemaining(null);
        handleAlarm();
        setIsModalVisible(true); // Show the modal
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
  };

  const handleAlarm = () => {
    // This is where you can perform actions when the countdown finishes
    message.success('Clock out now!');
  };

  const handleCountdownEndSoon = () => {
    // This is where you can perform actions when the countdown is about to finish
    alert('Countdown is about to end!');
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Close the modal
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;


    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (!isTimerStarted) {
      setTimeRemaining(null);
      setEndTime(null);
    }
  }, [isTimerStarted]);

  return (
    <div className="timer-container">
       <h1 className='header-text'>NO<span className='undertime-span'>UNDERTIME</span></h1>
      {isTimerStarted ? (
        <div>
          {/* <h1>TIME LEFT:</h1> */}
          
          <h2>{formatTime(timeRemaining)}</h2>
        

          <p>
            End Time: <span className="web-green">{endTime.toLocaleString()}</span>
          </p>
        </div>
      ) : (
        <div>
          <button onClick={startTimer} className="button" data-text="Start Timer!">
            <span className="actual-text">&nbsp;Start!&nbsp;</span>
            <span aria-hidden="true" className="hover-text">&nbsp;Start!&nbsp;</span>
          </button>
        </div>
      )}

      <Modal
        title="Clock Out"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        <p>It's time to clock out!</p>
      </Modal>
    </div>
  );
};

export default CountdownTimer;
