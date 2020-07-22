import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editNote, ViewContent } from '../../Actions/action';
import moment from 'moment';
function ListItems(props) {


  const editNote = () => {


    props.PerformAction(props.item.id, "editNote")

  }

  const viewContent = () => {

    props.PerformAction(props.item, "viewContent")

  }


  let selectedDate = moment(new Date(props.item.date)).format('LL');


  return (
    <>


      <tr>
        <td>{props.dataIndex + 1}</td>
        <td><a href="#" className="text-dark" onClick={viewContent}>{props.item.title}</a> </td>
        <td>{selectedDate}</td>
        <td>   <Button value={props.item.title} variant="danger"
          onClick={editNote}>Edit</Button>

        </td>
      </tr>

    </>
  );
}

function mapActionToProps(dispatch) {
  return {

    PerformAction: function (data, condition) {

      if (condition === "editNote") {

        dispatch(editNote(data));

      }

      else if (condition === "viewContent") {

        dispatch(ViewContent(data));

      }

    }
  }
}


export default connect(null, mapActionToProps)(ListItems);



