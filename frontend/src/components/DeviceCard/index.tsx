import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import MemoryIcon from "@mui/icons-material/Memory";
import SensorsOffIcon from "@mui/icons-material/SensorsOff";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getCurrentReadingDevice } from "@/api/get_current_reading_device";
import type { Device } from "@/types/device";
import { SensorMetics } from "./SensorMetrics";

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const { data, isPending } = useQuery({
    queryKey: ["getCurrentReadingDevice", device.devEui],
    queryFn: () => getCurrentReadingDevice({ devEui: device.devEui }),
  });

  const deviceReading = data?.deviceReading;
  const object = deviceReading?.object;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              flexShrink: 0,
            }}
          >
            <MemoryIcon fontSize="small" />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" noWrap title={device.deviceName}>
              {device.deviceName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {device.devEui}
            </Typography>
          </Box>
        </Box>

        <Tooltip title={device.deviceProfileName}>
          <Chip
            label={device.deviceProfileName}
            size="small"
            variant="outlined"
            sx={{ alignSelf: "flex-start", maxWidth: "100%" }}
          />
        </Tooltip>

        <Divider />

        {isPending ? (
          <NoDataPlaceholder message="Nenhuma leitura recebida ainda" />
        ) : !object ? (
          <NoDataPlaceholder message="Leitura sem dados de sensor" />
        ) : (
          <SensorMetics
            devEui={device.devEui}
            Ext_Hum_SHT={object.Ext_Hum_SHT}
            Ext_TempC_SHT={object.Ext_TempC_SHT}
            Hum_SHT={object.Hum_SHT}
            TempC_SHT={object.TempC_SHT}
          />
        )}
      </CardContent>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 1.25,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {object ? (
          <Chip
            icon={<BatteryStdIcon />}
            label={`${object.Bateria.toFixed(2)}`}
            size="small"
            variant="outlined"
            color="success"
          />
        ) : (
          <Box />
        )}

        {deviceReading && (
          <Tooltip
            title={format(deviceReading.time, "dd/MM/yyyy 'às' HH:mm:ss", {
              locale: ptBR,
            })}
          >
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ alignItems: "center", color: "text.secondary" }}
            >
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                {formatDistanceToNow(deviceReading.time, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </Typography>
            </Stack>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
}

function NoDataPlaceholder({ message }: { message: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: 3,
        color: "text.secondary",
      }}
    >
      <SensorsOffIcon />
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
}
