export interface StoresProps {
  id: number;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
  tel: number;
}

export const stores: StoresProps[] = [
  {
    id: 1,
    name: "CVC Loja Anápolis - Goiás",
    address:
      "Lojas 01 e 02 - Avenida Goiás, 30, CEP:, 75113-150 - Quadra 05 Lote 30, Anápolis - GO, 75113-150",
    tel: 99999999,
    position: {
      lat: -16.32882674261577,
      lng: -48.94809187327514,
    },
  },
  {
    id: 2,
    name: "CVC Brasil Park Shopping",
    address:
      "Av. Brasil Norte, 505 - Vila das Acacias, Anápolis - GO, 75113-570",
    tel: 99999999,
    position: {
      lat: -16.32421030696828,
      lng: -48.9490782982139,
    },
  },
  {
    id: 3,
    name: "CVC",
    address:
      "R. Quinze de Dezembro, 135 - St. Central, Anápolis - GO, 75024-070",
    tel: 99999999,
    position: {
      lat: -16.326376648249088,
      lng: -48.95566680122565,
    },
  },
  {
    id: 4,
    name: "Operadora e Agência de Viagens Cvc Tur",
    address:
      "R. Quinze de Dezembro, 135 - St. Central, Anápolis - GO, 75024-070",
    tel: 99999999,
    position: {
      lat: -16.328188772126303,
      lng: -48.95721175349883,
    },
  },
  {
    "id": 5,
    "name": "CVC Iguatemi Esplanada Shopping",
    "address": "Avenida Professora Izoraida Marques Peres, 401 - Box 315 - Parque Campolim, Sorocaba - SP, 18047-900",
    "tel": 99999999,
    "position": {
      "lat": -23.537630,
      "lng": -47.466170
    }
  },
  {
    "id": 6,
    "name": "CVC Shopping Cidade",
    "address": "Av. Itavuvu, 3365 - 2024/2025 - Jardim Santa Cecilia, Sorocaba - SP, 18078-005",
    "tel": 99999999,
    "position": {
      "lat": -23.456060,
      "lng": -47.481910
    }
  },
  {
    "id": 7,
    "name": "CVC Pátio Cianê",
    "address": "Av. Dr. Afonso Vergueiro, 823 - loja 20408 - Centro, Sorocaba - SP, 18035-370",
    "tel": 99999999,
    "position": {
      "lat": -23.520070,
      "lng": -46.585470
    }
  }
];
