import React from "react"
import clsx from "clsx"
//Core
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import ListSubheader from "@material-ui/core/ListSubheader"
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
//Icons
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import NotificationsIcon from "@material-ui/icons/Notifications"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//Components
import AdminList from "./menu-list-admin"
import SponsorList from './menu-list-sponsor'
import UserList from './menu-list'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
}))

export default function MenuAdmin({ title }) {
	const classes = useStyles()

	const [open, setOpen] = React.useState(true)
	const handleDrawerOpen = () => {
		setOpen(true)
	}
	const handleDrawerClose = () => {
		setOpen(false)
	}
	//Check if user is Admin, supervisor, sponsor or technican through the token
	const userRole = token => {

	}
	return (
		<>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position='absolute'
					className={clsx(classes.appBar, open && classes.appBarShift)}>
					<Toolbar className={classes.toolbar}>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							className={clsx(
								classes.menuButton,
								open && classes.menuButtonHidden,
							)}>
							<MenuIcon />
						</IconButton>
						<Typography
							component='h1'
							variant='h6'
							color='inherit'
							noWrap
							className={classes.title}>
							{title}
						</Typography>
						<IconButton color='inherit'>
							<Badge badgeContent={5} color='secondary'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant='permanent'
					classes={{
						paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
					}}
					open={open}>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<ListSubheader inset>Principal</ListSubheader>
						{/* If user is Administrator / Supervisor */}
						<AdminList />
						{/* If User Is sponsor */}
						{/* <SponsorList/> */}
						{/* If User is technician */}
						{/* <UserList/> */}
					</List>
					<Divider />
					<List>
						<ListSubheader inset>Sair</ListSubheader>
						<ListItem button>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary='Sair' />
						</ListItem>
					</List>
				</Drawer>
			</div>
		</>
	)
}
