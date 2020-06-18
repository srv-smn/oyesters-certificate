import React , {Component} from 'react';
import {Button , Form , Message , Input} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';


class RequestNew extends Component {
  state = {
   uid:'',
   name:'',
   course:'',
   loading : false,
   errorMessage: ''
 };

  onSubmit = async event => {
    event.preventDefault();
    const {uid, name , course} = this.state;
    this.setState({loading:true ,errorMessage: ''});
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createData(
        uid,
        name,
        course
      ).send({from: accounts[0]}).on('transactionHash', function(hash){
        console.log(hash); });

    } catch(err) {
      this.setState({errorMessage:err.message});
    }
      this.setState({loading:false});
  }

  render(){
    return(
      <div>
      <h3>Create a Certificate</h3>
        <Form onSubmit = {this.onSubmit}>
          <Form.Field>
            <label>Certificate Id</label>
            <Input
              value = {this.state.uid}
              onChange= {event => this.setState({uid: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Student Name</label>
            <Input
              value = {this.state.name}
              onChange= {event => this.setState({name: event.target.value})}
             />
          </Form.Field>

          <Form.Field>
            <label>Course</label>
            <Input
              value = {this.state.course}
              onChange= {event => this.setState({course: event.target.value})}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading ={this.state.loading}> Create!</ Button>
        </Form>
        </div>
    );
  }
}

export default RequestNew ;
