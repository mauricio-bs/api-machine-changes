import React, {useState, useEffect} from 'react';
//Material-UI
//Core
import { Container, makeStyles, Grid, Paper, Box, Fab, Table,
TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
//Icons
import {Delete, Edit} from '@material-ui/icons'
//Components
import Menu from '../../../components/menu'
import Footer from '../../../components/footer';
//Api
import api from '../../../services/api'

//Stylesheet
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    title: {
        flexGrow: 1,
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
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}))

export default function UsersList(){
    const classes = useStyles()

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/api/users')
            setUsers(response.data)
        }
    }, [])

    async function handleDelete(id){
		if(window.confirm('Deseja realmente excluir este usuario?')){
			let result = await api.delete('/api/users/' + id)
			if(result.status === 200){
				window.location.href = '/admin/users'
			}else{
				alert('Ocorreu um erro interno, favor tente novamente mais tarde')
			}
		}
	}

    return(
        <div className={classes.root}>
            <Menu title={"Usuários"}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth='lg' className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Paper className={classes.paper}>
                                <h2>Lista de Usuarios</h2>
                                <Grid item xs={12} sm={12}>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>8ID</TableCell>
                                                    <TableCell align="right" >Nome</TableCell>
                                                    <TableCell align="right">Email</TableCell>
                                                    <TableCell align="right">Cargo</TableCell>
                                                    <TableCell align="right">Data de cadastro</TableCell>
                                                    <TableCell align="right">Ativo</TableCell>
                                                    <TableCell align="right">Opções</TableCell>
                                                </TableRow>
                                                <TableBody>
                                                    {users.map((row) => {
                                                        <TableRow key={row._id}>
                                                            {/* 8ID Collum */}
                                                            <TableCell
                                                                align='center'
                                                                component='th'
                                                                scope='row'>
                                                                {row.id8}
                                                            </TableCell>
                                                            {/* Name of users Collum */}
                                                            <TableCell align='center'>
                                                                {row.name}
                                                            </TableCell>
                                                            {/* Email Collum */}
                                                            <TableCell align='center'>
                                                                {row.email}
                                                            </TableCell>
                                                            {/* Role collum */}
                                                            <TableCell align='center'>
                                                                {row.role}
                                                            </TableCell>
                                                            {/* Created at */}
                                                            <TableCell align='center'>
                                                                {new Date(row.createdAt).toLocaleDateString('pt-br')}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Fab color='primary' aria-label='edit' href={'/admin/users/update'+ row._id}>
                                                                    <Edit/>
                                                                </Fab>
                                                                <Fab color='secondary' aria-label='delete' onClick={() => handleDelete(row._id)}>
                                                                    <Delete/>
                                                                </Fab>
                                                            </TableCell>
                                                        </TableRow>
                                                    })}
                                                </TableBody>
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>
        </div>
    )
}