import React ,{Component} from 'react';
import factory from '../ethereum/factory';

class CertificateIndex extends Component {
	async componentDidMount() {

		const total=await factory.methods.totalCertificate().call();
console.log(total);

	}

render() {
return (
<div>
<div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878">
<div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878">
        
    <br/><br/>
       <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
       <br/><br/>
       <span style="font-size:25px"><i>This is to certify that</i></span>
       <br/><br/>
       <span style="font-size:30px"><b>Sourav Suman</b></span><br/><br/>
       <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/>
       <span style="font-size:30px">Machine Learning </span> <br/><br/>
       <span style="font-size:20px">with score of <b>98</b></span> <br/><br/><br/><br/>
       <span style="font-size:25px"><i>dated</i></span><br/>
      12/6/2020
      <span style="font-size:30px">$dt</span>
</div>
</div>
</div>
);

}
}
export default CertificateIndex ;