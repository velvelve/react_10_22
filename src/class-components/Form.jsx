import React from "react";


export class Form extends React.Component {
    state = {
        name: 'geekbrains',
        arr: ['Ivanov', 'Petrov', 'Sidorov']
    }

    handleChangeName = (ev) => {
        this.setState({
            name: ev.target.value
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            {this.state.arr.map((item, index) => {
                return <div key={index} >{item}</div>
            })}
            <input type="text" onChange={this.handleChangeName} />
            <button>Send form</button>
        </form>
    }
} 