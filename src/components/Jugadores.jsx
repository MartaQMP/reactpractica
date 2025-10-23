import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";

export default class Jugadores extends Component {
    state = {
        jugadores: []
    }

    buscarJugadores = () => {
        axios.get(Global.url + this.props.request).then(response => {
            this.setState({
                jugadores: response.data,
            });
        });
    }

    componentDidMount =()=>{
        this.buscarJugadores()
    }

    componentDidUpdate =(oldProps)=>{
        if(oldProps.request!== this.props.request){
            this.buscarJugadores()
        }
    }

    render() {
        return (
            <div>
                <table className="table table-info">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Posición</th>
                            <th>Pais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.jugadores &&
                            this.state.jugadores.map((jugador, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={jugador.imagen} alt="Imagen jugador" style={{width:"100px"}}/></td>
                                        <td>{jugador.nombre}</td>
                                        <td>{jugador.posicion}</td>
                                        <td>{jugador.pais}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}
