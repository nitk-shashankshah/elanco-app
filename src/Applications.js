import React, { useEffect, useState } from "react"

export default class Applications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          applications: Array(),
        };
        this.fetchData();
    }

    fetchData = () => {
        fetch("https://engineering-task.elancoapps.com/api/applications")
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.setState({applications: data});
          })
    };

    render() {
        return (
            <div>
            {this.state.applications.length > 0 && (
               <select onChange={this.props.handleOnChange}>
                <option selected value="select">Please Select Application</option>
                {this.state.applications.map(appVal => (
                  <option key={appVal} value={appVal}>{appVal}</option>
                ))}
              </select>
            )}
          </div>
        );
      }

}