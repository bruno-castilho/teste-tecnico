import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

/** Estado exibido quando não há dispositivos para listar. */
export function EmptyState({
  title = "Nenhum dispositivo encontrado",
  description = "Ainda não há dispositivos para exibir.",
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 1.5,
        py: 10,
        px: 2,
        color: "text.secondary",
      }}
    >
      <DevicesOtherIcon sx={{ fontSize: 56, opacity: 0.6 }} />
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: 360 }}>
        {description}
      </Typography>
    </Box>
  );
}
