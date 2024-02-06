import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const EditCompetencyParameter = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [competencyGroup, setCompetencyGroup] = useState([]);
  const [competencyParamerter, setCompetencyParamerter] = useState([]);
  const [competencyPlansParamerter, setCompetencyPlansParamerter] = useState([]);
  let selectedCompetencyGroup = competencyGroup.filter(({id}) => router.query.selectedCompetency?.includes(`${id}`));
  let list = selectedCompetencyGroup;
  let newArray = [];
  list.map((l) =>
    newArray.push({
      id: l.id,
      name: l.title,
      optionParameters: competencyParamerter.filter(({competencyGroup}) => competencyGroup === l.title) ,
      selectParameters: []
    })
  );
  list = newArray;
  const formik = useFormik({
    initialValues: {
      id: router.query.id,
      submit: null,
    },
    onSubmit: async () => {
      setLoading(true);
      let body = values;
      delete body["submit"];
      try {
      //   await axiosClient.post("Competency/addCompetencyParameter", values).then((res) => {
      //    if (res.status === 200) {
      //      setSuccess(true);
      //    }
      //  })
       
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

  const onSubmit = async (values, helpers) => {
    setLoading(true);
    if (router.query.id && router.query.selectedCompetency) {
      const planId = router.query.id;
      let body = [];
      list.map(function (subarray) {//this block will map  [2,7], [13, 47], [55,77] as in their own arrays individually?
        return subarray.selectParameters.map(function(subparams) {//this will iterate each index of the above array?
          body.push({
            competencyPlanId: Number(planId),
            competencyGroupId: Number(subarray.id),
            competencyParameterId: Number(subparams.id)
          });
        })
      })

      try {
        body.forEach(async (b) =>
          await axiosClient.post("Competency/addCompetencyPlanParameter", b).then((res) => {
           if (res.status === 200) {
             setSuccess(true);
           }
         })
        )
        setSuccess(true);
     
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
    setLoading(false);
  }


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

  const getAllCompetencyPlansParameters = async () => {
    let response =[]
    await axiosClient
      .get(`Competency/getCompetencyPlansParamters?competencyPlanId=${router.query.id}`, {})
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
    return response;
  };

  const getCompetencyPlansParameters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCompetencyPlansParameters();
      if (isMounted()) {
        setCompetencyPlansParamerter(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [isMounted]);


 
  useEffect(
    () => {
      getCompetencyGroup();
      getCompetencyParameters();
      getCompetencyPlansParameters()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Head>
        <title>Dashboard: Edit Competency Plan</title>
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
                <Typography variant="h4">Competency Plans</Typography>
              </Grid>
              <Grid item>
              <Link
              href={'/dashboard/competencies/plans'}
              >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{margin: '0px 8px' }}
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
                md: "30px",
                  },
            }}
              >
              <Typography variant="h5">
              Group Parameters list
              </Typography>
        {competencyPlansParamerter.map((plans =>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{plans.competencyGroup}</Typography>
        </AccordionSummary>    
        <AccordionDetails>
        {plans.parameters.map((para =>     
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        >
        <CircleIcon sx={{ fontSize: "12px" , margin: "0px 10px"}} />
        <Typography >
            {para.competencyParameter} 
        </Typography>
          </Grid>   
        ))}    
        </AccordionDetails>
      </Accordion>
      ))}
                <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">
              Available Groups
              </Typography>
              <Link
                  href={{ pathname: '/dashboard/competencies/groups', query: { ...router.query, plan: true } }}
                  
                >
                <Button
                    variant="contained"
                    color="info"
                    sx={{margin: '0px 8px' }}
                >
                  Add Group
                </Button>
              </Link>
                </Box>
                <Box
              sx={{
                mt:3
              }}
            >
                  {list.map((l, index) => (
                    <Autocomplete
                      sx={{ mt: 2, mb: 2, width: '100%' }}
                      multiple
                      id="checkboxes-tags-demo"
                      options={l.optionParameters}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.title}
                      onChange={(e, value) => {
                        console.log(list)
                        list[index].selectParameters = value
                      }
                      }
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.title}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label={l.name} placeholder={"Select Parameters"} />
                      )}
                    />
                  ))}
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
                  )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            // disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            onClick={onSubmit}        
          >
            Save
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
                        <b> Competency Plans Save Successfully </b>
                      </div>
             
                    </Alert>
                  </Box>
                }
              </Container>
            </Card>
            </Box>
        </Container>
      </Box>
    </>
  );
};

EditCompetencyParameter.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditCompetencyParameter;
