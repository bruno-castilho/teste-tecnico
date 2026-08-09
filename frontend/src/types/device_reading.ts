export interface DeviceReading {
  devEui: string;
  time: string;
  object: {
    Bat_status: number;
    Bateria: number;
    Modo: string;
    TempC_SHT: number;
    Hum_SHT: number;
    Ext_TempC_SHT: number;
    Ext_Hum_SHT: number;
  };
}
