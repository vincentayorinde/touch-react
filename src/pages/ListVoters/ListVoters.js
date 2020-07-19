import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Alerts } from '../../components';

import {
    getVoters,
    updateVoter,
    deleteVoter,
    addVoter,
    cleanUp,
} from '../../actions/voters';
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

let type;
let text;
const Voters = (props) => {
    const { classes, voters, error, success } = props;
    const [alert, setAlert] = useState({ state: false });
 
    const [state, setState] = useState({
        columns: [
            { title: 'Voter ID', field: 'voter_id' },
            { title: 'First Name', field: 'first_name' },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Occupation', field: 'occupation' },
            { title: 'Gender', field: 'gender' },
            { title: 'DoB', field: 'dob' },
        ],
        data: [],
    });
    useEffect(() => {
        props.getVoters();
    }, []);

    useEffect(() => {
        if (error.error) {
            if (Array.isArray(error.message.message)) {
                let text_ = 'Issues: ';
                for (let i = 0; i < error.message.message.length; i += 1) {
                    text_ +=
                        ', No. ' + i + ': ' + error.message.message[i].message;
                }
                text = text_;
                type = 'error';
                setAlert({ state: true });

                setTimeout(() => {
                    setAlert({ state: false });
                }, 2000);
            } else {
                setAlert({ state: true });
                text =
                    error.message.error ||
                    error.message ||
                    error.message.message;
                type = 'error';

                setTimeout(() => {
                    setAlert({ state: false });
                }, 2000);
            }
            return () => {
                props.cleanUp_();
            };
        }
        if (success.status !== null && success.message) {
            setAlert({ state: true });
            text = success.message.message || success.message;
            type = 'success';
            setTimeout(() => {
                setAlert({ state: false });
            }, 2000);
            return () => {
                props.cleanUp_();
            };
        }
    }, [success, error]);
    useEffect(() => {
        if(voters !== undefined){
        if (voters.allVoters && voters.allVoters.rows) {
            setState((prevState) => {
                const data = [...(voters.allVoters && voters.allVoters.rows)];
                return { ...prevState, data };
            });
        }
    }
    }, [ voters ? voters.allVoters && voters.allVoters.rows : '']);

    const updateVoter = (data) => props.updateVoter(data.id, data);
    const deleteVoter = (data) => props.deleteVoter(data.id);

    return (
        <Card className={classes.card}>
            <AppBar
                position="static"
                color="default"
                className={classes.appBar}
            >
                <Toolbar>
                    {alert.state ? (
                        <Alerts
                            text={text}
                            type={type}
                            open={true}
                            position="right"
                        />
                    ) : (
                        ''
                    )}
                    <Typography color="inherit" className="flexSpacer">
                        <small>
                            <em>you are here:</em>
                        </small>{' '}
                        Dashboard / Voters / <strong>All Voters</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <MaterialTable
                    options={{
                        exportButton: true,
                    }}
                    title="All Voters"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        updateVoter(newData);
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
                                deleteVoter(oldData);
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

Voters.propTypes = {
    classes: PropTypes.object.isRequired,
};
export const cleanUp_ = () => cleanUp();

const mapStateToProps = (state) => ({
    voters: state.voters.voters,
    error: state.errors,
    success: state.success,
});

export default withStyles(styles)(
    connect(mapStateToProps, {
        getVoters,
        updateVoter,
        deleteVoter,
        addVoter,
        cleanUp_,
    })(Voters)
);
