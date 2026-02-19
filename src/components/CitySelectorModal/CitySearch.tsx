import { useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useCitySearch } from "../../hooks/useCitySearch";
import type { City } from "../../types/City";

type Props = {
  onSelectCity: (city: City) => void;
};

export default function CitySearch({ onSelectCity }: Props) {
  const [inputValue, setInputValue] = useState("");
  const debounced = useDebouncedValue(inputValue, 200);

  const { data, isFetching, isError } = useCitySearch(debounced);

  const options: City[] = useMemo(() => {
    const results = (data?.results ?? []) as any[];
    return results.map((r) => ({
      id: r.id,
      name: r.name,
      latitude: r.latitude,
      longitude: r.longitude,
      country: r.country,
      admin1: r.admin1,
      timezone: r.timezone,
    }));
  }, [data]);

  const getLabel = useMemo(
    () => (c: City) => [c.name, c.admin1, c.country].filter(Boolean).join(", "),
    []
  );

  return (
    <Autocomplete
      options={options}
      loading={isFetching}
      getOptionLabel={getLabel}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {getLabel(option)}
        </li>
      )}
      noOptionsText={
        debounced.trim().length < 2
          ? "Kezdjen el gépelni..."
          : isError
            ? "Hiba történt a keresésnél."
            : "Nincs találat."
      }
      onChange={(_, value) => {
        if (value) onSelectCity(value);
      }}
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Város neve"
          sx={{ mt: 2 }}
          helperText={isError ? "Nem sikerült lekérni a városokat." : " "}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
