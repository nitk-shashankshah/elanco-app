import React, { useEffect, useState } from "react"
import Applications from "./Applications"
import Resources from "./Resources"
import Environment from "./Environment"
import Bu from "./Bu"

const Raw = () => {
  const [users, setUsers] = useState([])
  const [environments, setEnvironments] = useState([])
  const [businessUnits, setBusinessUnits] = useState([])
  const [application, setApplication] = useState('select')
  const [resource, setResource] = useState('select')
  const [environment, setEnvironment] = useState('select')
  const [bu, setBu] = useState('select')

  const fetchData = () => {
    fetch("https://engineering-task.elancoapps.com/api/raw")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
        var obj = {};
        data.map(user => user.Tags["environment"]).map(each => {obj[each]=1;});
        setEnvironments(Object.keys(obj));

        obj = {};      
        data.map(user => user.Tags["business-unit"]).map(each => {obj[each]=1;});
        setBusinessUnits(Object.keys(obj));
      })
  }


  const handleOnChangeApp = (e) => {
    setApplication(e.target.value);
  }
  const handleOnChangeResource = (e) => {
    setResource(e.target.value);
  }
  const handleOnChangeEnvironment = (e) => {
    setEnvironment(e.target.value);
  }
  const handleOnChangeBU = (e) => {
    setBu(e.target.value);
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div> 

      <div class="centerAlign"><b>Elanco App</b></div>
      <div class="borderPanel">
        <div class="flexRow">            
          <span class="heading">Application:</span> <Applications handleOnChange={(x) => handleOnChangeApp(x)}></Applications>&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="heading">Resource:</span> <Resources handleOnChange={(x) => handleOnChangeResource(x)}></Resources>            
          <hr></hr>
        </div>
        {users.length > 0 && (<div class="flexRow">           
                <span class="heading">Environment: </span>
                <Environment handleOnChange={(x) => handleOnChangeEnvironment(x)} values={environments}></Environment>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span class="heading">Business Unit:  </span>
                <Bu handleOnChange={(x) => handleOnChangeBU(x)} values={businessUnits}></Bu>             
            </div>)}  

      </div>

      {users.length > 0 && (
        <div>      
          <br></br>     
          <b>Total Cost:</b> <span>{users.filter(user => (user.ResourceGroup === application || application=="select"))
              .filter(user => (user.MeterCategory === resource || resource=="select"))
              .filter(user => (user.Tags.environment === environment || environment=="select"))
              .filter(user => (user.Tags["business-unit"] === bu || bu=="select"))
              .map((user, ind) => (user.Cost * user.ConsumedQuantity))
              .reduce((a,v) =>  a = a + v , 0)}</span>
          <table cellPadding="0" cellSpacing="0" class="tbl">
            <thead>
                <tr>
                  <th> ConsumedQuantity</th>
                  <th> Cost</th>             
                  <th> UnitOfMeasure</th>
                  <th> Date</th>       
                  <th> InstanceId</th>           
                  <th> MeterCategory</th>
                  <th> ResourceGroup</th>
                  <th> Location</th>
                  <th> Environment</th>
                  <th> Business Unit</th>
                  <th> App Name</th>
                  <th> ServiceName</th>
                </tr>
            </thead>
            <tbody>
              {users.filter(user => (user.ResourceGroup === application || application=="select"))
              .filter(user => (user.MeterCategory === resource || resource=="select"))
              .filter(user => (user.Tags.environment === environment || environment=="select"))
              .filter(user => (user.Tags["business-unit"] === bu || bu=="select"))
              .map((user, ind) => (
                <tr key={ind}>
                  <td> {user.ConsumedQuantity}</td>
                  <td> {user.Cost}</td>
                  <td> {user.UnitOfMeasure}</td>
                  <td> {user.Date}</td>  
                  <td> {user.InstanceId}</td>
                  <td> {user.MeterCategory}</td>
                  <td> {user.ResourceGroup}</td>
                  <td> {user.Location}</td>
                  <td> {user.Tags.environment}</td>
                  <td> {user.Tags["business-unit"]}</td>
                  <td> {user.Tags["app-name"]}</td>
                  <td> {user.ServiceName}</td>
                </tr>
              ))}
            </tbody>
          </table>     
        </div>
      )}
    </div>
  )
}

export default Raw