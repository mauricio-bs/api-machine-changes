import React, { useState } from 'react'
//Material-UI
//Core
import { Container, makeStyles, Grid, Paper, TextField, FormControl, Select, InputLabel, MenuItem, Button, Box, Switch} from '@material-ui/core'
//Icons
import {  } from '@material-ui/icons'
//Components
import Menu from '../../../components/menu'
import Footer from '../../../components/footer'
//Api
import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
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
		padding: 15,
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
    formControl: {
        width: '100%',
  },
  switch: {
      color: '#00FF00',
      
  },
  button: {
      margin: 10
  }
}))

export default function NewUser(){
    const classes = useStyles()

    const [form, setForm] = useState({
        name: '',
        id8: '',
        email: '',
        role: '',
        shift: '',
        password: '',
        active: ''
    })

    async function handleSubmit(){
        const data = {
            name: form.name,
            id8: form.id8,
            email: form.email,
            role: form.role,
            shift: form.shift,
            access: form.access,
            password: form.password
        }

        if(!form.name || !form.id8 || !form.email || !form.role || !form.shift || !form.password){
            
        }else{
            const response = await api.post('/api/users/create', data)

            if(response.status === 200){
                window.location.href = '/admin/users'
            }else{
                alert('Preencha todos os campos')
            }
        }
    }

    return(
        <div className={classes.root}>
            <Menu title={'Cadastro'}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth='lg' className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Paper className={classes.paper}>
                                <h2>Cadastro de Usuários</h2>
                                <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        required
                                        name='name'
                                        label='Nome'
                                        fullWidth
                                        autoComplete='name'
                                        value={form.name}
                                        onChange={e => setForm(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        required
                                        name='email'
                                        label='Email Corporativo'
                                        fullWidth
                                        autoComplete='email'
                                        value={form.email}
                                        onChange={e => setForm(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        required
                                        name='id8'
                                        label='8ID'
                                        fullWidth
                                        autoComplete='id8'
                                        value={form.id8}
                                        onChange={e => setForm(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id='Cargo'>Cargo</InputLabel>
                                        <Select
                                            labelId='Cargo'
                                            value={form.role}
                                            onChange={e => setForm(e.target.value)}
                                            >
                                            <MenuItem value={2}>Supervisor</MenuItem>
											<MenuItem value={3}>Encarregado</MenuItem>
											<MenuItem value={4}>Técnico</MenuItem>
                                            </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id='Turno'>Turno</InputLabel>
                                        <Select
                                            labelId='Turno'
                                            value={form.shift}
                                            onChange={e => setForm(e.target.value)}
                                            >
											<MenuItem value={4}>Administrativo</MenuItem>
                                            <MenuItem value={1}>Manhã</MenuItem>
											<MenuItem value={2}>Tarde</MenuItem>
											<MenuItem value={3}>Noturno</MenuItem>
                                            </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        required
                                        name='password'
                                        label='Senha'
                                        fullWidth
                                        autoComplete='password'
                                        type='password'
                                        value={form.password}
                                        onChange={e => setForm(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Switch
                                        checked
                                        value={form.active}
                                        // onChange={handleChange}
                                        className={classes.switch}
                                        defaultChecked
                                        color='primary'
                                        />
                                    Ativo
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant='contained' className={classes.button} onClick={handleSubmit} color='primary'>
                                        Salvar
                                    </Button>
                                    <Button variant='contained' className={classes.button} href='/admin/users/all-users' color='secondary'>
                                        Cancelar
                                    </Button>
                                </Grid>
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