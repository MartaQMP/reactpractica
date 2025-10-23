import axios from "axios";
import React, { Component } from "react";
import Global from "../Global";
import Jugadores from "./Jugadores";

export default class Buscador extends Component {
    cajaEquipo = React.createRef();
    cajaNombre = React.createRef();

    state = {
        equipos: [],
        request: ""
    };

    cargarEquipos = () => {
        let request = "api/equipos";
        axios.get(Global.url + request).then(response => {
            this.setState({
                equipos: response.data,
            });
        });
    };

    componentDidMount = () => {
        this.cargarEquipos();
    };

    getJugadoresNombre = event => {
        event.preventDefault();
        let requestJug = "api/jugadores/buscarjugadores/" + this.cajaNombre.current.value;
        this.setState({
            request:requestJug
        })
    };

    getJugadoresEquipo = event => {
        event.preventDefault();
        let requestEqu = "api/jugadores/jugadoresequipos/" + this.cajaEquipo.current.value;
         this.setState({
            request:requestEqu
        })
    };

    render() {
        return (
            <div>
                <h1>Buscador jugadores</h1>
                <form>
                    <label className="form-label">Nombre del jugador:</label>
                    <input className="form-control" ref={this.cajaNombre} />
                    <button className="btn btn-info" onClick={this.getJugadoresNombre}>
                        Buscar jugadores nombre
                    </button>
                    <br />
                    <label className="form-label">Nombre del equipo:</label>
                    <select className="form-control" ref={this.cajaEquipo}>
                        {this.state.equipos &&
                            this.state.equipos.map((equipo, index) => {
                                return <option value={equipo.idEquipo} key={index}>{equipo.nombre}</option>;
                            })}
                    </select>
                    <button className="btn btn-warning" onClick={this.getJugadoresEquipo}>
                        Buscar jugadores equipo
                    </button>
                </form>
                {this.state.request.length !== 0 && <Jugadores request={this.state.request} />}
            </div>
        );
    }
}
