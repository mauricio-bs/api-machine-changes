import React, {useState} from "react"
//Core
import {makeStyles, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
//Icons
import { Dashboard, SwapHorizontalCircle, BusinessSharp, Build, ExpandLess, ExpandMore, Settings, 
VideoLabel, Web, Dvr, AccountTree, PersonAdd, Person, People} from '@material-ui/icons'

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

export default function AdminMenu() {
	const classes = useStyles()
	
	//Open/Close components list
	const [compOpen, setCompOpen] = useState(false)
	const handleComponentsNest = () => {
		setCompOpen(!compOpen)
	}
	//Open/Close users list
	const [userOpen, setUserOpen] = useState(false)
	const handleUsersNest = () => {
		setUserOpen(!userOpen)
	}

	return (
		<div>
			<ListItem button component='a' href={'/admin'}>
				<ListItemIcon>
					<Dashboard />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<SwapHorizontalCircle />
				</ListItemIcon>
				<ListItemText primary='Modificações' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<BusinessSharp />
				</ListItemIcon>
				<ListItemText primary='Maquinas' />
			</ListItem>
			<ListItem button onClick={handleComponentsNest}>
				<ListItemIcon>
					<Build />
				</ListItemIcon>
				<ListItemText primary='Componentes' />
				{compOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={compOpen} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<Dvr />
						</ListItemIcon>
						<ListItemText primary='CNC' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<AccountTree />
						</ListItemIcon>
						<ListItemText primary='PLC' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<VideoLabel />
						</ListItemIcon>
						<ListItemText primary='IHM' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<Settings />
						</ListItemIcon>
						<ListItemText primary='Drive' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<Web />
						</ListItemIcon>
						<ListItemText primary='Software' />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={handleUsersNest}>
				<ListItemIcon>
					<Person />
				</ListItemIcon>
				<ListItemText primary='Usuários' />
				{userOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={userOpen} timeout='auto' unmountOnExit>
				<ListItem button className={classes.nested} component='a' href='/admin/users/all-users'>
					<ListItemIcon>
						<People />
					</ListItemIcon>
					<ListItemText primary='Todos Usuarios'/>
				</ListItem>
				<ListItem button className={classes.nested} component='a' href='/admin/users/register'>
					<ListItemIcon>
						<PersonAdd />
					</ListItemIcon>
					<ListItemText primary='Cadastrar'/>
				</ListItem>
			</Collapse>
		</div>
	)
}
