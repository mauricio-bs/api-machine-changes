import React from "react"
//Core
import { makeStyles } from "@material-ui/core/styles"
import { Collapse, List } from "@material-ui/core"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import DashboardIcon from "@material-ui/icons/Dashboard"
//Icons
import PeopleIcon from "@material-ui/icons/People"
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle"
import BusinessSharpIcon from "@material-ui/icons/BusinessSharp"
import BuildIcon from "@material-ui/icons/Build"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import SettingsIcon from "@material-ui/icons/Settings"
import VideoLabelIcon from "@material-ui/icons/VideoLabel"
import WebIcon from "@material-ui/icons/Web"
import DvrIcon from "@material-ui/icons/Dvr"
import AccountTreeIcon from "@material-ui/icons/AccountTree"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}))

export default function SponsorMenu() {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const handleClick = () => {
		setOpen(!open)
	}

	return (
		<div>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<SwapHorizontalCircleIcon />
				</ListItemIcon>
				<ListItemText primary='Modificações' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<BusinessSharpIcon />
				</ListItemIcon>
				<ListItemText primary='Maquinas' />
			</ListItem>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<BuildIcon />
				</ListItemIcon>
				<ListItemText primary='Componentes' />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<DvrIcon />
						</ListItemIcon>
						<ListItemText primary='CNC' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<AccountTreeIcon />
						</ListItemIcon>
						<ListItemText primary='PLC' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<VideoLabelIcon />
						</ListItemIcon>
						<ListItemText primary='IHM' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Drive' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<WebIcon />
						</ListItemIcon>
						<ListItemText primary='Software' />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary='Usuários' />
			</ListItem>
		</div>
	)
}
