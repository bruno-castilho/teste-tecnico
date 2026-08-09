import { api } from "@/lib/axios"
import { DeviceReading } from "@/types/device_reading"

interface GetDeviceReadingHistoryParams {
    devEui: string
}

interface GetDeviceReadingHistoryResponse {
    deviceReadings: DeviceReading[]
}

export async function getDeviceReadingHistory(params: GetDeviceReadingHistoryParams){
    const { devEui } = params

    const response = await api.get<GetDeviceReadingHistoryResponse>(`/devices/${devEui}/device-reading-history`)

    return response.data
}