import getIndices from "@/services/apis/stockIndex";
import { useUIStore } from "@/store/ui.store";
import { useEffect, useState } from "react";
import StockIndices from "@/features/index/StockIndices";
import { IndexItem } from "@/shared/types";
import UserIndices from "@/features/index/UserIndices";
import getUserIndices from "@/services/apis/indicesOrdering"


const IndicesPage = () => {
  const accessToken = useUIStore((s) => s.accessToken);
  const [indexData, setIndexData] = useState<IndexItem[]>([]);
  const [userIndexData, setUserIndexData] = useState<IndexItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExchange, setSelectedExchange] = useState<string>('NSE');

  useEffect(() => {
    const getIndexData = async () => {
    if(!accessToken) return;
    setLoading(true);
    try {
        const [indices, userIndices] = await Promise.all([
        getIndices(accessToken, selectedExchange),
        getUserIndices(accessToken)
      ]);

      setIndexData(indices);
      setUserIndexData(userIndices);
    } catch(error) {
        console.error("Failed to fetch: ", error);
    }finally {
        setLoading(false);
      }
    };
    getIndexData();
  }, [accessToken, selectedExchange]);


  return (
    <>
    <StockIndices data={indexData} loading={loading} selectedExchange={selectedExchange} setSelectedExchange={setSelectedExchange}/>
    <UserIndices data={userIndexData}/>
    </>
  );
};

export default IndicesPage;
