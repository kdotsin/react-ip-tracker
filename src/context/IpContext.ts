import React from "react";
import type ipAPI from "../types/types.ts";

const IpContext = React.createContext<ipAPI | null>(null);

export default IpContext;