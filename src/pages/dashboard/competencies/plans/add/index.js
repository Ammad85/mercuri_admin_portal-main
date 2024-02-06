import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import { useMounted } from "../../../../../hooks/use-mounted";
import { gtm } from "../../../../../lib/gtm";
import { axiosClient } from "../../../../../api/config";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, FormHelperText, CircularProgress } from "@mui/material";
import { useAuth } from "../../../../../hooks/use-auth";
import NextLink from 'next/link';
import { Logo } from '../../../../../components/logo';
import Link from "next/link";


const AddCompetencyPlan = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      companyTeamId: 0,
      companyId: 1,
      submit: null,
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .max(255)
        .required('Title is required'),
      description: Yup
        .string()
        .max(255)
        .required('description is required'),
      companyTeamId: Yup
        .number()
        .required('Competency Group is required'),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let body = values;
      delete body["submit"];
      try {
        await axiosClient.post("Competency/addCompetencyPlan", values).then((res) => {
         if (res.status === 200) {
           setSuccess(true);
         }

       })
       
     } catch (err) {
       console.error(err);

       if (isMounted()) {
         helpers.setStatus({ success: false });
         helpers.setErrors({ submit: err.message });
         helpers.setSubmitting(false);
       }
     }
      setLoading(false);
    },
  });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getAllCompany = async () => {
    let response =[]
    await axiosClient
      .get("Team/getTeamsForCompany?companyId=1", {})
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
    return response;
  };


  const getCompany = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCompany();
      if (isMounted()) {
        setCompany(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [isMounted]);


 
  useEffect(
    () => {
      getCompany();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Head>
        <title>Dashboard: Add Competency Plan</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Add Competency Plan</Typography>
              </Grid>
              <Grid item>
              <Link
         href={'/dashboard/competencies/plans'}
        >
                <Button
                  variant="contained"
                >
                  Cancel
                  </Button>
                  </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{justifyContent:"center", width:'100%'}}>
          <Card sx={{maxWidth:"sm", margin:"0px auto"}}>
          <Container
            sx={{
              py: {
                xs: "20px",
                md: "40px",
              },
            }}
              >
                <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">
              Add Competency Plan
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Add competency parameter on the internal platform
              </Typography>
            </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          error={Boolean(formik.touched.title && formik.errors.title)}
          fullWidth
          helperText={formik.touched.title && formik.errors.title}
          label="Title"
          margin="normal"
          name="title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
                  />
        <TextField
          autoFocus
          error={Boolean(formik.touched.description && formik.errors.description)}
          fullWidth
          helperText={formik.touched.description && formik.errors.description}
          label="Descritpion"
          margin="normal"
          name="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          />
        <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-helper-label">Select a Team</InputLabel>
          <Select
          autoFocus
          error={Boolean(formik.touched.companyTeamId && formik.errors.companyteamId)}
          fullWidth
          helperText={formik.touched.companyteamId && formik.errors.companyteamId}
          value={formik.values.companyteamId}
          label="Select a Team"
          margin="normal"
          name="companyteamId"
          onChange={formik.handleChange}
          >
            {company.map((c,index) => 
                <MenuItem key={index} value={c.id}>{c.teamName}</MenuItem>
            )}
          </Select>
          </FormControl>        
                  
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            // disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
          >
            Add Competency Plan
          </Button>
        </Box>
         {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2
            }}
          >
            <CircularProgress />
          </Box>
                )}
                {success &&
                  <Box sx={{ mt: 2 }}>
                    <Alert severity={"info"}>
            
                      <div>
                        <b> Competency Plan Added Successfully </b>
                      </div>
             
                    </Alert>
                  </Box>
                }
        </form>
              </Container>
            </Card>
            </Box>
        </Container>
      </Box>
    </>
  );
};

AddCompetencyPlan.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AddCompetencyPlan;
