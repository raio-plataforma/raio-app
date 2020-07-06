import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Title from '../Title'
import Text from '../Text'

const useStyles = makeStyles(theme => {
  return ({
    root: {
      minWidth: 275,
      minHeight: 232,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: theme.palette.primary.light,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
      color: theme.palette.primary.contrastText
    },
  })
});
const StyledText = styled.div`
display: block;
  display: -webkit-box;
  max-width: 100%;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

function CardVacancy({ id, jobTitle, enterpriseName, jobDescription, location, period }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Card className={classes.root} variant="outlined">
        <CardContent >
          <Text className={classes.title} color="textSecondary" gutterBottom>
            {enterpriseName}
          </Text>
          <Title color="secondary" size="sm">
            {jobTitle}
          </Title>
          <Text className={classes.pos} color="textSecondary">
            {location}
          </Text>
          <Text className={classes.pos} color="textSecondary">
            {period}
          </Text>
          <StyledText>
            <Text color="textPrimary">
              {jobDescription}
            </Text>
          </StyledText>
        </CardContent>
        <CardActions>
          <Link to={`/vaga/${id}`}>
            <Button size="small">Detalhe da Vaga</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardVacancy
