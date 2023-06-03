// export interface ParkingSpace {
//   lat: number;
//   lng: number;
//   disabled: boolean;
//   taken: boolean;
// }

export interface ParkingSpace {
  id: string;
  lat: number;
  lng: number;
  disabled: boolean;
  taken: boolean;
  reserved: boolean;
}
