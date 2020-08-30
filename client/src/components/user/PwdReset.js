import React from 'react';
import { connect } from 'react-redux';
import {setPassword} from '../../actions/index';

//Nuevo Componente, Es el formulario de una nueva contraseña 
//cuando un admin lepida a un usuario que cambie la misma

export  class PwdReset extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
              pwd: ""
          }
      }
    resetPassword(e){
        e.preventDefault()
        this.props.setPassword(this.props.user.id,this.state.pwd);
    }

    handleInputChange (e) {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    render () {
        return (
            <div>
                <form>
                   <div>
                   <label>Contraseña Nueva: </label>
                   <input name="pwd" type="text" value={this.state.pwd} onChange={(e) => this.handleInputChange(e) }></input>
                   <button onClick={(e)=>this.resetPassword(e)}>Guardar</button>
                   </div> 
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setPassword: (id,pwd) => dispatch(setPassword(id,pwd))
    }
  }
  
  const mapStateToProps = state => {
    return {
        user:state.user
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(PwdReset);