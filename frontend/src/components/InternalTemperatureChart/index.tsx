import { getDeviceReadingHistory } from "@/api/get_device_reading_history";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


interface InternalTemperatureChartProps {
  open: boolean;
  onClose: () => void;
  devEui: string
}


export function InternalTemperatureChart({
  open,
  onClose,
  devEui,
}: InternalTemperatureChartProps) {

  const { data, isPending, isError } = useQuery({
    queryKey: ['getDeviceReadingHistory', devEui],
    queryFn: () =>
      getDeviceReadingHistory({ devEui }),
    enabled: open,
  })


  const temperatures: number[] = []
  const times: Date[] = []

  data?.deviceReadings.forEach((deviceReading) => {
    temperatures.push(deviceReading.object.TempC_SHT)
    times.push(new Date(deviceReading.time))
  })


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            height: "75vh",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={onClose} aria-label="Fechar">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          px: 1,
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isPending ? (
          <CircularProgress />
        ) : isError ? (
          <Typography color="error">
            Não foi possível carregar o histórico de temperatura.
          </Typography>
        ) : temperatures.length === 0 ? (
          <Typography color="text.secondary">
            Nenhuma leitura no período.
          </Typography>
        ) : (
          <LineChart
            xAxis={[
              {
                data: times,
                scaleType: "time",
                valueFormatter: (value: Date) =>
                  format(value, "HH:mm", { locale: ptBR }),
              },
            ]}
            yAxis={[
              {
                min: -24,
                max: 33,
                label: "°C",
              },
            ]}
            series={[
              {
                data: temperatures,
                label: "Temperatura interna",
                color: "#d32f2f",
                showMark: false,
                area: false,
                valueFormatter: (value: number | null) =>
                  value === null ? "" : `${value.toFixed(1)} °C`,
              },
            ]}
            margin={{ top: 16, right: 24, bottom: 24, left: 8 }}
          />
        )}
      </Box>
    </Dialog>
  );
}
