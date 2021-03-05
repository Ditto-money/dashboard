import React, { useEffect, useState } from 'react';
import moment from 'moment';

function Countdown({ deadline }) {
  const [count, setCount] = useState({});

  const getTimeUntil = async deadline => {
    const time = moment.unix(deadline).diff(moment.unix());
    console.log(moment.unix(deadline))
    const seconds = await Math.floor((time / 1000) % 60);
    const minutes = await Math.floor((time / 1000 / 60) % 60);
    const hours = await Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = await Math.floor(time / (1000 * 60 * 60 * 24));
    console.log(seconds, minutes, hours, days);
    setCount({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    const id = setInterval(() => getTimeUntil(deadline), 1000);
    return () => {
      if (id) clearInterval(id);
    };
  }, [deadline]);

  const { days, hours, minutes, seconds } = count;

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    return (
      <div className="countdown">
        <strong>Trading Competition Countdown: Close</strong>
      </div>
    );
  }

  return (
    <div className="countdown">
      <strong>
        Trading Competition Countdown: {days} Days {hours} hrs {minutes} min.{' '}
        {seconds} sec.
      </strong>
    </div>
  );
}

export default Countdown;
