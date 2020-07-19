import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import DescriptionIcon from '@material-ui/icons/Description';
import AppsIcon from '@material-ui/icons/Apps';
import EventIcon from '@material-ui/icons/Event';
import { addVoter, cleanUp } from '../../actions/voters';
import { connect } from 'react-redux';
import { Alerts } from '../../components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
});
let type;
let text;
const Voter = (props) => {
    const [values, setValues] = useState({});
    const [alert, setAlert] = useState({ state: false });

    const onChange = (e) => {
        e.persist();
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const { classes, error, success, history } = props;

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
                history && history.push('/voters/list-voters');
                setAlert({ state: false });
            }, 2000);
            return () => {
                props.cleanUp_();
            };
        }
    }, [success, error]);

    const submit = (e) => {
        e.preventDefault();
        props.addVoter(values);
    };

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
                        Add Voter
                    </Typography>
                </Toolbar>
                <Alerts />
            </AppBar>
            <CardContent className={classes.content}>
                <form onSubmit={submit}>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Voter ID
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Enter Voter's ID"
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            name="voter_id"
                            onChange={onChange}
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            First Name
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Enter Firstname"
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            name="first_name"
                            onChange={onChange}
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Last Name
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Enter Lastname"
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            name="last_name"
                            onChange={onChange}
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Occupation
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Enter Occupation"
                            name="occupation"
                            onChange={onChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <DescriptionIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                            id="gender"
                            onChange={onChange}
                            placeholder="Select Gender"
                            name="gender"
                            startAdornment={
                                <InputAdornment position="start">
                                    <EventIcon />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            name="dob"
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <EventIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div className={classes.margin_}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Add Voter
                            {props.voter.isLoading ? (
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
    );
};

addVoter.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    voter: state.voters,
});
export const cleanUp_ = () => cleanUp();

export default withStyles(styles)(
    connect(mapStateToProps, { addVoter, cleanUp_ })(Voter)
);
