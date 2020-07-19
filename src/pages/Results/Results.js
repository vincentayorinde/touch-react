import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getResults, cleanUp } from '../../actions/results';
import Grid from '@material-ui/core/Grid';
import { ProfileCard } from '../../components';

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
let candidate = {};
let name = [];
let new_ = [];
const Results = (props) => {
    const { classes, results, success } = props;
    useEffect(() => {
        props.getResults();
        return () => {
            props.cleanUp_();
        };
    }, []);
    candidate = {};
    if (results && results.isLoading === false && results.loaded === true && results.results !== undefined) {
        candidate = results && results.results.votes;
        if (candidate) {
            name = [];
            Object.keys(candidate).map((key) => {
                name.push(key + ',' + candidate[key]);
            });
        }
        new_ = [];
        for (let i = 0; i < name.length; i++) {
            new_.push(name[i].split(/[\s,]+/));
        }
    }
    return (
        <Card className={classes.card}>
            <AppBar
                position="static"
                color="default"
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography color="inherit" className="flexSpacer">
                        Results - Total Number of Votes (
                        {results && results.results !== undefined && results.results.count})
                    </Typography>
                </Toolbar>
            </AppBar>
            <CardContent className={classes.content}>
                <Grid container spacing={1}>
                    {new_
                        ? new_.map((candidateScore) => (
                              <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  key={candidateScore[3]}
                              >
                                  <ProfileCard
                                      name={`${candidateScore[0]} ${candidateScore[1]}`}
                                      image={`${candidateScore[2]}`}
                                      location={`${candidateScore[4]}% with ${candidateScore[5]} votes`}
                                      progress={candidateScore[4]}
                                  />
                              </Grid>
                          ))
                        : ''}
                </Grid>
            </CardContent>
        </Card>
    );
};

Results.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    results: state.results,
});
export const cleanUp_ = () => cleanUp();

export default withStyles(styles)(
    connect(mapStateToProps, { getResults, cleanUp_ })(Results)
);
