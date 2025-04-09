import React from "react";
import { fetchMotorbike } from "@/hooks/mototbikes/use-motorbikes";

const MotorbikeList = () => {
  const { motorbikes, isLoading, error } = useMotorbikes();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching motorbikes</div>;

  return (
    <div>
      <h1>Motorbikes</h1>
      <ul>
        {motorbikes.map((motorbike) => (
          <li key={motorbike.id}>
            {motorbike.name} - {motorbike.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotorbikeList;
