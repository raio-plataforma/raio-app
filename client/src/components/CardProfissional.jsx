import React from "react";
import { Button, Container, Grid, Paper, Snackbar, TextField, Typography } from "@material-ui/core"
import Star from '@material-ui/icons/Star'
import PcD from '@material-ui/icons/Accessible'
import BusinessIcon from '@material-ui/icons/Business';

const CardProfissional = (props) => {
  return (
    <Paper className="dashboard-paper">
      <a title="Clique para abrir o perfil" href={"/perfil/profissional/" + props.id} target="_blank">
        <Grid container spacing={2}>
          <Grid item xs={3} md={2}>
            {
              props.posicaoTop &&
              <>
                <span className="posicaoTopPaper">Top {props.posicaoTop}</span>
                <br /><br />
              </>
            }
            <img src={props.img} width="90%" className="foto-perfil" />
          </Grid>
          <Grid item xs={9} md={10}>
            {
              props.posicaoTop &&
              <>
                <br /><br />
              </>
            }
            <h1>{props.nome} ({props.idade} anos) </h1>
            <Typography variant="body1" >{props.educacao} - {props.univercidade}</Typography>
            <Typography variant="body1" >{props.cidade} - {props.estado}</Typography>
            {props.apan_associate && (
              <Typography variant="body1" className="display-inline">
                <Star style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "0px" }} />
              Associado APAN
              </Typography>)
            }
            {props.pcd && (
              <Typography variant="body1" className="display-inline">
                <PcD style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />
              PcD
              </Typography>)
            }
            {props.cnpj && (
              <Typography variant="body1" className="display-inline">
                <BusinessIcon style={{ verticalAlign: "middle", marginRight: "5px", marginLeft: "5px" }} />
              Possui CNPJ - {props.cnpj_type}
              </Typography>)
            }
          </Grid>
        </Grid>
      </a>
    </Paper>
  );
};

export default CardProfissional;
