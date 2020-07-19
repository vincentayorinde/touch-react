import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    content: {
        paddingBottom: theme.spacing(1) * 2,
    },
    avatar: {
        width: '100%',
        height: '100%',
        maxWidth: 105,
        marginBottom: theme.spacing(1) * 2,
    },
}));

const ProfileCard = ({ name, image, location, progress }) => {
    const classes = useStyles();
    return (
        <Card className="text-xs-center">
            <CardContent className={classNames(classes.content, 'px-0')}>
                <Grid
                    container
                    spacing={0}
                    alignItems={'center'}
                    direction={'row'}
                    justify={'space-around'}
                >
                    {/* <Grid item>
            <IconButton aria-label="Send message">
              <EmailIcon />
            </IconButton>
          </Grid> */}
                    <Grid item>
                        <Avatar
                            alt={name}
                            src={image}
                            className={classes.avatar}
                        />
                    </Grid>
                    {/* <Grid item>
            <IconButton aria-label="Call">
              <PhoneIcon />
            </IconButton>
          </Grid> */}
                </Grid>
                <Typography variant="h6" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="caption">{location}</Typography>
                <LinearProgress variant="determinate" value={progress} />
            </CardContent>
            <Divider />
            <CardContent className={classes.content}>
                <Grid
                    container
                    spacing={0}
                    alignItems={'center'}
                    direction={'row'}
                    justify={'space-between'}
                ></Grid>
            </CardContent>
        </Card>
    );
};

ProfileCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
};

export default ProfileCard;
