export interface FreeParkingSpaces {
  normalParkingSpacesCount: number;
  disabledParkingSpacesCount: number;
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
