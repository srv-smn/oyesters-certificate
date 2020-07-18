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
   errorMessage: '',
   show:false
 };

  onSubmit = async event => {
    event.preventDefault();
    const {uid} = this.state;
    this.setState({loading:true ,errorMessage: ''});
    try {
      const accounts = await web3.eth.getAccounts();
			const summary = await factory.methods.getData(uid).call();
			this.setState({name: summary[1]});
			this.setState({course: summary[2]});
      this.setState({show:true});

    } catch(err) {
      this.setState({errorMessage:err.message});
    }
      this.setState({loading:false});
  }

  render(){

    let person = null;
    if(this.state.show)
    {
      person = (
        <div>
        <style jsx>{
          `
          .a11{
            width:800px;
            height:600px;
            padding:20px;
             text-align:center;
             border: 10px solid #787878;
          }
          .a12{
            width:750px;
             height:550px;
              padding:20px;
              text-align:center;
              border: 5px solid #787878;
          }

          .a13{
            font-size:50px;
            font-weight:bold;
          }
          .a25{
            font-size:25px;
          }
          .a30{
            font-size:30px;
          }

          `
        }</style>
        <div className= "a11">
        <div className= "a12">
               <p><span className="a13">Certificate of Completion</span></p>

               <span className="a30"><i>This is to certify that </i></span>
               <span className= "a30" ><b>{this.state.name} </b></span>
               <span className= "a25" ><i>has completed the course </i></span>
               <span className= "a30" >{this.state.course} </span>
               <span className= "a25" >having Id. {this.state.uid} </span>
        </div>
        </div>
        </div>
      );
    }
    return(
      <div>
      <h3>Show Certificate</h3>
        <Form onSubmit = {this.onSubmit}>
          <Form.Field>
            <label>Certificate Id</label>
            <Input
              value = {this.state.uid}
              onChange= {event => this.setState({uid: event.target.value})}
            />
          </Form.Field>

          <Button primary loading ={this.state.loading}> Show!</ Button>
        </Form>
        {person}
        </div>
    );
  }
}

export default RequestNew ;
