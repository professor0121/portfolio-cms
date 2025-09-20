import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHealthStatus } from "../redux/slices/healthSlice";

const HealthStatus = () => {
  const dispatch = useDispatch();
  const { status, uptime, loading, error } = useSelector((state) => state.health);

  useEffect(() => {
    dispatch(fetchHealthStatus());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <p>Server Status: {status}</p>
      <p>Uptime: {uptime} seconds</p>
    </div>
  );
};

export default HealthStatus;
