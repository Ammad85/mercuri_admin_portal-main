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
import { customerApi } from "../../../../__fake-api__/customer-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { CustomerListTable } from "../../../../components/dashboard/customer/customer-list-table";
import { useMounted } from "../../../../hooks/use-mounted";
import { Download as DownloadIcon } from "../../../../icons/download";
import { Plus as PlusIcon } from "../../../../icons/plus";
import { Search as SearchIcon } from "../../../../icons/search";
import { Upload as UploadIcon } from "../../../../icons/upload";
import { gtm } from "../../../../lib/gtm";
import { axiosClient } from "../../../../api/config";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Alert, FormHelperText, CircularProgress } from "@mui/material";
import { useAuth } from "../../../../hooks/use-auth";
import NextLink from 'next/link';
import { Logo } from '../../../../components/logo';
import Link from "next/link";
import _ from "lodash";


const CustomerAdd = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const  [userRoles, setUserRoles] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: "",
      employeeNumber: "",
      password: "",
      title: "",
      firstName: "",
      lastname: "",
      mobile: "",
      officeTel: "",
      enabled: false,
      director: false,
      coach: false,
      coachee: false,
      companyId: 1,
      userRoles: [],
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      title: Yup
        .string()
        .max(255)
        .required('Title is required'),
      employeeNumber: Yup
        .string()
        .max(255)
        .required('Title is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First Name is required'),
      lastname: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
      mobile: Yup
        .string()
        .max(255)
        .required('Mobile no is required'),
      password: Yup
        .string()
        .min(7)
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);
      let body = values;
      delete body["submit"];
      body["username"] = body.email;
      if (body.director) {
        body["userRoles"] = [1]
      }
      if (body.coach) {
        body["userRoles"] = [...body.userRoles, 2]
      }
      if (body.coachee) {
        body["userRoles"] = [...body.userRoles, 3]
      }
    _.uniq(body.userRole);
      delete body["director"];
      delete body["coach"];
      delete body["coachee"];
      const res = register(body);
      if (res) {
        setSuccess(true);
      }else setSuccess(false);
      setLoading(false);
    },
  });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);


 
  useEffect(
    () => {
      
    },
    []
  );

  return (
    <>
      <Head>
        <title>Dashboard: Add User</title>
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
                <Typography variant="h4">Add User</Typography>
              </Grid>
              <Grid item>
              <Link
         href={'/dashboard/customers'}
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
                Add User
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Add user on the internal platform
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
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          fullWidth
          helperText={formik.touched.firstName && formik.errors.firstName}
          label="First Name"
          margin="normal"
          name="firstName"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstName}
                  />
        <TextField
          autoFocus
          error={Boolean(formik.touched.lastname && formik.errors.lastname)}
          fullWidth
          helperText={formik.touched.lastname && formik.errors.lastname}
          label="Last Name"
          margin="normal"
          name="lastname"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastname}
        />
        <TextField
          autoFocus
          error={Boolean(formik.touched.employeeNumber && formik.errors.employeeNumber)}
          fullWidth
          helperText={formik.touched.employeeNumber && formik.errors.employeeNumber}
          label="Employee Number"
          margin="normal"
          name="employeeNumber"
          type="employeeNumber"          
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.employeeNumber}
        />
        <TextField
          autoFocus
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email"
          margin="normal"
          name="email"
          type="email"          
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />          
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
                  />
                   <TextField
          autoFocus
          error={Boolean(formik.touched.mobile && formik.errors.mobile)}
          fullWidth
          helperText={formik.touched.mobile && formik.errors.mobile}
          label="Mobile No"
          margin="normal"
          name="mobile"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.mobile}
                  />
         <TextField
          autoFocus
          error={Boolean(formik.touched.officeTel && formik.errors.officeTel)}
          fullWidth
          helperText={formik.touched.officeTel && formik.errors.officeTel}
          label="Office Tel"
          margin="normal"
          name="officeTel"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.officeTel}
        />
        <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: -1,
          mt: 2
        }}
      >
        <Checkbox
          checked={formik.values.enabled}
          name="enabled"
          onChange={formik.handleChange}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Enabled
        </Typography>
      </Box>           
        <Box
        sx={{
          mb: 1,
          mt: 1
        }}
        >
        <Typography>
          Select Roles
        </Typography>            
        <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 1,
          mt: 1
        }}
      >
        <Checkbox
          checked={formik.values.director}
          name="director"
          onChange={formik.handleChange}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Director
        </Typography>
        </Box>
        <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 1,
          mt: 1
        }}
      >
        <Checkbox
          checked={formik.values.coach}
          name="coach"
          onChange={formik.handleChange}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Coach
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 1,
          mt: 1
        }}
      >
        <Checkbox
          checked={formik.values.coachee}
          name="coachee"
          onChange={formik.handleChange}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Coachee
        </Typography>
                  </Box>
      </Box>                  
                 
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
            Add User
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
                        <b> User added successfully </b>
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

CustomerAdd.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerAdd;
