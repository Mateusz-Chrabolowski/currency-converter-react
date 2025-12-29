import { useEffect, useState } from "react";

function useCurrentDate(interval = 1000) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setDate(new Date());
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return date;
}

export default useCurrentDate;
