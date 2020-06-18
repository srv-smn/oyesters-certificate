pragma solidity ^0.4.17;


contract Certificate {
    struct Data {
        string id ;
        string sname ;
        string course ;
        // data to be stored in certificate 
    }
    
    uint total;
    address public manager;
    mapping(string => Data) certData ;  // mapping so that data can be retrived by id 
    
    modifier restricted() {
        require(msg.sender==manager);
        _;
    }
    
    function Certificate() public {
        manager = msg.sender;
    }
    
     function createData( string _id  , string _sname , string _course) public restricted {
        Data memory newData = Data({
            id : _id,
            sname : _sname,
            course : _course
            });  // creating certificate data 
        total++;
        certData[_id] = newData;
    
    }
    
    function getData(string _id) public view returns (string , string , string) {
        
        Data storage data = certData[_id];
        
        return (
        data.id,
        data.sname,
        data.course
        ); // getting data from mapping 
      }
    function editData( string _id  , string _sname , string _course) public restricted {
        
        Data storage data = certData[_id];
        data.sname = _sname;
        data.course= _course;
        // editing data in case of any error
    }
    
     function totalCertificate() public view returns(uint){
         return total;
     }

}