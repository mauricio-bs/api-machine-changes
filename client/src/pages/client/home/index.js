import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../../components/footer';
import Menu from '../../../components/menu';
import { Grid, Box, Container } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Dashboard() {
  const classes = useStyles();
 

  return (
    <div className={classes.root}>
    <Menu title={'Dashboard'}/>
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
        </Grid>
        <Box pt={4}>
          <Footer />
        </Box>
      </Container>
    </main>
  </div>
  )
}