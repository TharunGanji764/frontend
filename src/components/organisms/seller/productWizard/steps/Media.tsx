import {
  Stack,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Close, Star } from "@mui/icons-material";
import { useState } from "react";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
];

export const Media = () => {
  const [media, setMedia] = useState<any[]>([]);

  const addImage = (url: string) => {
    if (!media.find((m) => m.url === url)) {
      setMedia((p) => [
        ...p,
        {
          id: Date.now(),
          url,
          primary: p.length === 0,
        },
      ]);
    }
  };

  const removeImage = (id: number) =>
    setMedia((p) => p.filter((m) => m.id !== id));

  const setPrimary = (id: number) =>
    setMedia((p) =>
      p.map((m) => ({
        ...m,
        primary: m.id === id,
      })),
    );

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Product Media</Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          textAlign: "center",
        }}
      >
        <PhotoCamera sx={{ fontSize: 40 }} />

        <Typography>Click sample images to add</Typography>

        <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
          {SAMPLE_IMAGES.map((url, i) => (
            <Box
              key={i}
              component="img"
              src={url}
              sx={{
                width: 60,
                height: 60,
                cursor: "pointer",
              }}
              onClick={() => addImage(url)}
            />
          ))}
        </Stack>
      </Paper>

      {media.length > 0 && (
        <Grid container spacing={2}>
          {media.map((img) => (
            <Grid item xs={4} key={img.id}>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={img.url}
                  sx={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                  }}
                />

                {img.primary && (
                  <Chip
                    icon={<Star />}
                    label="Primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 5,
                      left: 5,
                    }}
                  />
                )}

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                  }}
                >
                  {!img.primary && (
                    <Button size="small" onClick={() => setPrimary(img.id)}>
                      Set
                    </Button>
                  )}

                  <IconButton size="small" onClick={() => removeImage(img.id)}>
                    <Close />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};
