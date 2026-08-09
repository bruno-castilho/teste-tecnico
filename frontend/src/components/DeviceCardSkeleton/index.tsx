import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export function DeviceCardSkeleton() {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Skeleton variant="rounded" width={40} height={40} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="70%" height={28} />
            <Skeleton variant="text" width="45%" />
          </Box>
        </Box>

        <Skeleton variant="rounded" width="80%" height={24} />

        <Divider />

        <Grid container spacing={1.25}>
          {[0, 1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 6 }}>
              <Skeleton variant="rounded" height={56} />
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1.25,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Skeleton variant="rounded" width={72} height={24} />
        <Skeleton variant="text" width={60} />
      </Box>
    </Card>
  );
}
