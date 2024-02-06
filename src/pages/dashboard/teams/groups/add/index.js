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


const AddCompanyGroup = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);
  const formik = useFormik({
    initialValues: {
      teamName: "",
      applicationUserId: "",
      companyId: 1,
      submit: null,
    },
    validationSchema: Yup.object({
      teamName: Yup
        .string()
        .max(255)
        .required('Team Name is required'),
      applicationUserId: Yup
        .string()
        .max(255)
        .required('User is required'),
      companyId: Yup
        .number()
        .required('Company is required'),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let body = values;
      delete body["submit"];
      try {
        await axiosClient.post("Team/addCompanyTeam", values).then((res) => {
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
      .get("Company/getCompanies", {})
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
    return response;
  };

  const getCompanyUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCompanyUsers();
      if (isMounted()) {
        setCompanyUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [isMounted]);

  const getAllCompanyUsers = async () => {
    let response =[]
    await axiosClient
      .get(`User/getUsersForCompany?companyId=${formik.values.companyId}`, {})
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
      getCompanyUsers()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      getCompanyUsers()
    },
    [formik.values.companyId]
  );


  return (
    <>
      <Head>
        <title>Dashboard: Add Company Team</title>
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
                <Typography variant="h4">Add Company Team</Typography>
              </Grid>
              <Grid item>
              <Link
         href={'/dashboard/teams/groups'}
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
              Add Company Team
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Add company team on the internal platform
              </Typography>
            </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          error={Boolean(formik.touched.teamName && formik.errors.teamName)}
          fullWidth
          helperText={formik.touched.teamName && formik.errors.teamName}
          label="Team Name"
          margin="normal"
          name="teamName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.teamName}
                  />
        <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-helper-label">Company Id</InputLabel>
          <Select
          autoFocus
          error={Boolean(formik.touched.companyId && formik.errors.companyId)}
          fullWidth
          helperText={formik.touched.companyId && formik.errors.companyId}
          value={formik.values.companyId}
          label="Company Id"
          margin="normal"
          name="companyId"
          onChange={formik.handleChange}
          >
            {company.map((c,index) => 
                <MenuItem key={index} value={c.companyId}>{c.companyName}</MenuItem>
            )}
          </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
          <Select
          autoFocus
          error={Boolean(formik.touched.applicationUserId && formik.errors.applicationUserId)}
          fullWidth
          helperText={formik.touched.applicationUserId && formik.errors.applicationUserId}
          value={formik.values.applicationUserId}
          label="User Id"
          margin="normal"
          name="applicationUserId"
          onChange={formik.handleChange}
          >
            {companyUsers.map((c,index) => 
                <MenuItem key={index} value={c.userId}>{`${c.title} ${c.firstName} ${c.lastname} `}</MenuItem>
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
            Add Company Team
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
                        <b> Company Team Added Successfully </b>
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

AddCompanyGroup.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AddCompanyGroup;
