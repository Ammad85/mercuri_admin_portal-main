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


const AddCompetencySuggestions = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [competencyGroup, setCompetencyGroup] = useState([]);
  const [competencyParamerter, setCompetencyParamerter] = useState([]);
  const formik = useFormik({
    initialValues: {
      competencyGroupId: 1,
      competencyParameterSuggestionId: 1,
      submit: null,
    },
    validationSchema: Yup.object({
      competencyGroupId: Yup
        .number()
        .required('Competency Group is required'),
      competencyParameterSuggestionId: Yup
        .number()
        .required('Competency Group is required'),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let body = values;
      delete body["submit"];
      try {
        await axiosClient.post("Competency/addCompetencySuggestion", values).then((res) => {
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


  const getAllCompetencyGroup = async () => {
    let response =[]
    await axiosClient
      .get("Competency/getCompetencyGroups", {})
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
    return response;
  };

  const getCompetencyParameters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCompetencyParameters();
      if (isMounted()) {
        setCompetencyParamerter(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [isMounted]);

  const getAllCompetencyParameters = async () => {
    let response =[]
    await axiosClient
      .get("Competency/getCompetencyParameters", {})
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
    return response;
  };

  const getCompetencyGroup = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCompetencyGroup();
      if (isMounted()) {
        setCompetencyGroup(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [isMounted]);


 
  useEffect(
    () => {
      getCompetencyGroup();
      getCompetencyParameters()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Head>
        <title>Dashboard: Edit Competency Parameter</title>
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
                <Typography variant="h4">Edit Competency Parameter</Typography>
              </Grid>
              <Grid item>
              <Link
                href={'/dashboard/competencies/suggestions'}
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
              Edit Competency Suggestion
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Edit competency Suggestion on the internal platform
              </Typography>
            </Box>
        <form noValidate>
        
        <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-helper-label">Competency Group</InputLabel>
          <Select
          autoFocus
          error={Boolean(formik.touched.competencyGroupId && formik.errors.competencyGroupId)}
          fullWidth
          helperText={formik.touched.competencyGroupId && formik.errors.competencyGroupId}
          value={formik.values.competencyGroupId}
          label="Competency Group"
          margin="normal"
          name="competencyGroupId"
          onChange={formik.handleChange}
          >
            {competencyGroup.map((c,index) => 
              <MenuItem key={index} value={c.id}>{c.title}</MenuItem>
            )}
          </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-helper-label">Competency Parameter</InputLabel>
          <Select
          autoFocus
          error={Boolean(formik.touched.competencyParameterSuggestionId && formik.errors.competencyParameterSuggestionId)}
          fullWidth
          helperText={formik.touched.competencyParameterSuggestionId && formik.errors.competencyParameterSuggestionId}
          value={formik.values.competencyParameterSuggestionId}
          label="Competency Parameter"
          margin="normal"
          name="competencyParameterSuggestionId"
          onChange={formik.handleChange}
          >
            {competencyParamerter.map((c,index) => 
                <MenuItem key={index} value={c.id}>{c.title}</MenuItem>
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
            Edit Competency Suggestion
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
                        <b> Competency Suggestion Added Successfully </b>
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

AddCompetencySuggestions.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AddCompetencySuggestions;
