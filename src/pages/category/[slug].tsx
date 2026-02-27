import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import CapitalizeString from "@/utils/CapitalizeString";

export default function CategoryPage(props: any) {
  const { productsData } = props;
  const { query } = useRouter();
  const slug = query.slug as string;

  return (
    <>
      <Head>
        <title>{CapitalizeString(slug)} | Shop Hub</title>
        <meta name="description" content={`Browse ${slug} products`} />
      </Head>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
          {CapitalizeString(slug)}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={2}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body1" sx={{ mb: 1 }}>
                Brand
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Apple"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Samsung"
                />
              </FormGroup>

              <Typography variant="body1" sx={{ mt: 3, mb: 1 }}>
                Price Range
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Under $500"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="$500 - $1000"
                />
              </FormGroup>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9} lg={9.857}>
            {productsData?.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <Typography color="text.secondary">
                  No products found in this category.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={0}>
                {productsData?.map((product: any) => (
                  <Grid key={product?.sku} item xs={12} sm={6} md={4} lg={2.7}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export const getServerSideProps = async (context: any) => {
  const { params, req } = context;
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/get-category/${params?.slug}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req?.cookies?.access_token}`,
    },
  });
  const result = await res?.json();

  return {
    props: {
      productsData: result,
    },
  };
};
