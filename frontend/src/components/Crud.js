import React, { Component } from 'react'
import axios from 'axios'

export default class Crud extends Component {

    state = {
        employe: [],
        name: '',
        position: '',
        office: '',
        salary: 0,
        _id: ''
    }

    //data binding
    hadelInput = (e) => {
        //const { name, value } = e.target;
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        this.getEmpleados();
    }

    getEmpleados = async () => {
        const res = await axios.get('http://localhost:4000/api/employees'); 
        console.log(res.data);
        this.setState({
            employe: res.data
        });
    }

    agregarEmpleados = async (e) => {
        e.preventDefault();

        // si histe click en el id ,actualizalo sino ,agrega
        if(this.state._id){

            const update ={
                name : this.state.name,
                position : this.state.position,
                office : this.state.office,
                salary: this.state.salary
            };

           const res= await axios.put('http://localhost:4000/api/employees/'+ this.state._id ,update);
            console.log(res.data);
            
            this.setState({name:'' ,position :'' , office :'' ,salary :0});

            this.getEmpleados();
        }else{

            const agregar = {
                name: this.state.name,
                position: this.state.position,
                office: this.state.office,
                salary: this.state.salary
            };
    
            const res = await axios.post('http://localhost:4000/api/employees', agregar);
            console.log(res.data);
    
            this.setState({name:'' ,position :'' , office :'' ,salary :0});
    
            this.getEmpleados();
        }

        
    }


    deleteEmpleados = async(id) =>{
        const res = await axios.delete('http://localhost:4000/api/employees/' + id);
        console.log(res.data);
        
        this.getEmpleados();
    }


    edit = async(id) =>{
       const res = await axios.get('http://localhost:4000/api/employees/' + id);
       console.log(res.data);

       // mostrame los datos de la api y ponelos en el estado
       this.setState({
           name:  res.data.name,
           position : res.data.position,
           office : res.data.office,
           salary : res.data.salary,
           _id : res.data._id

       })
    }


    render() {
        return (
            <div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.agregarEmpleados}>
                                        <input
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.hadelInput}
                                            type="text"
                                            placeholder="name"
                                            className="form-control"
                                        /> <br />

                                        <input
                                            name="position"
                                            value={this.state.position}
                                            onChange={this.hadelInput}
                                            type="text"
                                            placeholder="position"
                                            className="form-control"
                                        /> <br />

                                        <input
                                            name="office"
                                            value={this.state.office}
                                            onChange={this.hadelInput}
                                            type="text"
                                            placeholder="office"
                                            className="form-control"
                                        /> <br />
                                        <input
                                            name="salary"
                                            value={this.state.salary}
                                            onChange={this.hadelInput}
                                            type="number"
                                            placeholder="salary"
                                            className="form-control"
                                        /> <br />
                                        <button className="btn btn-primary btn-block">Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            
                                <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>position</th>
                                                    <th>Office</th>
                                                    <th>Salary</th>
                                                </tr>
                                            </thead>
                            {
                                this.state.employe.map((e, i) => {
                                    return (
                                            <tbody key={i}>
                                                <tr>
                                                    <td>{e.name}</td>
                                                    <td>{e.position}</td>
                                                    <td>{e.office}</td>
                                                    <td>{e.salary}</td>
                                                    <td><button 
                                                               className="btn btn-danger"
                                                                onClick={()=>this.deleteEmpleados(e._id)}
                                                                >Eliminar         
                                                         </button>
                                                     </td>
                                                    <td><button className="btn btn-secondary"
                                                                onClick={()=>this.edit(e._id)}    
                                                              >Editar</button></td>
                                                </tr>
                                            </tbody>
                                      
                                    ) 
                                
                                })      
                            } 
                             </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
