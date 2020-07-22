import React, { useEffect, useState } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import CalendarComponent from './Calender/CalendarComponent';
import Items from './ListItem/Items';
import 'react-calendar/dist/Calendar.css';
import Note from './Note/Note';
import { connect } from 'react-redux';
import { setLocalStorageData } from '../Actions/action';

function LandingPage(props) {

  const [responsive, setResponsive] = useState(false);

  useEffect(() => {

    props.StorageAction();

    let mql = window.matchMedia('(max-width: 800px)');

    setResponsive(mql.matches);

  }, [])


  document.getElementsByTagName("BODY")[0].onresize = function () { changeWidth() };

  function changeWidth() {

    let mql = window.matchMedia('(max-width: 800px)');

    setResponsive(mql.matches);
  }


  return (
    <>

      <Navbar bg="light" variant="light" >
        <Navbar.Brand>Note-taking App</Navbar.Brand>

        <div className="ml-auto"> Data Used:- {props.dataUsed} KB</div>

      </Navbar>

      <br />
      <br />
      <br />

      <Container>
        <Row>
          <Col><CalendarComponent /></Col>
          {responsive ? "" : <Col xs={7}> <Items /></Col>}

        </Row>

        <Row>
          {responsive ? <Col> <Items /></Col> : ""}

        </Row>
      </Container>

      <Note />

    </>
  );
}


function mapStateToProps(state) {  // Get State from Redux
  return {
    dataUsed: state.dataUsed

  };
}

function mapActionToProps(dispatch) {  // Dispatch Action on Redux
  return {


    StorageAction: function () {

      dispatch(setLocalStorageData());

    }
  }
}


export default connect(mapStateToProps, mapActionToProps)(LandingPage);