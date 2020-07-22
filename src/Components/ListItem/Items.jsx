import React from 'react';
import { ListGroup, Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ListItems from './ListItems';
import moment from 'moment';
import { SetSelectedDate } from '../../Actions/action';


function Items(props) {


  let selectedDate = moment(new Date(props.selectedDate)).format('LL');



  return (
    <>
      <h3> {selectedDate}
        <Button style={{ marginLeft: "55%" }} variant="warning"
          onClick={props.PerformAction.bind(this, props.selectedDate)}  > + Add New </Button></h3>

      {props.savedData.length ? <ListGroup variant="flush">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>

            {props.savedData.map((data, index) =>
              <ListItems key={data.id} item={data}
                savedData={props.savedData} dataIndex={index} />
            )}



          </tbody>
        </Table>

      </ListGroup> : <p>No Item Added </p>}



    </>
  );
}

function mapStateToProps(state) {

  return {
    savedData: state.savedData,
    selectedDate: state.selectedDate
  };

}

function mapActionToProps(dispatch) {
  return {

    PerformAction: function (data) {

      dispatch(SetSelectedDate(data));


    }
  }
}



export default connect(mapStateToProps, mapActionToProps)(Items);

