const Modal = React.createClass({

    getInitialState: function() {
        return {
            firstName: this.props.customer.firstName,
            surname: this.props.customer.surname,
            user_name: this.props.customer.user_name,
            phonenum: this.props.customer.phonenum,
        }
    },

    renderOnClose: function(){
        var self = this;
        $.ajax ({
            url: "http://localhost:8080/app/findall"
        }).then (function(data) {
            self.setState({customers: data});
            ReactDOM.render(
                <CustomerTable customers={self.state.customers} />, document.getElementById('body')
            );
        });
    },

    componentWillMount: function(){
        const id = "modal-" + this.props.customer.accountNumber;
        this.setState({accountNumber: id, dataTarget : '#' + id});
    },

    render: function() {
        return (
            <div className="text-dark">
                <i style={editMargin} className="far fa-edit edit" data-toggle="modal" data-target={this.state.dataTarget}></i>

                <div className="modal fade" id={this.state.accountNumber} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit your details</h5>
                            </div>
                            <div className="modal-body container">
                                <Edit customer={this.props.customer} onClick={this.props.onClick} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="closeButton" data-dismiss="modal" onClick={this.renderOnClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const Edit = React.createClass({
    getInitialState: function() {
        return {
            firstName: this.props.customer.firstName,
            surname: this.props.customer.surname,
            user_name: this.props.customer.user_name,
            phonenum: this.props.customer.phonenum,
        }
    },

    update: function() {
        this.state.firstName = this.props.state.firstName,
        this.state.surname = this.props.state.surname,
        this.state.user_name = this.props.state.user_name,
        this.state.phonenum = this.props.state.phonenum
    },

    reRender: function() {
        if (typeof this.props.onClick === "function" ) {
            this.props.onClick(this.props.customer.firstName, this.props.customer.surname, this.props.customer.user_name, this.props.customer.phonenum);
        }
    },

    nameChange: function(e) {
        this.setState({
            firstName: e.target.value
        })
    },
    lastChange: function(e) {
        this.setState({
            surname: e.target.value
        })
    },
    userChange: function(e) {
        this.setState({
            user_name: e.target.value
        })
    },
    phoneChange: function(e) {
        this.setState({
            phonenum: e.target.value
        })
    },
    submit: function (e){
        e.preventDefault();

        console.log(this.props.customer.accountNumber);
        const data = {
            "accountNumber": this.props.customer.accountNumber,
            "firstName": this.state.firstName,
            "surname": this.state.surname,
            "user_name": this.state.user_name,
            "phonenum": this.state.phonenum,
        };

        const jsonData = JSON.stringify(data);

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "app/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": jsonData
        };

        $.ajax(settings)
            .done(function(data) {
                console.log("Hello")
            })
            .fail(function(jqXhr) {
                console.log("data : " + data );
                console.log('failed to register');
            });
    },

    render: function () {
        return (
            <div className="container">
                <form onSubmit={this.submit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name" onChange={this.nameChange} val={this.state.firstName} defaultValue={this.props.customer.firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSName">Surname</label>
                        <input type="text" className="form-control" id="inputSName" placeholder="Surname" onChange={this.lastChange} val={this.state.surname} defaultValue={this.props.customer.surname}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSName">Username</label>
                        <input type="text" className="form-control" id="inputUName" placeholder="User name" onChange={this.userChange} val={this.state.user_name} defaultValue={this.props.customer.user_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPNum">Phone number</label>
                        <input type="number" className="form-control" id="inputPNum" placeholder="Phone number" onChange={this.phoneChange} val={this.state.phonenum} defaultValue={this.props.customer.phonenum}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submitbutton" reRenderParent={this.props.onClick}>Edit</button>
                    </div>

                </form>
            </div>
        );
    }
});

// Navigationbar and page functions
const Navbar = React.createClass({
    LandingPage() {
        ReactDOM.render(
            <LandingPage />, document.getElementById("body")
        );
    },
    AddAccount() {
        ReactDOM.render(
            <Add />, document.getElementById("body")
        );
    },
    Dashboard() {
        ReactDOM.render(
            <Dash />, document.getElementById("body")
        );
    },
    GetAccount() {
        ReactDOM.render(
            <App />, document.getElementById("body")
        );
    },
    render: function()  {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#" onClick={this.LandingPage}>AccountApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#dashboard" onClick={this.Dashboard}>Dashboard<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Account
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#" onClick={this.GetAccount}>Get Account</a>
                                <a className="dropdown-item" href="#" onClick={this.AddAccount}>Add Account</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

// Add new account
const Add = React.createClass({
    getInitialState: function() {
        return {}
    },

    nameChange: function(e) {
        this.setState({
            firstName: e.target.value
        })
    },
    lastChange: function(e) {
        this.setState({
            surname: e.target.value
        })
    },
    userChange: function(e) {
        this.setState({
            user_name: e.target.value
        })
    },
    phoneChange: function(e) {
        this.setState({
            phonenum: e.target.value
        })
    },
    submit: function (e){
        e.preventDefault();

        const data = {
            "firstName": this.state.firstName,
            "surname": this.state.surname,
            "user_name": this.state.user_name,
            "phonenum": this.state.phonenum,
        };

        e.target.reset();

        const jsonData = JSON.stringify(data);

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "app/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": jsonData
        };

        $.ajax(settings)
            .done(function(data) {
                console.log("Hello")
            })
            .fail(function(jqXhr) {
                console.log("data : " + data );
                console.log('failed to register');
            });
    },

    render: function () {
        return (
            <div className="container">
                <h3 style={headerMargin}>Add Account</h3>
                <form onSubmit={this.submit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" required={true} placeholder="enter your first name..." onChange={this.nameChange} val={this.state.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSName">Surname</label>
                        <input type="text" className="form-control" id="inputLName" required={true} placeholder="enter your surname..." onChange={this.lastChange} val={this.state.surname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSName">User name</label>
                        <input type="text" className="form-control" id="inputUName" required={true} placeholder="enter your user name..." onChange={this.userChange} val={this.state.user_name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPNum">Phone number</label>
                        <input type="number" className="form-control" id="inputPNum" required={true} placeholder="enter your user name..." onChange={this.phoneChange} val={this.state.phonenum} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="addButton">Add Account</button>
                    </div>
                </form>
            </div>
        );
    }
});
{/* Accounts tab content */}
const Customer = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        const self = this;
        $.ajax({
            "url": "http://localhost:8080/app/delete",
            type: 'DELETE',
            data: JSON.stringify(self.props.customer),
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "c7bb89b4-2b6c-3cdb-cd22-86fdba25c43c"
            },
            "processData": false,
            success: function(result) {
                // self.setState({display: false});
                self.setState({delete: true});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    render: function() {
        if (!this.state.delete) {
            return (
                <tr>
                    <td>{this.props.customer.accountNumber}</td>
                    <td>{this.props.customer.firstName}</td>
                    <td>{this.props.customer.surname}</td>
                    <td>{this.props.customer.user_name}</td>
                    <td>{this.props.customer.phonenum}</td>
                    <Modal customer={this.props.customer} onClick={this.reRender}/>
                    <td onClick={this.handleDelete}><i className="fas fa-trash-alt delete"></i></td>
                </tr>);
        } else {
            return null;
        }
    }
});
// finding users from data and puts them into CustomerTable
const App = React.createClass({
    loadCustomersFromServer: function () {
        const self = this;
        $.ajax({
            url: "http://localhost:8080/app/findall"
        }).then(function (data) {
            self.setState({customers: data});
        });
    },

    getInitialState: function () {
        return {customers: []};
    },

    componentDidMount: function () {
        this.loadCustomersFromServer();
    },
    componentWillMount: function () {
        this.loadCustomersFromServer();
    },

    statics: {
        update: function() {
            self.loadCustomersFromServer();
            this.render();
        }
    },

    render() {
        console.log(this.state.customers);
        return (
            <CustomerTable customers={this.state.customers} />
        );
    }
});


// Forming the table (CustomerTable)
const CustomerTable = React.createClass({
    render: function() {
        const rows = [];
        this.props.customers.forEach(function(customer) {
            rows.push(<Customer customer={customer} />);
        });
        return (
            <div className="container">
                <h3 style={headerMargin}>Get Account</h3>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Account Number</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Username</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>

        );
    }
});
// Dashboard
const Dash = React.createClass({
    render: function() {

        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1>This is your dashboard.</h1>
                    <h3>Nothing to see here.<br />Probably, it's a great time to click somewhere else!<br />
                    *insert smiling face</h3>
                </div>
            </div>
        );
    }
});
// a margin that needed to be added as a CSS property
const editMargin = {
    marginTop: '10px'
};

// a margin that can be added as a CSS property
const headerMargin = {
    marginTop: '40px',
    marginBottom: '20px'
};

// Home page
const LandingPage = React.createClass({
    render: function () {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1>Welcome to our application</h1>
                    <h3>Our application allows users to use create, read, update and delete accounts.</h3>
                </div>
            </div>

        );
    }
});
// main signal
const Main = React.createClass({
    render: function(){
        return (
            <div>
                <Navbar />
                <div id='body'>
                    <LandingPage />
                </div>
            </div>
        )
    }
});
// rendering the main signal
ReactDOM.render(
    <Main />, document.getElementById('app')
);