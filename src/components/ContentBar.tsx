import { useContext } from "react";
import IpContext from "../context/IpContext";
import type ipAPI from "../types/types";

export default function ContentBar() {
  const data: ipAPI | null = useContext(IpContext);

  return (
    <dl className="address-cards">
      <div className="address-detail">
        <dt className="card-title">IP Address</dt>
        <dd className="card-content" id="ip-address">{data?.ip}</dd>
      </div>
      <div className="address-detail">
        <dt className="card-title">Location</dt>
        <dd className="card-content" id="ip-location">{data?.location.city}</dd>
      </div>
      <div className="address-detail">
        <dt className="card-title">Timezone</dt>
        <dd className="card-content" id="ip-timezone">{data?.location.timezone}</dd>
      </div>
      <div className="address-detail">
        <dt className="card-title">ISP</dt>
        <dd className="card-content" id="ip-isp">{data?.isp}</dd>
      </div>
    </dl>
  );
}
