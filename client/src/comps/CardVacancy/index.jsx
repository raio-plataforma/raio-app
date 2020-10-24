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
import { useStoreActions, useStoreState } from "easy-peasy";
import { formatMoney } from '../../utils/formatter'
import config from '../../config'

const useStyles = makeStyles(theme => {
  return ({
    root: {
      minWidth: 275,
      // minHeight: 232,
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
  backgroun-color: #E79A3F;
  color: #BA3B29!important;
`

function CardVacancy({ slug, id, jobTitle, foto, enterpriseName, sumirNomeEmpresa, jobDescription, location, period, money, func }) {
  const classes = useStyles();
  const applyJob = useStoreActions(actions => actions.professional.applyJob)

  const user = useStoreState(state => state.auth.auth.user)

  const onApply = (id) => {
    console.log(id)
    console.log(user)

    applyJob({ id, user_id: user.id })
  };

  return (
    <Grid item xs={12}>
      <Link to={'/vaga/' + slug}>
        <Card className={classes.root + " card-vaga"} variant="outlined">
          <CardContent >
            <Grid container spacing={2}>
              <Grid item xs={3} md={1}>
                {
                  sumirNomeEmpresa == false ? (
                    <img src={foto} width="100%" className="foto-perfil" />
                  ) : (
                    <img src={config.pastaLogotipo+"SemLogo.png"} width="100%" className="foto-perfil" />
                  )
                }
              </Grid>
              <Grid item xs={9} md={11}>
                {
                  sumirNomeEmpresa == false ? (
                    <Text className={classes.title} color="textSecondary" gutterBottom>
                      {enterpriseName}
                    </Text>
                  ) : (<></>)
                }
                <Title color="secondary" size="sm">
                  {jobTitle} - {func}
                </Title>
                <Text className={classes.pos} color="textSecondary">
                  {location}
                </Text>
                {/* <Text className={classes.pos} color="textSecondary">
            {period}
          </Text> */}
                {/* <StyledText>
            <Text color="textPrimary">
              {jobDescription}
            </Text>
          </StyledText> */}
                {/* <Title color="secondary" size="sm">
              Cachê: R$ {formatMoney(money, 2, ",", ".")}
            </Title> */}
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions>
          <Button variant="contained" color="secondary" size="small" onClick={()=>{onApply(id)}}>Candidate-se</Button>
        </CardActions> */}
        </Card>
      </Link>
    </Grid>
  );
}

export default CardVacancy
