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
    getElectoralAreas,
    updateElectoralArea,
    deleteElectoralArea,
    addElectoralArea,
} from '../../actions/electoral';
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


const ElectoralAreas = (props) => {
    const { classes, electoralAreas } = props;
    const [state, setState] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'createdAt', field: 'createdAt' },
            { title: 'updatedAt', field: 'updatedAt' }
        ],
        data: [],
    });
    useEffect(() => {
        props.getElectoralAreas();
    }, []);

    useEffect(() => {
        if(electoralAreas !== undefined){
        if (electoralAreas.electoralAreas && electoralAreas.electoralAreas.rows) {
            setState((prevState) => {
                const data = [
                    ...(electoralAreas.electoralAreas && electoralAreas.electoralAreas.rows),
                ];
                return { ...prevState, data };
            });
        }
    }
    }, [ electoralAreas ? electoralAreas.electoralAreas && electoralAreas.electoralAreas.rows : '']);

    const updateElectoralArea = (data) => props.updateElectoralArea(data.id, data);
    const deleteElectoralArea = (data) => props.deleteElectoralArea(data.id);

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
                        Dashboard / Electoral Areas /{' '}
                        <strong>All Electoral Areas</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title="All Electoral Areas"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        updateElectoralArea(newData);
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
                                deleteElectoralArea(oldData);
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

ElectoralAreas.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    electoralAreas: state.electoralAreas.electoralAreas,
});

export default withStyles(styles)(
    connect(mapStateToProps, {
        getElectoralAreas,
        updateElectoralArea,
        deleteElectoralArea,
        addElectoralArea,
    })(ElectoralAreas)
);
