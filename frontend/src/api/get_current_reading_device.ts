import { api } from "@/lib/axios"
import { DeviceReading } from "@/types/device_reading"

interface GetCurrentReadingDeviceParams {
    devEui: string
}

interface GetCurrentReadingDeviceResponse {
    deviceReading: DeviceReading
}

export async function getCurrentReadingDevice(params: GetCurrentReadingDeviceParams){
    const { devEui } = params

    const response = await api.get<GetCurrentReadingDeviceResponse>(`/devices/${devEui}/current-reading`)

    return response.data
}