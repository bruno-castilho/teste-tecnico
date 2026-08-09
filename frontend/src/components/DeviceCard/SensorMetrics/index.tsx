import { Thermostat, WaterDrop } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { ExternalHumidityChart } from "@/components/ExternalHumidityChart";
import { ExternalTemperatureChart } from "@/components/ExternalTemperatureChart";
import { InternalHumidityChart } from "@/components/InternalHumidityChart";
import { InternalTemperatureChart } from "@/components/InternalTemperatureChart";

interface SensorMeticsProps {
  devEui: string;
  TempC_SHT: number;
  Hum_SHT: number;
  Ext_TempC_SHT: number;
  Ext_Hum_SHT: number;
}

export function SensorMetics({
  devEui,
  TempC_SHT,
  Hum_SHT,
  Ext_TempC_SHT,
  Ext_Hum_SHT,
}: SensorMeticsProps) {
  const [
    openInternalTemperatureChartDialog,
    setOpenInternalTemperatureChartDialog,
  ] = useState(false);
  const [openInternalHumidityChartDialog, setOpenInternalHumidityChartDialog] =
    useState(false);
  const [
    openExternalTemperatureChartDialog,
    setOpenExternalTemperatureChartDialog,
  ] = useState(false);
  const [openExternalHumidityChartDialog, setOpenExternalHumidityChartDialog] =
    useState(false);

  function handleInternalTemperatureChartDialog() {
    setOpenInternalTemperatureChartDialog(!openInternalTemperatureChartDialog);
  }

  function handleInternalHumidityChartDialog() {
    setOpenInternalHumidityChartDialog(!openInternalHumidityChartDialog);
  }

  function handleExternalTemperatureChartDialog() {
    setOpenExternalTemperatureChartDialog(!openExternalTemperatureChartDialog);
  }

  function handleExternalHumidityChartDialog() {
    setOpenExternalHumidityChartDialog(!openExternalHumidityChartDialog);
  }

  return (
    <>
      <Grid container spacing={1.25}>
        <Grid size={{ xs: 6 }}>
          <Box
            onClick={handleInternalTemperatureChartDialog}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              p: 1.25,
              borderRadius: 2,
              bgcolor: "action.hover",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
              }}
            >
              <Thermostat fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary" noWrap>
                Temp. interna
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {TempC_SHT.toFixed(1)}
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  color="text.secondary"
                >
                  °C
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box
            onClick={handleInternalHumidityChartDialog}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              p: 1.25,
              borderRadius: 2,
              bgcolor: "action.hover",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
              }}
            >
              <WaterDrop fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary" noWrap>
                Umidade interna
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {Hum_SHT.toFixed(1)}
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  color="text.secondary"
                >
                  %
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box
            onClick={handleExternalTemperatureChartDialog}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              p: 1.25,
              borderRadius: 2,
              bgcolor: "action.hover",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
              }}
            >
              <Thermostat fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary" noWrap>
                Temp. externa
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {Ext_TempC_SHT.toFixed(1)}
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  color="text.secondary"
                >
                  °C
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box
            onClick={handleExternalHumidityChartDialog}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              p: 1.25,
              borderRadius: 2,
              bgcolor: "action.hover",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "primary.main",
              }}
            >
              <WaterDrop fontSize="small" />
            </Box>

            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary" noWrap>
                Umidade externa
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {Ext_Hum_SHT.toFixed(1)}
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  color="text.secondary"
                >
                  %
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <InternalTemperatureChart
        devEui={devEui}
        open={openInternalTemperatureChartDialog}
        onClose={handleInternalTemperatureChartDialog}
      />
      <InternalHumidityChart
        devEui={devEui}
        open={openInternalHumidityChartDialog}
        onClose={handleInternalHumidityChartDialog}
      />
      <ExternalTemperatureChart
        devEui={devEui}
        open={openExternalTemperatureChartDialog}
        onClose={handleExternalTemperatureChartDialog}
      />
      <ExternalHumidityChart
        devEui={devEui}
        open={openExternalHumidityChartDialog}
        onClose={handleExternalHumidityChartDialog}
      />
    </>
  );
}
