import React, { useEffect, useState } from "react";
import axiosConfig from "../../api/axiosConfig/axios-config";
import WaveLoader from "../WaveLoader/WaveLoader";
import "./NetworkProvider.css";

const NetworkProvider = () => {
  const [networkProvider, setNetworkProvider] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNetworkProvider();
  }, []);

  /**
   * Get details about ISP and network
   */
  const getNetworkProvider = async () => {
    try {
      setLoading(true);
      const result = await axiosConfig.get("http://ip-api.com/json");
      setNetworkProvider(result.data?.isp);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      setNetworkProvider("Unable to detect ISP");
    }
  };

  return (
    <div className="isp-container">
      {loading ? <WaveLoader /> : <p className="isp-name">{networkProvider}</p>}
    </div>
  );
};

export default NetworkProvider;
