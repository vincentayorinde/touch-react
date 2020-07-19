import { StatCard, Wrapper } from '../../components';
import React, { useState, useEffect } from 'react';

import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { getResults, cleanUp } from '../../actions/results';
import { getStats } from '../../actions/statistics';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const imgStyle = {
    width: 60,
    height: 60,
};
let candidate = {};
let name = [];
let new_ = [];
let statistics;

const Home = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => setAnchorEl(null);
    const { results, stats } = props;
    useEffect(() => {
        props.getResults();
        props.getStats();
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
    if (stats && stats.isLoading === false && stats.loaded === true && stats.stats !== undefined)
        statistics = stats.stats.stats;
    
  
    return (
        <Wrapper>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Members"
                        value={statistics ? statistics.voters : 0}
                        icon={<PeopleAltIcon />}
                        color="#3f51b5"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Positions"
                        value={statistics ? statistics.candidates : 0}
                        icon={<PersonIcon />}
                        color="#9c27b0"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Electoral Areas"
                        value={statistics ? statistics.parties : 0}
                        icon={<HomeWorkIcon />}
                        color="#f44336"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        type="fill"
                        title="Modules"
                        value={statistics ? statistics.votes : 0}
                        icon={<CheckBoxIcon />}
                        color="#eaa219"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper className="table-responsive">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Members</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Module</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {new_
                                    ? new_.map((n) => (
                                          <TableRow key={n[3]}>
                                              <TableCell>
                                                  <Avatar
                                                      alt={`${n[0]} ${n[1]}`}
                                                      src={n[2]}
                                                      className={imgStyle}
                                                  />
                                              </TableCell>

                                              <TableCell
                                                  component="th"
                                                  scope="row"
                                              >
                                                  {`${n[0]} ${n[1]}`}
                                              </TableCell>
                                              <TableCell>{n[5]}</TableCell>
                                              <TableCell>
                                                  {
                                                      <LinearProgress
                                                          variant="determinate"
                                                          value={n[4]}
                                                      />
                                                  }
                                                  {`${n[4]} %`}
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : ''}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

const mapStateToProps = (state) => ({
    error: state.errors,
    success: state.success,
    results: state.results,
    stats: state.statistics,
});
export const cleanUp_ = () => cleanUp();

export default connect(mapStateToProps, { getResults, cleanUp_, getStats })(
    Home
);
