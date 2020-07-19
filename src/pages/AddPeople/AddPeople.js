import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CropOriginalIcon from '@material-ui/icons/CropOriginal'
import DescriptionIcon from '@material-ui/icons/Description'
import AppsIcon from '@material-ui/icons/Apps'
import EventIcon from '@material-ui/icons/Event'
import { addPeople, cleanUp } from '../../actions/people'
import { getPositions } from '../../actions/position'
import { getModules } from '../../actions/module'
import { getElectoralAreas } from '../../actions/electoral'

import { connect } from 'react-redux'
import { Alerts } from '../../components'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const styles = (theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    margin_: {
        marginTop: theme.spacing(4),
    },
    root: {
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    card: {
        position: 'relative',
        clear: 'both',
    },
    appBar: {
        boxShadow: theme.shadows[0],
    },
    progress: {
        marginLeft: theme.spacing(1),
    },
})
let type
let text
let user
const People = (props) => {
    console.log('the user', JSON.parse(localStorage.getItem('user')))
    user = JSON.parse(localStorage.getItem('user'))
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        other_name: '',
        positionId: '',
        moduleId: '',
        electoralId: '',
        polling_station: '',
        voters_id: '',
        userId: user.id,
    })
    const [alert, setAlert] = useState({ state: false })

    const onChange = (e) => {
        e.persist()
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const { classes, error, success, history } = props

    useEffect(() => {
        if (props.getElectoralAreas()) props.getElectoralAreas()
        if (props.getPositions()) props.getPositions()
        if (props.getModules()) props.getModules()
    }, [])
    useEffect(() => {
        if (error.error) {
            if (Array.isArray(error.message.message)) {
                let text_ = 'Issues: '

                for (let i = 0; i < error.message.message.length; i += 1) {
                    text_ +=
                        ', No. ' + i + ': ' + error.message.message[i].message
                }
                text = text_
                type = 'error'
                setAlert({ state: true })

                setTimeout(() => {
                    setAlert({ state: false })
                }, 2000)
            } else {
                setAlert({ state: true })
                text =
                    error.message.error ||
                    error.message ||
                    error.message.message
                type = 'error'

                setTimeout(() => {
                    setAlert({ state: false })
                }, 2000)
            }
            return () => {
                props.cleanUp_()
            }
        }
        if (success.status !== null && success.message) {
            setAlert({ state: true })
            text = success.message.message || success.message
            type = 'success'

            setTimeout(() => {
                history && history.push('/members/list-members')
                setAlert({ state: false })
            }, 2000)
            return () => {
                props.cleanUp_()
            }
        }
    }, [success, error])

    const submit = (e) => {
        e.preventDefault()
        console.log('the person values', values)
        props.addPeople(values);
    }

    return (
        <Card className={classes.card}>
            <AppBar
                position='static'
                color='default'
                className={classes.appBar}
            >
                <Toolbar>
                    {alert.state ? (
                        <Alerts
                            text={text}
                            type={type}
                            open={true}
                            position='right'
                        />
                    ) : (
                        ''
                    )}
                    <Typography color='inherit' className='flexSpacer'>
                        Add Memeber
                    </Typography>
                </Toolbar>
                <Alerts />
            </AppBar>
            <CardContent className={classes.content}>
                <form onSubmit={submit}>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='voters_id'>
                            Enter Voters ID
                        </InputLabel>
                        <Input
                            id='voters_id'
                            placeholder='Voters ID'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            name='voters_id'
                            onChange={onChange}
                        />
                    </FormControl>

                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='first_name'>
                            Enter First Name
                        </InputLabel>
                        <Input
                            id='first_name'
                            placeholder='First Name'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            name='first_name'
                            onChange={onChange}
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='last_name'>
                            Enter Last Name
                        </InputLabel>
                        <Input
                            id='last_name'
                            placeholder='Last Name'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            name='last_name'
                            onChange={onChange}
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='other_name'>
                            Enter Other Name
                        </InputLabel>
                        <Input
                            id='other_name'
                            placeholder='Other Name'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            name='other_name'
                            onChange={onChange}
                        />
                    </FormControl>

                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='position'>Position</InputLabel>
                        <Select
                            id='position'
                            onChange={onChange}
                            placeholder='Select Position'
                            name='positionId'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                        >
                            {props.positions &&
                            props.positions.positions &&
                            props.positions.positions.rows ? (
                                props.positions.positions.rows.map(
                                    (position) => {
                                        return (
                                            <MenuItem
                                                key={position.id}
                                                value={position.id}
                                            >
                                                {position.name}
                                            </MenuItem>
                                        )
                                    }
                                )
                            ) : (
                                <MenuItem>No Positions</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='module'>Module</InputLabel>
                        <Select
                            id='module'
                            onChange={onChange}
                            placeholder='Select Module'
                            name='moduleId'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                        >
                            {props.modules &&
                            props.modules.modules &&
                            props.modules.modules.rows ? (
                                props.modules.modules.rows.map((module) => {
                                    return (
                                        <MenuItem
                                            key={module.id}
                                            value={module.id}
                                        >
                                            {module.name}
                                        </MenuItem>
                                    )
                                })
                            ) : (
                                <MenuItem>No Modules</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='electoral'>
                            Electoral Area
                        </InputLabel>
                        <Select
                            id='electoral'
                            onChange={onChange}
                            placeholder='Select Electoral Area'
                            name='electoralId'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            default='Select Electoral Area'
                        >
                            {props.electoralAreas &&
                            props.electoralAreas.electoralAreas &&
                            props.electoralAreas.electoralAreas.rows ? (
                                props.electoralAreas.electoralAreas.rows.map(
                                    (electoral) => {
                                        return (
                                            <MenuItem
                                                key={electoral.id}
                                                value={electoral.id}
                                            >
                                                {electoral.name}
                                            </MenuItem>
                                        )
                                    }
                                )
                            ) : (
                                <MenuItem>No Electoral Areas</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor='polling_station'>
                            Enter Polling Station
                        </InputLabel>
                        <Input
                            id='polling_station'
                            placeholder='Polling Station'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            name='polling_station'
                            onChange={onChange}
                        />
                    </FormControl>

                    <div className={classes.margin_}>
                        <Button
                            variant='contained'
                            type='submit'
                            color='primary'
                        >
                            Add Person
                            {props.positions.isLoading ? (
                                <CircularProgress
                                    className={classes.progress}
                                    size={20}
                                    style={{ color: 'white' }}
                                />
                            ) : (
                                ''
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

addPeople.propTypes = {
    classes: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    people: state.people,
    positions: state.positions.positions,
    modules: state.modules.modules,
    electoralAreas: state.electoralAreas.electoralAreas,
})
export const cleanUp_ = () => cleanUp()

export default withStyles(styles)(
    connect(mapStateToProps, {
        addPeople,
        getPositions,
        getModules,
        getElectoralAreas,
        cleanUp_,
    })(People)
)
