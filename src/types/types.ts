interface Location {
  region: string;
  city: string;
  postalCode: string;
  timezone: string;
}

export default interface ipAPI {
  ip: string;
  location: Location;
  isp: string;
}