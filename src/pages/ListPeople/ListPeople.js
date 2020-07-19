import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import {
    getPeople,
    updatePeople,
    deletePeople,
    addPeople,
} from '../../actions/people'
import { getPositions } from '../../actions/position'
import { getModules } from '../../actions/module'
import { getElectoralAreas } from '../../actions/electoral'
import MaterialTable from 'material-table'

const styles = (theme) => ({
    margin: {
        margin: theme.spacing(1),
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
})

let position
let electoral
let _module
let all_positions
let all_electoral_areas
let all_modules
const People = (props) => {
    const convertArrayToObject = (array, key) => {
        const initialValue = {}
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item.name,
            }
        }, initialValue)
    }

    const { classes, people, positions, electoralAreas, modules } = props
    if (positions.positions && positions.positions.rows) {
        all_positions = positions.positions && positions.positions.rows
        position = convertArrayToObject(all_positions, 'id')
    }

    if (electoralAreas.electoralAreas && electoralAreas.electoralAreas.rows) {
        all_electoral_areas = electoralAreas.electoralAreas && electoralAreas.electoralAreas.rows
        electoral = convertArrayToObject(all_electoral_areas, 'id')
    }

    if (modules.modules && modules.modules.rows) {
        all_modules = modules.modules && modules.modules.rows
        _module = convertArrayToObject(all_modules, 'id')
    }
    
    useEffect(() => {
        props.getPeople()
        if (props.getElectoralAreas()) props.getElectoralAreas()
        if (props.getPositions()) {
            props.getPositions()
        }
        if (props.getModules()) props.getModules()
    }, [])

    console.log('the positions', position)

    const [state, setState] = useState({
        columns: [
            { title: 'Voters ID', field: 'voters_id' },
            { title: 'First Name', field: 'first_name' },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Other Name', field: 'other_name' },
            { title: 'Polling Station', field: 'polling_station' },
            { title: 'Module', field: 'moduleId' },
            { title: 'Position', field: 'positionId' },
            { title: 'Electoral Area', field: 'electoralId' },
            { title: 'Added On', field: 'createdAt', type: 'datetime' },
            { title: 'Updated On', field: 'updatedAt', type: 'datetime' },
        ],
        data: [],
    })

    useEffect(() => {
        if (people !== undefined && position) {
            if (people.people && people.people.rows) {
                setState((prevState) => {
                    const data = [...(people.people && people.people.rows)]
                    const columns = [
                        { title: 'Voters ID', field: 'voters_id' },
                        { title: 'First Name', field: 'first_name' },
                        { title: 'Last Name', field: 'last_name' },
                        { title: 'Other Name', field: 'other_name' },
                        { title: 'Polling Station', field: 'polling_station' },
                        { title: 'Module', field: 'moduleId', lookup: _module },
                        { title: 'Position', field: 'positionId', lookup: position },
                        { title: 'Electoral Area', field: 'electoralId', lookup: electoral },
                        { title: 'Added On', field: 'createdAt', type: 'datetime' },
                        { title: 'Updated On', field: 'updatedAt', type: 'datetime' },
                    ]
                    return { ...prevState, data, columns }
                })
            }
        }
    }, [people ? people.people && people.people.rows : ''])
    console.log('the data', state.data)

    const updatePeople = (data) => props.updatePeople(data.id, data)
    const deletePeople = (data) => props.deletePeople(data.id)

    return (
        <Card className={classes.card}>
            <AppBar
                position='static'
                color='default'
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography color='inherit' className='flexSpacer'>
                        <small>
                            <em>you are here:</em>
                        </small>{' '}
                        Dashboard / Members / <strong>All Members</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title='All Members'
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve()
                                    if (oldData) {
                                        updatePeople(newData)
                                        setState((prevState) => {
                                            const data = [...prevState.data]
                                            data[
                                                data.indexOf(oldData)
                                            ] = newData
                                            return { ...prevState, data }
                                        })
                                    }
                                }, 600)
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                deletePeople(oldData)
                                setTimeout(() => {
                                    resolve()
                                    setState((prevState) => {
                                        const data = [...prevState.data]
                                        data.splice(data.indexOf(oldData), 1)
                                        return { ...prevState, data }
                                    })
                                }, 600)
                            }),
                    }}
                />
            </CardContent>
        </Card>
    )
}

People.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    people: state.people.people,
    positions: state.positions.positions,
    modules: state.modules.modules,
    electoralAreas: state.electoralAreas.electoralAreas,
})

export default withStyles(styles)(
    connect(mapStateToProps, {
        getPeople,
        updatePeople,
        deletePeople,
        addPeople,
        getPositions,
        getModules,
        getElectoralAreas,
    })(People)
)
