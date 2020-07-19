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
    getPositions,
    updatePosition,
    deletePosition,
    addPosition,
} from '../../actions/position';
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


const Positions = (props) => {
    const { classes, positions } = props;
    const [state, setState] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'createdAt', field: 'createdAt' },
            { title: 'updatedAt', field: 'updatedAt' }
        ],
        data: [],
    });
    useEffect(() => {
        props.getPositions();
    }, []);

    useEffect(() => {
        if(positions !== undefined){
        if (positions.positions && positions.positions.rows) {
            setState((prevState) => {
                const data = [
                    ...(positions.positions && positions.positions.rows),
                ];
                return { ...prevState, data };
            });
        }
    }
    }, [ positions ? positions.positions && positions.positions.rows : '']);

    const updatePosition = (data) => props.updatePosition(data.id, data);
    const deletePosition = (data) => props.deletePosition(data.id);

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
                        Dashboard / Positions /{' '}
                        <strong>All Positions</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title="All Positions"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        updatePosition(newData);
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
                                deletePosition(oldData);
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

Positions.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    positions: state.positions.positions,
});

export default withStyles(styles)(
    connect(mapStateToProps, {
        getPositions,
        updatePosition,
        deletePosition,
        addPosition,
    })(Positions)
);
