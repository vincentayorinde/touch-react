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
import { getParties } from '../../actions/parties';
import { addCandidate, cleanUp } from '../../actions/candidates';
import { connect } from 'react-redux';
import { Alerts } from '../../components';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
const Candidate = (props) => {
    const [values, setValues] = useState({});
    const [alert, setAlert] = useState({ state: false });
    const onChange = (e) => {
        e.persist();
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        if (e.target.name === 'display_picture') {
            const [pictureFile] = e.target.files;
            setValues((prevState) => ({ ...prevState, display_picture: pictureFile }));
        }
    };
    const { classes, error, success, history } = props;
    
    let parties = {};
    useEffect(() => {
        if (props.getParties()) props.getParties();
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
                history && history.push('/canditates/list-candidates');
                setAlert({ state: false });
            }, 2000);
            return () => {
                props.cleanUp_();
            };
        }
    }, [success, error]);

    const submit = (e) => {
        e.preventDefault();
        props.addCandidate(values);
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
                        Add Candidate
                    </Typography>
                </Toolbar>
                <Alerts />
            </AppBar>
            <CardContent className={classes.content}>
                <form onSubmit={submit}>
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
                            Manifesto
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Enter Manifesto"
                            name="manifesto"
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
                        <InputLabel htmlFor="party">Party</InputLabel>
                        <Select
                            id="party"
                            onChange={onChange}
                            placeholder="Select Party"
                            name="political_partyId"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AppsIcon />
                                </InputAdornment>
                            }
                        >
                            {props.parties && props.parties.allParties &&
                            props.parties.allParties.rows ? (
                                props.parties.allParties.rows.map((party) => {
                                    return (
                                        <MenuItem
                                            key={party.id}
                                            value={party.id}
                                        >
                                            {party.name}
                                        </MenuItem>
                                    );
                                })
                            ) : (
                                <MenuItem>No Parties</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    
                    <FormControl className={classes.margin}>
                        {/* <InputLabel>Display Picture</InputLabel> */}
                        <label htmlFor="upload-logo">
                            <Button component="span" className={classes.button}>
                                Select Display Image
                            </Button>
                        </label>
                        <Input
                            id="upload-logo"
                            placeholder="Logo"
                            accept="image/*"
                            type="file"
                            name="display_picture"
                            onChange={onChange}
                            data-max-size="2000"
                            style={{ display: 'none' }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <CropOriginalIcon />
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
                            Add Candidate
                            {props.candidate.isLoading ? (
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

addCandidate.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    candidate: state.candidates,
    parties: state.parties.parties,
});
export const cleanUp_ = () => cleanUp();

export default withStyles(styles)(
    connect(mapStateToProps, { addCandidate, getParties, cleanUp_ })(Candidate)
);
