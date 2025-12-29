import "./Clock.css";
import useCurrentDate from "../../hooks/useCurrentDate";

const Clock = () => {
  const date = useCurrentDate();

  return (
    <div className="clock">
      Dzisiaj jest{" "}
      {date.toLocaleString("pl-PL", {
        weekday: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
};

export default Clock;
