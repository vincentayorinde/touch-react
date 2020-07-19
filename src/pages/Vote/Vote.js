import { Candidate, Wrapper } from '../../components';
import { Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { getCandidates, cleanUp } from '../../actions/candidates';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    pricingTable: {
        marginTop: '4px',
    },
    centered: {
        margin: '0 auto',
    },
    label: {
        color: '#ffffff',
    },
    font: {
        fontFamily: theme.typography.fontFamily
    }
}));
let candidatesShow = []
let voter;
const Vote = (props) => {
    const { error, success, candidates, vote } =props;
    const classes = useStyles();

    useEffect(() => {
        props.getCandidates();
        return () => {
            props.cleanUp_();
        };
    }, []);
    candidatesShow = candidates.allCandidates && candidates.allCandidates.rows
    voter = vote.voter && vote.voter.foundVoter;
    if(voter == null) return <Redirect to="/check-voter" />;

    if(vote.vote && vote.vote.vote) {
        return(
            <AppBar position="static">
                <Toolbar className={classes.centered}>
                    <h1 className={classes.font}>Thank you for Voting.</h1>
                </Toolbar>
                <Toolbar></Toolbar>
            </AppBar>
        )
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.centered}>
                    <h1 className={classes.font}>Kindly Cast Your Vote</h1>
                </Toolbar>
                <Toolbar></Toolbar>
            </AppBar>

            <Wrapper padding={false}>
                <Grid
                    container
                    spacing={0}
                    justify="center"
                    className={classes.pricingTable}
                >
                    <Grid item xs={10}>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="center"
                        >
                            { candidatesShow ? candidatesShow.map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Candidate
                                         name={item.first_name +' '+ item.last_name}
                                        image={item.display_picture}
                                        votersId={voter.voter_id}
                                        candidatesId={item.id}
                                    />
                                </Grid>
                            )) : ''}
                        </Grid>
                    </Grid>
                </Grid>
            </Wrapper>
        </>
    );
};

const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    candidates: state.candidates.candidates,
    vote: state.vote
});
export const cleanUp_ = () => cleanUp();

export default connect(mapStateToProps, { getCandidates, cleanUp_ })(Vote);
