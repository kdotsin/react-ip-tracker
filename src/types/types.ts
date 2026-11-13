interface Location {
  region: string;
  city: string;
  postalCode: string;
  timezone: string;
  lat: number;
  lng: number;
}

export default interface ipAPI {
  ip: string;
  location: Location;
  isp: string;
}