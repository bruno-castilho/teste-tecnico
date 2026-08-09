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


interface ExternalHumidityChartProps {
  open: boolean;
  onClose: () => void;
  devEui: string
}


export function ExternalHumidityChart({
  open,
  onClose,
  devEui,
}: ExternalHumidityChartProps) {

  const { data, isPending, isError } = useQuery({
    queryKey: ['getDeviceReadingHistory', devEui],
    queryFn: () =>
      getDeviceReadingHistory({ devEui }),
    enabled: open,
  })


  const humidities: number[] = []
  const times: Date[] = []

  data?.deviceReadings.forEach((deviceReading) => {
    humidities.push(deviceReading.object.Ext_Hum_SHT)
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
            Não foi possível carregar o histórico de umidade.
          </Typography>
        ) : humidities.length === 0 ? (
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
                min: 0,
                max: 100,
                label: "%",
              },
            ]}
            series={[
              {
                data: humidities,
                label: "Umidade externa",
                color: "#00897b",
                showMark: false,
                area: false,
                valueFormatter: (value: number | null) =>
                  value === null ? "" : `${value.toFixed(1)} %`,
              },
            ]}
            margin={{ top: 16, right: 24, bottom: 24, left: 8 }}
          />
        )}
      </Box>
    </Dialog>
  );
}
