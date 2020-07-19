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
import { getPeople, cleanUp } from '../../actions/people'
import { getPositions } from '../../actions/position'
import { addDues } from '../../actions/dues'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
// import 'date-fns'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { Alerts } from '../../components'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { TextareaAutosize, TextField } from '@material-ui/core'

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
const AddDues = (props) => {
    user = JSON.parse(localStorage.getItem('user'))
    const [values, setValues] = useState({
        peopleId: '',
        positionId: '',
        amount: '',
        type: '',
        from: '',
        to: '',
        purpose: '',
        userId: user.id,
    })
    const [alert, setAlert] = useState({ state: false })
    const [open, setOpen] = useState(false)
    // The first commit of Material-UI
    const [selectedFrom, setSelectedFrom] = useState(new Date())
    const [selectedTo, setSelectedTo] = useState(new Date())

    const handleFromDate = (date) => {
        setSelectedFrom(date)
        setValues((prevState) => ({ ...prevState, from: date.toISOString() }))
    }
    const handleToDate = (date) => {
        setSelectedTo(date)
        setValues((prevState) => ({ ...prevState, to: date.toISOString() }))
    }

    const onChange = (e) => {
        e.persist()
        console.log('the event', e)
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const { classes, error, success, history, people, positions } = props

    useEffect(() => {
        if (props.getPositions()) props.getPositions()
        if (props.getPeople()) props.getPeople()
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
                history && history.push('/dues/list-dues')
                setAlert({ state: false })
            }, 2000)
            return () => {
                props.cleanUp_()
            }
        }
    }, [success, error])

    const submit = (e) => {
        e.preventDefault()
        console.log('the dues values', values)
        props.addDues(values);
    }
    console.log('the props', props)
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
                        Add Dues
                    </Typography>
                </Toolbar>
                <Alerts />
            </AppBar>
            <CardContent className={classes.content}>
                <form onSubmit={submit}>
                    <Grid container>
                        <TextField
                            className={classes.margin}
                            id='people_id'
                            onChange={onChange}
                            name='peopleId'
                            select
                            label='Select Member'
                            helperText='Please select the member'
                            variant='filled'
                        >
                            {people && people.people && people.people.rows ? (
                                people.people.rows.map((person) => {
                                    return (
                                        <MenuItem
                                            key={person.id}
                                            value={person.id}
                                        >
                                            {person.first_name +
                                                ' ' +
                                                person.last_name +
                                                ' ' +
                                                person.other_name}
                                        </MenuItem>
                                    )
                                })
                            ) : (
                                <MenuItem>No Members Yet</MenuItem>
                            )}
                        </TextField>

                        <TextField
                            className={classes.margin}
                            id='position_id'
                            onChange={onChange}
                            name='positionId'
                            select
                            label='Select Position'
                            helperText='Please select member position'
                            variant='filled'
                        >
                            {positions &&
                            positions.positions &&
                            positions.positions.rows ? (
                                positions.positions.rows.map((positions) => {
                                    return (
                                        <MenuItem
                                            key={positions.id}
                                            value={positions.id}
                                        >
                                            {positions.name}
                                        </MenuItem>
                                    )
                                })
                            ) : (
                                <MenuItem>No Positions Yet</MenuItem>
                            )}
                        </TextField>

                        <TextField
                            className={classes.margin}
                            id='amount'
                            onChange={onChange}
                            name='amount'
                            label='Enter amount'
                            variant='filled'
                            type='number'
                        />

                        <TextField
                            className={classes.margin}
                            id='type'
                            onChange={onChange}
                            name='type'
                            select
                            label='Select Type'
                            helperText='Please select dues type'
                            variant='filled'
                        >
                            <MenuItem key='dues' value='dues'>
                                Dues
                            </MenuItem>
                            <MenuItem key='donation' value='donation'>
                                Donation
                            </MenuItem>
                        </TextField>

                        {/* <FormControl>
                            <TextField
                                id='purpose'
                                onChange={onChange}
                                name='purpose'
                                label='Purpose'
                                variant='filled'
                            />
                        </FormControl> */}
                        <TextField
                            className={classes.margin}
                            multiline
                            rows={4}
                            // defaultValue='Default Value'
                            id='purpose'
                            onChange={onChange}
                            name='purpose'
                            label='Purpose'
                            variant='filled'
                        />
                    </Grid>

                    <FormControl className={classes.margin}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify='space-around'>
                                {/* <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='MM/dd/yyyy'
                                    margin='normal'
                                    id='date-picker-inline'
                                    label='Date picker inline'
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                /> */}
                                <KeyboardDatePicker
                                    className={classes.margin}
                                    margin='normal'
                                    id='from'
                                    label='From when?'
                                    format='MM/dd/yyyy'
                                    name='from'
                                    value={selectedFrom}
                                    onChange={handleFromDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    className={classes.margin}
                                    margin='normal'
                                    id='to'
                                    label='To When?'
                                    format='MM/dd/yyyy'
                                    name='to'
                                    value={selectedTo}
                                    onChange={handleToDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                {/* <KeyboardTimePicker
                                    margin='normal'
                                    id='time-picker'
                                    label='Time picker'
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                /> */}
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </FormControl>

                    <div className={classes.margin_}>
                        <Button
                            variant='contained'
                            type='submit'
                            color='primary'
                        >
                            Add Dues
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

addDues.propTypes = {
    classes: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    dues: state.dues,
    people: state.people.people,
    positions: state.positions.positions,
})
export const cleanUp_ = () => cleanUp()

export default withStyles(styles)(
    connect(mapStateToProps, {
        addDues,
        getPositions,
        getPeople,
        cleanUp_,
    })(AddDues)
)
