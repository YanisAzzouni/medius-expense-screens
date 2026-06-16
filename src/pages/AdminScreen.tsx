import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import ComingSoon from "../components/ComingSoon";
import CardFeedsAdmin from "./CardFeedsAdmin";
import Transactions from "./Transactions";

export default function AdminScreen() {
  const { section = "users-access", item = "" } = useParams();

  const isCardFeeds     = section === "payment" && item === "card-feeds";
  const isTransactions  = section === "payment" && item === "transactions";

  return (
    <AdminLayout activeSection={section} activeItem={item} flush={isCardFeeds || isTransactions}>
      {isCardFeeds    ? <CardFeedsAdmin /> :
       isTransactions ? <Transactions />   :
       <ComingSoon />}
    </AdminLayout>
  );
}
