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
    getCandidates,
    updateCanditate,
    deleteCandidate,
    addCandidate,
} from '../../actions/candidates';
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


const Candidates = (props) => {
    const { classes, candidates } = props;

    const [state, setState] = useState({
        columns: [
            { title: 'First Name', field: 'first_name' },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Manifesto', field: 'manifesto' },
            { title: 'Gender', field: 'gender' },
            { title: 'Party', field: 'political_partyId' },
        ],
        data: [],
    });
    useEffect(() => {
        props.getCandidates();
    }, []);

    useEffect(() => {
        if (candidates.allCandidates && candidates.allCandidates.rows) {
            setState((prevState) => {
                const data = [
                    ...(candidates.allCandidates && candidates.allCandidates.rows),
                ];
                return { ...prevState, data };
            });
        }
    }, [candidates.allCandidates && candidates.allCandidates.rows]);

    const updateCanditate = (data) => props.updateCanditate(data.id, data);
    const deleteCandidate = (data) => props.deleteCandidate(data.id);

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
                        Dashboard / Candidates /{' '}
                        <strong>All Candidates</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title="All Candidates"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        updateCanditate(newData);
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
                                deleteCandidate(oldData);
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

Candidates.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    candidates: state.candidates.candidates,
});

export default withStyles(styles)(
    connect(mapStateToProps, {
        getCandidates,
        updateCanditate,
        deleteCandidate,
        addCandidate,
    })(Candidates)
);
