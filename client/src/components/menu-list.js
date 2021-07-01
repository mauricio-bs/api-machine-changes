import React from "react"
//Material-UI
//Core
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
//Iconst
import {BusinessSharp, SwapHorizontalCircle, Dashboard} from '@material-ui/icons'

export default function Menu() {
	return (
		<div>
			<ListItem button component='a' href={'/home'}>
				<ListItemIcon>
					<Dashboard />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
			<ListItem button component='a' href={'/modifications'}>
				<ListItemIcon>
					<SwapHorizontalCircle />
				</ListItemIcon>
				<ListItemText primary='Modificações' />
			</ListItem>
			<ListItem button component='a' href={'/modifications'}>
				<ListItemIcon>
					<BusinessSharp />
				</ListItemIcon>
				<ListItemText primary='Maquinas' />
			</ListItem>
		</div>
	)
}
