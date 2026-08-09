"use client";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef } from "react";
import { listDevices } from "@/api/list_devices";
import { DeviceCardSkeleton } from "@/components/DeviceCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { DeviceCard } from "../components/DeviceCard";

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];

function DevicesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 6);
  const search = searchParams.get("search") ?? "";
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc";
  const sortBy =
    (searchParams.get("sortBy") as "deviceName" | "deviceProfileName") ??
    "deviceName";

  const debouncedSearch = useDebouncedValue(search);

  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { data, isPending, isError } = useQuery({
    queryKey: ["listDevices", page, pageSize, search, sortOrder, sortBy],
    queryFn: () => listDevices({ page, pageSize, search, sortOrder, sortBy }),
  });

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500);
  }

  function handleChangeSortBy(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", event.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleChangeSortOrder(
    _event: React.MouseEvent<HTMLElement>,
    value: "asc" | "desc" | null,
  ) {
    if (value === null) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortOrder", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  const devices = data?.devices ?? [];
  const pagination = data?.pagination;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          mb: { xs: 2, md: 3 },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Dispositivos IoT
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Leituras de sensores de temperatura e umidade
          </Typography>
        </Box>
        {!isPending && !isError && pagination && (
          <Chip
            color="primary"
            variant="outlined"
            label={`${pagination.total} ${pagination.total === 1 ? "dispositivo" : "dispositivos"}`}
          />
        )}
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ mb: { xs: 3, md: 4 }, alignItems: { sm: "center" } }}
      >
        <TextField
          defaultValue={search}
          onChange={handleChangeSearch}
          placeholder="Buscar por nome, perfil ou devEui"
          size="small"
          fullWidth
          sx={{ maxWidth: { sm: 360 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          label="Ordenar por"
          value={sortBy}
          onChange={handleChangeSortBy}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="deviceName">Nome</MenuItem>
          <MenuItem value="deviceProfileName">Perfil</MenuItem>
        </TextField>

        <ToggleButtonGroup
          value={sortOrder}
          exclusive
          size="small"
          onChange={handleChangeSortOrder}
          aria-label="Direção da ordenação"
        >
          <ToggleButton value="asc" aria-label="Crescente">
            <SwapVertIcon fontSize="small" sx={{ mr: 0.5 }} />
            A–Z
          </ToggleButton>
          <ToggleButton value="desc" aria-label="Decrescente">
            <SwapVertIcon fontSize="small" sx={{ mr: 0.5 }} />
            Z–A
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {isPending ? (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {SKELETON_KEYS.map((key) => (
            <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
              <DeviceCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <EmptyState
          title="Não foi possível carregar os dispositivos"
          description="Ocorreu um erro ao buscar os dados. Tente novamente mais tarde."
        />
      ) : devices.length === 0 ? (
        <EmptyState
          description={
            debouncedSearch
              ? "Nenhum dispositivo corresponde à sua busca."
              : "Ainda não há dispositivos para exibir."
          }
        />
      ) : (
        <>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {devices.map((device) => (
              <Grid key={device.devEui} size={{ xs: 12, sm: 6, md: 4 }}>
                <DeviceCard device={device} />
              </Grid>
            ))}
          </Grid>

          {pagination && pagination.totalPages > 1 && (
            <Stack sx={{ mt: { xs: 3, md: 4 }, alignItems: "center" }}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.page}
                onChange={(_event, value) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", String(value));
                  router.push(`${pathname}?${params.toString()}`);
                }}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
}

export default function DevicesPage() {
  return (
    <Suspense>
      <DevicesPageContent />
    </Suspense>
  );
}
