import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLocalStorageData, StoreData, Discard, DeleteNote } from '../../Actions/action';
import uuid from 'react-uuid';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';


function Note(props) {


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");


  const editData = (data) => {

    setTitle(data.title);
    setContent(data.content);
    setDate(moment(new Date(data.date)).format('YYYY-MM-DD'));

  }

  const deleteData = (data) => {


    let arr = props.savedData;


    _.remove(arr, function (item) {
      return item.id === data.id;
    });

    localStorage.setItem("noteTakingData", JSON.stringify(arr));

    props.PerformAction("addData");
    toast.success("Data Delete Successfully");
    setTitle("");
    setContent("");
    props.StorageAction();


  }


  useEffect(() => {

    if (props.noteKey) {

      let arr = props.savedData;
      for (let i = 0; i < arr.length; i++) {

        if (arr[i].id === props.noteKey) {
          editData(arr[i])
        }

      }
    }

    if (props.deleteNote) {

      let arr = props.savedData;
      for (let i = 0; i < arr.length; i++) {

        if (arr[i].id === props.noteKey) {
          deleteData(arr[i])
        }

      }

    }


  }, [props.noteKey, props.deleteNote])




  const saveNotes = () => {

    if (props.noteKey) { // this calls we save the edit data

      let prevData;
      let arr = props.savedData;

      for (let i = 0; i < arr.length; i++) {

        if (arr[i].id === props.noteKey) {
          prevData = arr[i];
        }

      }

      let data = { id: prevData.id, title: prevData.title, content: prevData.content, date: prevData.date } // Access data from local storage
      if (title && content && date) {
        data.title = title;
        data.content = content;
        data.date = date;

      }
      else if (title) {
        data.title = title;

      }
      else if (content) {
        data.content = content;

      }
      else if (date) {
        data.date = date;

      }


      for (let i = 0; i < arr.length; i++) {

        if (arr[i].id === props.noteKey) {
          arr[i] = data;
        }

      }

      localStorage.setItem("noteTakingData", JSON.stringify(arr));

      props.PerformAction("addData");
      toast.success("Data Edit Successfully");
      setTitle("");
      setContent("");
      props.StorageAction();


    }

    else {  // this calls when we save new note


      let arr = JSON.parse(localStorage.getItem("noteTakingData"));

      let data = { id: uuid(), title: "", content: "", date: props.selectedDate }

      if (title && content) {
        data.title = title;
        data.content = content;

      }
      else if (title) {
        data.title = title;

      }
      else if (content) {
        data.content = content;

      }

      arr.push(data);

      if (data.title) {
        localStorage.setItem("noteTakingData", JSON.stringify(arr));

        props.PerformAction("addData");
        toast.success("Data Add Successfully");
        setTitle("");
        setContent("");
        props.StorageAction();

      }
      else {
        toast.error("Please Enter the Title");

      }


    }

  }


  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }


  const onChangeContent = (event) => {
    setContent(event.target.value);

  }

  const discardNote = () => {
    props.PerformAction("Discard");
    setTitle("");
    setContent("");
  }


  const handleChange = event => {
    setDate(event.target.value)
  };


  let selectedDate = moment(new Date(props.selectedDate)).format('LL');


  const deleteNote = () => {
    props.PerformAction("deleteNote");

  };

  return (
    <>

      <br />

      <Modal show={props.showNote} >
        <Modal.Header>
          <Modal.Title>{props.noteName}</Modal.Title>

        </Modal.Header>

        <Card className="text-center">
          <Card.Body>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={onChangeTitle} placeholder="Enter Title" />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" value={content} placeholder="Enter Content" onChange={onChangeContent} />
              </Form.Group>

              {props.editNote ? <p>Date:-
                 <input type="date"
                  onChange={handleChange} value={date} id="date" name="date" /> </p> : ""}

              <Button variant="success" className="mr-5" onClick={saveNotes} >
                Save
     </Button>
              {props.editNote ?
                <>

                  <Button variant="danger" className="ml-5" onClick={deleteNote}>
                    Delete
     </Button>

                  <Button variant="danger" className="ml-5" onClick={discardNote}>
                    Discard
</Button>

                </>

                : <Button variant="danger" className="ml-5" onClick={discardNote}>
                  Discard
     </Button>}

            </Form>
          </Card.Body>
          {props.editNote ? "" :
            <Card.Footer className="text-muted">{selectedDate}</Card.Footer>
          }
        </Card>

      </Modal>

      {props.showContent ?
        <Modal
          show={props.showContent}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
              View Description
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {props.contentData.content}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={discardNote}>Close</Button>
          </Modal.Footer>
        </Modal>

        : ""}

      <ToastContainer />
    </>
  );
}


function mapStateToProps(state) {
  return {
    savedData: state.savedData,
    selectedDate: state.selectedDate,
    noteName: state.noteName,
    showNote: state.showNote,
    editNote: state.editNote,
    noteKey: state.noteKey,
    deleteNote: state.deleteNote,
    showContent: state.showContent,
    contentData: state.contentData
  };
}

function mapActionToProps(dispatch) {
  return {

    PerformAction: function (condition) {

      if (condition === "addData") {
        dispatch(StoreData());


      }
      else if (condition === "Discard") {

        dispatch(Discard());

      }
      else if (condition === "deleteNote") {

        dispatch(DeleteNote());

      }

    },

    StorageAction: function () {

      dispatch(setLocalStorageData());

    }
  }
}


export default connect(mapStateToProps, mapActionToProps)(Note);
