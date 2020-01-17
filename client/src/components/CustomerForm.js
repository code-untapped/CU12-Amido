import React from 'react';

import { Spinner } from 'reactstrap';
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css';

function CustomerList (props) {
    
    const data = props.Customers
            
    return(
        <div>
            <br />
            <ReactTable
                data={data}
                columns={[
                    {
                        Header: "Jobs",
                        columns: [
                            { Header: "firstName",   accessor: "firstName" },
                            { Header: "lastName",    accessor: "lastName" },
                            { Header: "email",       accessor: "email" },
                            { Header: "homePhone",   accessor: "homePhone" },
                            { Header: "mobilePhone", accessor: "mobilePhone" },
                        ]
                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                filterable={true}
            />
        </div>
    )    
}


class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {
            customerUrl: 'http://localhost:8840/getAmidoCustomerData',
            isCustomerListLoaded : false,
            Customers : null,
            error : null
        }

        this.retrieveCustomersList = this.retrieveCustomersList.bind(this);
    }

    componentDidMount() {
        this.retrieveCustomersList();
    }

    retrieveCustomersList() {
        const { customerUrl } = this.state; 

        let lurl = customerUrl;
 
        fetch(lurl, {
            method: "GET"
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result.models)
                this.setState({
                    isCustomerListLoaded: true,
                    Customers: result.models         
                });
                //alert(JSON.stringify(result));
            },

            (error) => {
                this.setState({
                    isCustomerListLoaded: true,
                    error
                });
                // alert(error);
            }
        ) 
    }
    

    render() {
        const { error, isCustomerListLoaded, Customers } = this.state;
        if (error) {
            return <div>
                        <p>Error: {error.message}</p>
                        <Spinner type="grow" color="danger" />
                    </div>
        } else if (!isCustomerListLoaded) {
            return <div>
                        <p>Loading Amido Customers...</p>
                        <Spinner type="grow" color="warning" />
                    </div>
        } else {
            return (
                <div>
                    <br/>
                    <CustomerList 
                        Customers = {Customers}
                    />    
                </div>
            );
        }
    };
}

export default CustomerForm;