import React, { Component } from "react"
import Carregando from "../../components/loading/carregando";

export default class PaginaCarregando extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      erro: null,
      isLoaded: false
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let redirect = (this.props.location.search.split("redirect="))[1];
    setTimeout(() => {
      window.location.href = redirect;
    }, 1500);
  }

  render() {
    return (
      <Carregando />
    )
  }

}