import React from 'react';
import { MDBDataTable} from 'mdbreact';

const DatatablePage = (props) => {

    let data = {};
    
    if(props.type === 'userInfo'){
        const columns = [
            { label: <span>Name &#x021F5;</span>, field: 'name', sort: 'asc', width: 270 },
            { label: <span>Email &#x021F5;</span>, field: 'email', sort: 'asc', width: 270 },
            { label: 'Action', field: 'action', sort: 'disabled', width: 100 },
        ];

        const rows = props.data;
        data = { columns, rows };

    }else if(props.type === 'todosInfo'){
        const columns = [
            { label: <span>Date &#x021F5;</span>, field: 'date', sort: 'asc', width: 270 },
            { label: <span>Time &#x021F5;</span>, field: 'time', sort: 'asc', width: 270 },
            { label: 'Action', field: 'action', sort: 'disabled', width: 100 },
        ];

        const rows = props.data;
        data = { columns, rows };
    }
       
    return (
            <MDBDataTable
                striped
                bordered
                hover
                btn
                data={data}
                noBottomColumns
                exportToCSV
                filter="Discount_Condition"
                theadColor="blue"
                noRecordsFoundLabel="No Record Found"
            />
    );
}

export default DatatablePage;