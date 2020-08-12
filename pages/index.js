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
            /* border: 8px solid #a87207;*/

             background-image: url("/my-image1.png");
              background-color: #cccccc;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;

          }
          .a12{
            width:750px;
             height:550px;
              padding:20px;
              text-align:center;
            /*  border: 5px solid #a87207; */
          }

          .a13{
            font-size:40px;
            font-weight:bold;
            color: #a81c07;
          }
          .a25{
            font-size:25px;
          }
          .a30{
            font-size:25px;
          }
          .a31{
            font-size:30px;
            font-weight:bold;
            color: #8b15c2;
            text-decoration: underline;
          }
          img {
            padding: 5px;
            width: 500px;
            height: 200;
          }

          `
        } </style>
        <div className= "a11">
        <div className= "a12">
              <img src="/my-image.png" alt="my image" />
               <p><span className="a13">Certificate of Course Completion</span></p>
               <p><span className="a30"><i>This is to certify that </i></span></p>
               <span className= "a31" ><b>{this.state.name} </b></span>
              <p> <span className= "a25" ><i>has successfully completed the 7-days hands on webinar on </i></span></p>
               <p><span className= "a31" >{this.state.course} </span></p>
               <span className= "a25" >having Id. {this.state.uid} </span>
        </div>
        </div>
        </div>
      );
    }
    return(
      
      <div className ="m2">
<h1>demo check</h1>
      <h3>Show Certificate</h3>
        <Form onSubmit = {this.onSubmit}>
          <Form.Field>
            <label>Certificate Id</label>
            <Input
              value = {this.state.uid}
              onChange= {event => this.setState({uid: event.target.value})}
              placeholder="enter UID"
            />
          </Form.Field>

          <Button primary loading ={this.state.loading}> Search!</ Button>
        </Form>
        {person}
        </div>
    );
  }
}

export default RequestNew ;
