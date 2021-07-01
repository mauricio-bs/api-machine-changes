import React from "react"
//Material-UI
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Box, Container } from "@material-ui/core"
//Components
import Footer from "../../../components/footer"
import MenuAdmin from "../../../components/menu"

//Stylesheet
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}))

export default function Dashboard() {
	//Use Stylesheet
  const classes = useStyles()

	return (
		<div className={classes.root}>
			<MenuAdmin title={"Dashboard"} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='lg' className={classes.container}>
					<Grid container spacing={3}></Grid>
					<Box pt={4}>
						<Footer />
					</Box>
				</Container>
			</main>
		</div>
	)
}
