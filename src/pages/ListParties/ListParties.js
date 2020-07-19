import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {
    getParties,
    updateParty,
    deleteParty,
    addParty,
} from '../../actions/parties';
import MaterialTable from 'material-table';

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
});


const Parties = (props) => {
    const { classes, parties } = props;
    const [state, setState] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Bio', field: 'bio' },
            { title: 'Established', field: 'established', type: 'numeric' },
        ],
        data: [],
    });
    useEffect(() => {
        props.getParties();
    }, []);

    useEffect(() => {
        if(parties !== undefined){
        if (parties.allParties && parties.allParties.rows) {
            setState((prevState) => {
                const data = [
                    ...(parties.allParties && parties.allParties.rows),
                ];
                return { ...prevState, data };
            });
        }
    }
    }, [ parties ? parties.allParties && parties.allParties.rows : '']);

    const updateParty = (data) => props.updateParty(data.id, data);
    const deleteParty = (data) => props.deleteParty(data.id);

    return (
        <Card className={classes.card}>
            <AppBar
                position="static"
                color="default"
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography color="inherit" className="flexSpacer">
                        <small>
                            <em>you are here:</em>
                        </small>{' '}
                        Dashboard / Political Parties /{' '}
                        <strong>All Parties</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title="All Parties"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        updateParty(newData);
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[
                                                data.indexOf(oldData)
                                            ] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                deleteParty(oldData);
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />
            </CardContent>
        </Card>
    );
};

Parties.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    parties: state.parties.parties,
});

export default withStyles(styles)(
    connect(mapStateToProps, {
        getParties,
        updateParty,
        deleteParty,
        addParty,
    })(Parties)
);
