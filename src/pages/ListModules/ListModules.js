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
    getModules,
    updateModule,
    deleteModule,
    addModule,
} from '../../actions/module';
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


const Modules = (props) => {
    const { classes, modules } = props;
    const [state, setState] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'createdAt', field: 'createdAt' },
            { title: 'updatedAt', field: 'updatedAt' }
        ],
        data: [],
    });
    useEffect(() => {
        props.getModules();
    }, []);

    useEffect(() => {
        if(modules !== undefined){
        if (modules.modules && modules.modules.rows) {
            setState((prevState) => {
                const data = [
                    ...(modules.modules && modules.modules.rows),
                ];
                return { ...prevState, data };
            });
        }
    }
    }, [ modules ? modules.modules && modules.modules.rows : '']);

    const updateModule = (data) => props.updateModule(data.id, data);
    const deleteModule = (data) => props.deleteModule(data.id);

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
                        Dashboard / Modules /{' '}
                        <strong>All Modules</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title="All Modules"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        updateModule(newData);
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
                                deleteModule(oldData);
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

Modules.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    modules: state.modules.modules,
});

export default withStyles(styles)(
    connect(mapStateToProps, {
        getModules,
        updateModule,
        deleteModule,
        addModule,
    })(Modules)
);
