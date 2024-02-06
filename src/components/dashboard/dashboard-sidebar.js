import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Home as HomeIcon } from "../../icons/home";
import { Selector as SelectorIcon } from "../../icons/selector";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Users as UsersIcon } from "../../icons/users";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";

const getSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Overview"),
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: t("Account"),
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("Management"),
    items: [
      {
        title: t("Users"),
        path: "/dashboard/customers",
        icon: <UsersIcon fontSize="small" />,
        
      },
    ],
  },
  {
    title: t("Teams"),
    items: [
      {
        title: t("Team Groups"),
        path: "/dashboard/teams/groups",
        icon: <UsersIcon fontSize="small" />,
        
      },
      {
        title: t("Team Members"),
        path: "/dashboard/teams/members",
        icon: <UsersIcon fontSize="small" />,
        
      },
    ]
  },
  {
    title: t("Competencies"),
    items: [
      {
        title: t("Competency Groups"),
        path: "/dashboard/competencies/groups",
        icon: <UsersIcon fontSize="small" />,
        
      },
      {
        title: t("Competency Parameters"),
        path: "/dashboard/competencies/parameters",
        icon: <UsersIcon fontSize="small" />,
        
      },
      {
        title: t("Competency Plans"),
        path: "/dashboard/competencies/plans",
        icon: <UsersIcon fontSize="small" />,
        
      },
      {
        title: t("Competency Suggestions"),
        path: "/dashboard/competencies/suggestions",
        icon: <UsersIcon fontSize="small" />,
        
      },
    ],
  },
  {
    title: t("Coaching Sessions"),
    items: [
      {
        title: t("Scheduled Sessions"),
        path: "/dashboard/sessions/schedule",
        icon: <UsersIcon fontSize="small" />,
        
      },
    ]
  },
  // {
  //   title: t("Pages"),
  //   items: [
  //     {
  //       title: t("Error"),
  //       path: "/error",
  //       icon: <XCircleIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: "401",
  //           path: "/401",
  //         },
  //         {
  //           title: "404",
  //           path: "/404",
  //         },
  //         {
  //           title: "500",
  //           path: "/500",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Company Name
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    Mercuri International
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: "neutral.500",
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          {/* <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t("Need Help?")}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {t("Check our docs")}
            </Typography>
            <NextLink href="/docs/welcome" passHref>
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t("Documentation")}
              </Button>
            </NextLink>
          </Box> */}
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
