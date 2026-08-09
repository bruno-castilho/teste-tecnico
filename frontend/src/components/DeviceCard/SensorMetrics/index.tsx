import { Thermostat, WaterDrop } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";


interface SensorMeticsProps {
    TempC_SHT: number;
    Hum_SHT: number;
    Ext_TempC_SHT: number;
    Ext_Hum_SHT: number;
}





export function SensorMetics({TempC_SHT, Hum_SHT, Ext_TempC_SHT, Ext_Hum_SHT }: SensorMeticsProps){
    
    return <Grid container spacing={1.25}>
        <Grid size={{ xs: 6 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: "action.hover"
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
                    Temperatura
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
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: "action.hover"
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
                        Umidade
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
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: "action.hover"
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
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: "action.hover"
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
}