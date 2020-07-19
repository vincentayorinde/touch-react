import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { castVote, cleanUp } from '../../actions/vote';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    inputs:{
        display: 'none'
    },
    card: {
        textAlign: 'center',
        cursor: 'default',
        marginBottom: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    spacing: {
        marginTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    title: {
        fontSize: '1rem',
        overflow: 'hidden',
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap',
        letterSpacing: '.01rem',
        textOverflow: 'ellipsis',
    },
    subheader: {
        textTransform: 'capitalize',
        fontSize: '12px',
    },
    price: {
        fontSize: '2.5rem',
        fontWeight: 900,
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    symbol: {
        fontSize: '1rem',
        verticalAlign: 'super',
    },
    period: {
        fontSize: '0.8125rem',
        display: 'inline-block',
        padding: 0,
        opacity: '.7',
    },
    feature: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    description: {
        fontSize: '14px',
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        lineHeight: 1,
    },
    inactive: {
        color: theme.palette.text.secondary,
    },
    centered: {
        margin: '0 auto',
    },
    avatar: {
        width: '100%',
        height: '100%',
        maxWidth: 105,
        marginBottom: theme.spacing(1) * 2,
    },
}));

const Candidate = ({
    name,
    image,
    success,
    error,
    vote,
    votersId,
    candidatesId,
    castVote
}) => {
    const values = {
        votersId,
        candidatesId,
    };
    const submit = (e) => {
        e.preventDefault();
      
        castVote(values);
    };
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Grid
                container
                spacing={0}
                alignItems={'center'}
                direction={'row'}
                justify={'space-around'}
                className={classes.spacing}
            >
                <Grid item>
                    <Avatar alt={name} src={image} className={classes.avatar} />
                </Grid>
            </Grid>
            <form onSubmit={submit}>
                <Typography variant="h6" gutterBottom>
                    {name}
                </Typography>
                <Input
                    id="candidateId"
                    name="candidateId"
                    className={classes.inputs}
                    value={candidatesId}
                />
                <Input id="votersId" name="votersId" className={classes.inputs} value={votersId} />
                <CardActions className={classes.actions} disableSpacing>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.centered}
                    >
                        Vote
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

Candidate.prototypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    price: PropTypes.number,
};

const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    vote: state.vote,
});
export const cleanUp_ = () => cleanUp();

export default connect(mapStateToProps, { castVote, cleanUp_ })(Candidate);
