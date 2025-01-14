import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

const ListTable = lazy(() => import("Components/ListTable/ListTable"));

const DataContainer = () => {
  const listData = useSelector((state) => state.listData);
  return (
    <Suspense fallback={<></>}>
      <ListTable tableData={listData} />
    </Suspense>
  );
};

export default DataContainer;
