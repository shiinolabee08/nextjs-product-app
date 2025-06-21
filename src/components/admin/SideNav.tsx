import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'

const drawerWidth = 240

const SideNav = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            AJP Templates
          </Typography>
        </Toolbar>
        <List>
          {[
            { text: "Home", icon: <HomeIcon />, link: '/'  },
            { text: "About", icon: <InfoIcon />, link: '/about' },
            { text: "Settings", icon: <SettingsIcon />, link: '/settings' },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography>
          This is the main content area. Add your routes or content here.
        </Typography>
      </Box> */}
    </Box>
  )
}

export default SideNav
