import React, { useEffect, useState } from "react"

export default class Resources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          resources: Array(),
        };
        this.fetchData();
    }

    fetchData = () => {
        fetch("https://engineering-task.elancoapps.com/api/resources")
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.setState({resources: data});
          })
    };

    render() {
        return (
            <div>
            {this.state.resources.length > 0 && (
               <select onChange={this.props.handleOnChange}>
                <option selected value="select">Please Select Resource</option>
                {this.state.resources.map(appVal => (
                  <option key={appVal} value={appVal}>{appVal}</option>
                ))}
              </select>
            )}
          </div>
        );
      }

}