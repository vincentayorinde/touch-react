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
    getDues,
    updateDues,
} from '../../actions/dues'
import { getPositions } from '../../actions/position'
import { getPeople } from '../../actions/people'
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
let all_positions
let people_
let user
let userId
let all_people
const Dues = (props) => {
    user = JSON.parse(localStorage.getItem('user'))

    const convertArrayToObjectName = (array, key) => {
        const initialValue = {}
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item.first_name+' '+item.last_name,
            }
        }, initialValue)
    }
    const convertArrayToObject = (array, key) => {
        const initialValue = {}
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item.name,
            }
        }, initialValue)
    }

    const { classes, dues, positions, people } = props
    if (positions.positions && positions.positions.rows) {
        all_positions = positions.positions && positions.positions.rows
        position = convertArrayToObject(all_positions, 'id')
    }
    if (people.people && people.people.rows) {
        all_people = people.people && people.people.rows
        people_ = convertArrayToObjectName(all_people, 'id')
    }
    
    useEffect(() => {
        props.getDues()
        
        if (props.getPositions()) {
            props.getPositions()
        }
        if (props.getPeople()) {
            props.getPeople()
        }
    }, [])

    console.log('the people', people)

    const [state, setState] = useState({
        columns: [
            { title: 'Member', field: 'peopleId', },
            { title: 'Position', field: 'positionId' },
            { title: 'Amount Paid', field: 'amount' },
            { title: 'Purpose', field: 'purpose' },
            { title: 'Type', field: 'type' },
            { title: 'From', field: 'from', type: 'datetime'  },
            { title: 'To', field: 'to', type: 'datetime' },
            { title: 'Added By', field: 'userId'},
            { title: 'Added On', field: 'createdAt', type: 'datetime' },
            { title: 'Updated On', field: 'updatedAt', type: 'datetime' },
        ],
        data: [],
    })

    useEffect(() => {
        if (dues !== undefined && position) {
            if (dues.dues && dues.dues.rows) {
                setState((prevState) => {
                    const data = [...(dues.dues && dues.dues.rows)]
                    const columns = [
                        { title: 'Member', field: 'peopleId', lookup: people_},
                        { title: 'Position', field: 'positionId', lookup: position },
                        { title: 'Amount Paid', field: 'amount' },
                        { title: 'Purpose', field: 'purpose' },
                        { title: 'Type', field: 'type' },
                        { title: 'From', field: 'from', type: 'date'  },
                        { title: 'To', field: 'to', type: 'date' },
                        { title: 'Added By', field: 'userId'},
                        { title: 'Added On', field: 'createdAt', type: 'datetime' },
                        { title: 'Updated On', field: 'updatedAt', type: 'datetime' }
                    ]
                    return { ...prevState, data, columns }
                })
            }
        }
    }, [dues ? dues.dues && dues.dues.rows : ''])
    console.log('the data', state.data)


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
                        Dashboard / Dues / <strong>All Dues</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title='All Dues'
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve()
                                    if (oldData) {
                                        updateDues(newData)
                                        setState((prevState) => {
                                            const data = [...prevState.data]
                                            data[
                                                data.indexOf(oldData)
                                            ] = newData
                                            return { ...prevState, data }
                                        })
                                    }
                                }, 600)
                            })
                    }}
                />
            </CardContent>
        </Card>
    )
}

Dues.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    people: state.people.people,
    dues: state.dues.dues,
    positions: state.positions.positions,
})

export default withStyles(styles)(
    connect(mapStateToProps, {
        getDues,
        updateDues,
        getPeople,
        getPositions
    })(Dues)
)

