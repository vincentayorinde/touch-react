import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { checkVoter, cleanUp } from '../../actions/vote';
import { Alerts } from '../../components';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    card: {
        overflow: 'visible',
    },
    session: {
        position: 'relative',
        zIndex: 4000,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    background: {
        backgroundColor: theme.palette.primary.main,
    },
    content: {
        padding: `40px ${theme.spacing(1)}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 0 auto',
        flexDirection: 'column',
        minHeight: '100%',
        textAlign: 'center',
    },
    wrapper: {
        flex: 'none',
        maxWidth: '400px',
        width: '100%',
        margin: '0 auto',
    },
    fullWidth: {
        width: '100%',
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
    },
    progress: {
        marginLeft: theme.spacing(1),
    },
}));
let type;
let text;
const Voter = (props) => {
    const [values, setValues] = useState({ votersId: '' });
    const [alert, setAlert] = useState({ state: false });
    const onChange = (e) => {
        e.persist();
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const { error, success, history } = props;
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
                }, 6000);
            } else {
                setAlert({ state: true });
                text =
                    error.message.error ||
                    error.message ||
                    error.message.message;
                type = 'error';

                setTimeout(() => {
                    setAlert({ state: false });
                }, 6000);
            }
            return () => {
                props.cleanUp_();
            };
        }
        if (success.status !== null && success.message) {
            setAlert({ state: true });
            text = success.message.message;
            type = 'success';

            setTimeout(() => {
                history && history.push('/vote');
                setAlert({ state: false });
            }, 2000);
            // return () => {
            //     props.cleanUp_();
            // };
        }
    }, [success, error]);
    const submit = (e) => {
        e.preventDefault();
        props.checkVoter(values);
    };
    const classes = useStyles();
    if (props.vote.voter) {
        return <Redirect to="/vote" />;
    }
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    {alert.state ? (
                        <Alerts
                            text={text}
                            type={type}
                            open={true}
                            position="center"
                        />
                    ) : (
                        ''
                    )}
                    <Card>
                        <CardContent>
                            <form onSubmit={submit}>
                                <div
                                    className={classNames(
                                        classes.logo,
                                        `text-xs-center pb-xs`
                                    )}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`}
                                        alt=""
                                        className="block"
                                    />
                                    <Typography variant="caption">
                                        <br></br>
                                        Sign in with your Voter Id.
                                    </Typography>
                                </div>
                                <TextField
                                    id="username"
                                    label="Voter ID"
                                    name="votersId"
                                    required
                                    className={classes.textField}
                                    fullWidth
                                    onChange={onChange}
                                    margin="normal"
                                />
                                <br></br>
                                <br></br>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Login to Vote
                                    {/* {props.voter.isLoading ? (
                                        <CircularProgress
                                            className={classes.progress}
                                            size={20}
                                            style={{ color: 'white' }}
                                        />
                                    ) : (
                                        ''
                                    )} */}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    vote: state.vote,
    error: state.errors,
    success: state.success,
});

export const cleanUp_ = () => cleanUp();

export default connect(mapStateToProps, { checkVoter, cleanUp_ })(Voter);
