import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { SetSelectedDate, InitData } from '../../Actions/action';

function CalendarComponent(props) {


  useEffect(() => {                    


    let selectedDate = moment(new Date()).format('YYYY-MM-DD');

    props.PerformAction("initData", selectedDate);

  }, [])


  const onChangeDate = (date) => {  

    let selectedDate = moment(new Date(date)).format('YYYY-MM-DD');

    props.PerformAction("setSelectedDate", selectedDate);



  }


  return (

    <>
      <Calendar
        defaultValue={new Date()}
        onChange={onChangeDate}
      />

    </>
  );
}


function mapActionToProps(dispatch) {
  return {

    PerformAction: function (condition, data) {

      if (condition === "initData") {

        dispatch(InitData(data)); 

      }
      else if (condition === "setSelectedDate") {

        dispatch(SetSelectedDate(data));

      }

    }
  }
}

export default connect(null, mapActionToProps)(CalendarComponent);

