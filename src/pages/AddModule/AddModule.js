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
import { addModule, cleanUp } from '../../actions/module';
import { connect } from 'react-redux';
import { Alerts } from '../../components';
import CircularProgress from '@material-ui/core/CircularProgress';

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
const Module = (props) => {
    const [values, setValues] = useState({
        name: '',
    });
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
                text = error.message.error || error.message || error.message.message;
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
                history && history.push('/modules/list-modules');
                setAlert({ state: false });
            }, 2000);
            return () => {
                props.cleanUp_();
            };
        }
       
    }, [success, error]);

    const submit = (e) => {
        e.preventDefault();
      
        props.addModule(values);
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
                        <Alerts text={text} type={type} open={true} position="right" />
                    ) : (
                        ''
                    )}
                    <Typography color="inherit" className="flexSpacer">
                        Add Module
                    </Typography>
                </Toolbar>
                <Alerts />
            </AppBar>
            <CardContent className={classes.content}>
                <form onSubmit={submit}>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Enter Module Name
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            placeholder="Name"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AppsIcon />
                                </InputAdornment>
                            }
                            name="name"
                            onChange={onChange}
                        />
                    </FormControl>
                    <div className={classes.margin_}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Add Module
                            {
                                       props.modules.isLoading ? 
                                       <CircularProgress
                                        className={classes.progress}
                                        size={20}
                                        style={{ color: 'white' }}
                                    />: ''
                                   } 
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

addModule.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    modules: state.modules
});
export const cleanUp_ = () => cleanUp();

export default withStyles(styles)(
    connect(mapStateToProps, { addModule, cleanUp_ })(Module)
);
