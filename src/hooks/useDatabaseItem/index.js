import { useState } from "react";

function useDatabaseItem(ref) {
  const [dataItem, setDataItem] = useState(null);
  ref.on("value", function (snapshot) {
    setDataItem(snapshot.val());
  });
  return dataItem;
}

export default useDatabaseItem;
