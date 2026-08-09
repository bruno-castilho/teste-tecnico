import { api } from "@/lib/axios";
import type { Device } from "@/types/device";

interface ListDevicesParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy: "deviceName" | "deviceProfileName";
  sortOrder: "asc" | "desc";
}

interface ListDevicesResponse {
  devices: Device[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export async function listDevices(params: ListDevicesParams) {
  const { page, pageSize, search, sortOrder, sortBy } = params;

  const response = await api.get<ListDevicesResponse>(`/devices`, {
    params: {
      page,
      pageSize,
      search,
      sortOrder,
      sortBy,
    },
  });

  return response.data;
}
