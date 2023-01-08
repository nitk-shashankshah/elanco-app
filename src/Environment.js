import React, { useEffect, useState } from "react"

export default class Environment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          environments: this.props.values,
        };
    }   

    render() {
        return (
            <div>
                {this.state.environments.length > 0 && (
                <select onChange={this.props.handleOnChange}>
                    <option selected value="select">Please Select Environment</option>
                    {this.state.environments.map(env => (
                      <option key={env} value={env}>{env}</option>
                    ))}
                </select>
                )}
            </div>
        );
      }

}