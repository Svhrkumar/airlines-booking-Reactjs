import axios from "axios";
import React, { useState, useEffect } from "react";
import "./cards.css";
import { v4 as uuidv4 } from "uuid";
import seatLayout from "../image/pngegg.png";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";
import FlightRoundedIcon from "@mui/icons-material/FlightRounded";
import TabPanel from "./TabPanel";
import CardNav from "./CardNav";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 
const Cards = ({ fetchedData }) => {
  const {
    OriginCity,
    DestinationCity,
    DestAirportName,
    OrigAirportName,
    seats,
    bookedSeats,
    canceled,
  } = fetchedData;
  const [viewDetails, setViewDetails] = useState(false);
  const [bookingUserName, setBookingUserName] = useState("");
  const [bookingUserEmail, setBookingUserEmail] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [bookingConfirm, setBookingConfirm] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);
  const [finalInfo, setFinalInfo] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [flightTab, setFlightTab] = useState(true);
  const [copon, setCopon] = useState("");
  const [flightId, setFlightId] = useState("");
  const [passengerTab, setPassengerTab] = useState(false);
  const [flightBookedUsers, setFlightBookedUsers] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([
    {
      name: "",
      gender: "",
      age: "",
      mealType: "",
      seatNo: "",
    },
  ]);
 
  const [errors, setErrors] = useState({
    requiredName: false,
    requiredGender: false,
    requiredAge: false,
    requireMealtype: false,
    requiredSeatNo: false,
  });
 
  const {
    requiredName,
    requiredGender,
    requiredAge,
    requireMealtype,
    requiredSeatNo,
  } = errors;
  const handleDetailsTab = () => {
    if (viewDetails === false) {
      setViewDetails(true);
    } else {
      setViewDetails(false);
    }
  };
 
  // const totalAmount = fetchedData.reduce((a,c) => a + c.Price * passengerDetails.length)
  console.log(
    "---------fetchedData price------",
    fetchedData,
    seats,
    bookedSeats
  );
  //   useEffect(() => {
  //       if(numberOfPassengers === "null")
  // {
  //     setPassengerDetails(null)
  // }
  //   },[numberOfPassengers])
  const count = passengerDetails.length
  const [data] = passengerDetails;
  const { name, gender, age, mealType, seatNo } = data;
  console.log("-------destructuring array", data);
  const checkOut = async (data) => {
    console.log("booking ",data)
    setFlightId(data._id);
   let bkId = Math.floor(10000000 + Math.random() * 90000)
    const req = {
      bookingId: bkId,
      bookingUserEmail:bookingUserEmail,
      bookingUserName:bookingUserName,
      originCity: data.OriginCity,
      destinationCity: data.DestinationCity,
      flightNo: data.flightCode,
      flightId: data._id,
      bookingDate: data.DepartureDate,
      DepartureTime: data.DepartureTime,
      ArrivalTime: data.ArrivalTime,
      passengerDetails,
      ImageUrl: data.ImageUrl,
      ticketPrice: ticketPrice,
    };
    console.log("book request", req);
   
   const header = {
     'Content-Type':'application/json'
   }
   const strReq = JSON.stringify(req)
    await axios.post("https://airline-bookings-nodejs.herokuapp.com/api/v1/userbooking",req)
      .then((res) => {
        console.log(res);
        setBookedDetails(res.data);
        toast.success('Booked Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        if (res.status === 200) {
          setBookingConfirm(true);
          setViewDetails(false);
 
        }
      })
      .catch((err) => {
        console.log(err);
      });
      const bookedReq = {
        flightId:data._id,
        flightCode:data.flightCode,
        bookedPassengers:passengerDetails
      }
 
      await axios
      .post("https://airline-bookings-nodejs.herokuapp.com/api/v1/flight/bookings",bookedReq)
      .then((res) => {
        console.log(res);
        setBookedDetails(res.data);
        if (res.status === 201) {
          setBookingConfirm(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  console.log("-----error----", errors);
  const handleBook = () => {
    if (
      name !== "" &&
      gender !== "" &&
      age !== "" &&
      mealType !== "" &&
      seatNo !== ""
    ) {
      setFinalInfo(true);
      console.log("check---------------------");
      setErrors({
        requiredName: false,
        requiredGender: false,
        requiredAge: false,
        requireMealtype: false,
        requiredSeatNo: false,
      });
    } else {
      if (
        name == "" &&
        gender == "" &&
        age == "" &&
        mealType == "" &&
        seatNo == ""
      ) {
        setErrors({
          requiredName: true,
          requiredGender: true,
          requiredAge: true,
          requireMealtype: true,
          requiredSeatNo: true,
        });
        setViewDetails(true);
      }
      if (
        name !== "" &&
        gender == "" &&
        age == "" &&
        mealType == "" &&
        seatNo == ""
      ) {
        setErrors({
          requiredName: false,
          requiredGender: true,
          requiredAge: true,
          requireMealtype: true,
          requiredSeatNo: true,
        });
        setViewDetails(true);
      }
      if (
        name !== "" &&
        gender !== "" &&
        age == "" &&
        mealType == "" &&
        seatNo == ""
      ) {
        setErrors({
          requiredName: false,
          requiredGender: false,
          requiredAge: true,
          requireMealtype: true,
          requiredSeatNo: true,
        });
        setViewDetails(true);
      }
      if (
        name !== "" &&
        gender !== "" &&
        age !== "" &&
        mealType == "" &&
        seatNo == ""
      ) {
        setErrors({
          requiredName: false,
          requiredGender: false,
          requiredAge: false,
          requireMealtype: true,
          requiredSeatNo: true,
        });
        setViewDetails(true);
      }
      if (
        name !== "" &&
        gender !== "" &&
        age !== "" &&
        mealType !== "" &&
        seatNo == ""
      ) {
        setErrors({
          requiredName: false,
          requiredGender: false,
          requiredAge: false,
          requireMealtype: false,
          requiredSeatNo: true,
        });
        setViewDetails(true);
      }
      if (
        name !== "" &&
        gender !== "" &&
        age !== "" &&
        mealType !== "" &&
        seatNo !== ""
      ) {
        setErrors({
          requiredName: false,
          requiredGender: false,
          requiredAge: false,
          requireMealtype: false,
          requiredSeatNo: false,
        });
        setViewDetails(true);
      }
    }
  };
 
  console.log("Response data", bookedDetails);
  const handleBookingFields = (i, e) => {
    const value = [...passengerDetails];
    value[i][e.target.name] = e.target.value;
    setPassengerDetails(value);
  };
 
  const handleAdd = (e) => {
    e.preventDefault();
    setPassengerDetails([
      ...passengerDetails,
      {
        name: "",
        gender: "",
        age: "",
        mealType: "",
        seatNo: "",
      },
    ]);
  };
 
  useEffect(() => {
    setTicketPrice(fetchedData.Price * passengerDetails.length);
    if (copon === "400") {
      setTicketPrice(fetchedData.Price * passengerDetails.length - 400);
    }
    if (copon === "567") {
      setTicketPrice(fetchedData.Price * passengerDetails.length - 567);
    }
    if (copon === "765") {
      setTicketPrice(fetchedData.Price * passengerDetails.length - 765);
    }
    if (copon === "243") {
      setTicketPrice(fetchedData.Price * passengerDetails.length - 400);
    }
  }, [fetchedData, passengerDetails, copon]);
  const handleRemove = (e) => {
    e.preventDefault();
    setPassengerDetails([
      {
        name: "",
        gender: "",
        age: "",
        mealType: "",
        seatNo: "",
      },
    ]);
  };
 
  useEffect(() => {
    if (bookingConfirm) {
      const req = {
        seats: seats - passengerDetails.length,
        bookedSeats: bookedSeats + passengerDetails.length,
        canceled: canceled - passengerDetails.length,
      };
      axios
        .patch(`http://localhost:8000/flights/${flightId}`, req)
        .then((res) => {
          console.log("delete res", res.data);
        })
        .catch((err) => console.log("error----", err));
      setTimeout(() => {
        setBookingConfirm(false);
        setFinalInfo(false);
        setViewDetails(false);
        setPassengerDetails([
          {
            name: "",
            gender: "",
            age: "",
            mealType: "",
            seatNo: "",
          },
        ]);
        setBookingUserEmail("");
        setBookingUserName("");
      }, 2400);
    }
  }, [bookingConfirm]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/bookings?f${fetchedData.id}`)
      .then((res) => {
        console.log(res);
        setFlightBookedUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchedData]);
 
  const TabsHandle = (flight) => {
    if (flight == true) {
      setFlightTab(false);
    } else {
      setFlightTab(true);
    }
  };
 
  console.log("no of passengerDetails", passengerDetails, ticketPrice);
  return (
    <React.Fragment>
      <div className="cards-ctn">
        <img src={fetchedData.ImageUrl} width="60px" height="20px" />
        <span>{fetchedData.flightCarrer}</span>
        <span>
          <b>{fetchedData.DepartureTime}</b>
          {"  "}---------
          <FlightRoundedIcon />
          ---------- {"  "}
          <b> {fetchedData.ArrivalTime}</b>
        </span>
        <span>
          <b>{fetchedData.flightCode}</b>
        </span>
        <span>
          <b>Price:₹{fetchedData.Price}</b>
        </span>
        {!finalInfo && (
          <span className="card-details-btn" onClick={handleDetailsTab}>
            View Details
          </span>
        )}
      </div>
      {viewDetails && (
        <>
          {!finalInfo ? (
            <div className="card-sub-ctn">
              <CardNav TabsHandle={TabsHandle} />
              {flightTab ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <div className="card-sub-ctn-row">
                        <span className="card-content">
                          {OriginCity} ({OrigAirportName})
                        </span>
                      </div>{" "}
                      <div className="card-sub-ctn-row">
                        <span className="card-content">
                          {moment(fetchedData.DepartureDate).format(
                            "DD/MM/YYYY"
                          )}
                        </span>
                      </div>{" "}
                      <div
                        className="card-sub-ctn-row"
                        style={{ flexWrap: "wrap" }}
                      >
                        <span className="card-content">
                          {" "}
                          {fetchedData.DepartureTime}{" "}
                          <FlightTakeoffRoundedIcon />
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "25px 5px" }}>
                      <ArrowRightAltRoundedIcon />
                    </div>
 
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <div className="card-sub-ctn-row">
                        <span className="card-content">
                          {DestinationCity} ({DestAirportName})
                        </span>
                      </div>{" "}
                      <div className="card-sub-ctn-row">
                        <span className="card-content">
                          {moment(fetchedData.ArrivalDate).format("DD/MM/YYYY")}
                        </span>
                      </div>{" "}
                      <div
                        className="card-sub-ctn-row"
                        style={{ flexWrap: "wrap" }}
                      >
                        <span className="card-content">
                          {" "}
                          {fetchedData.ArrivalTime} <FlightLandRoundedIcon />
                        </span>
                      </div>
                    </div>
                    <div className="card-btn-ctn">
                      <button className="card-btn" onClick={handleBook}>
                        Book
                      </button>
                    </div>
                  </div>
 
                  <div className="card-booking-ctn">
                    <h6>Booking User Details</h6>
                    <hr />
                    <form>
                      <div
                        className="form-row"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginTop: "10px",
                        }}
                      >
                        <div className=" col-md-3 mt-2 mr-3 field-ctn">
                          <label className="form-label">
                            Booking UserName:
                          </label>
                          <input
                            className="form-control "
                            type="text"
                            placeholder="Enter Name"
                            value={bookingUserName}
                            onChange={(e) => setBookingUserName(e.target.value)}
                          />
                        </div>
                        <div className=" col-md-3 mt-2 mr-2 field-ctn">
                          <label className="form-label">Email:</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Email"
                            value={bookingUserEmail}
                            onChange={(e) =>
                              setBookingUserEmail(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <div style={{ display: "flex", padding: "10px 5px" }}>
                          <p style={{ margin: "10px" }}>
                            No Of Passengers:{" "}
                            <span style={{ color: "#0039a6" }}>
                              <b>{passengerDetails.length}</b>
                            </span>
                          </p>
 
                          <button className="add-btn" onClick={handleAdd}>
                            <AddCircleOutlineRoundedIcon />
                          </button>
                          <button
                            className="add-reset-btn"
                            onClick={handleRemove}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div></div>
 
                  <div className="card-booking-ctn">
                    <h6>Passenger Details</h6>
                    <hr />
                    <form>
                      {passengerDetails &&
                        passengerDetails.map((fields, index) => (
                          <div style={{ display: "flex" }}>
                            <div className=" col-md-3 mt-2 mr-3 field-ctn">
                              <label className="form-label"> Name</label><span style={{color:"red"}}>*</span>
                              <input
                                className="form-control "
                                type="text"
                                placeholder="Enter Name"
                                value={fields.name}
                                name="name"
                                onChange={(e) => handleBookingFields(index, e)}
                              />
                               {requiredName ? <p style={{fontSize:"9px",color:"red"}}>  Name is Required</p> : ""}
                            </div>
                            <div className=" col-md-2 mt-2 mr-3 field-ctn">
                              <label className="form-label"> Gender</label><span style={{color:"red"}}>*</span>
                              <input
                                className="form-control "
                                type="text"
                                placeholder="Enter Name"
                                value={fields.gender}
                                name="gender"
                                onChange={(e) => handleBookingFields(index, e)}
                              />
                              {requiredGender ? <p style={{fontSize:"9px",color:"red"}}>  Gender is Required</p> : ""}
                            </div>
                            <div className=" col-md-1 mt-2 mr-3 field-ctn">
                              <label className="form-label">Age</label><span style={{color:"red"}}>*</span>
                              <input
                                className="form-control "
                                type="text"
                                placeholder="age"
                                value={fields.age}
                                name="age"
                                onChange={(e) => handleBookingFields(index, e)}
                              />
                               {requiredAge ? <p style={{fontSize:"9px",color:"red"}}>  Age is Required</p> : ""}
                            </div>
                            <div className=" col-md-2 mt-2 mr-3 field-ctn">
                              <label className="form-label">Meal Type</label>
                              <input
                                className="form-control "
                                type="text"
                                placeholder="Ex: Veg/non-Veg"
                                value={fields.mealType}
                                name="mealType"
                                onChange={(e) => handleBookingFields(index, e)}
                              />
                               {requireMealtype ? <p style={{fontSize:"9px",color:"red"}}>  MealType is Required</p> : ""}
                            </div>
                          </div>
                        ))}{" "}
                    </form>
                  </div>
                  <div className="card-booking-ctn">
                    <h6>Select Seat</h6>
                    <hr />
                    <div className="card-seat-ctn">
                      <div>
                        <form>
                          {passengerDetails &&
                            passengerDetails.map((fields, index) => (
                              <div style={{ display: "flex" }}>
                                <div className=" col-md-4 mt-2 mr-3 field-ctn">
                                  <label className="form-label">
                                    {" "}
                                    SeatNumber
                                  </label><span style={{color:"red"}}>*</span>
                                  <input
                                    className="form-control "
                                    type="text"
                                    placeholder="Ex: C9"
                                    value={fields.seatNo}
                                    name="seatNo"
                                    onChange={(e) =>
                                      handleBookingFields(index, e)
                                    }
                                  />
                                   {requiredSeatNo ? <p style={{fontSize:"9px",color:"red"}}>  SeatNo is Required</p> : ""}
                                </div>
                              </div>
                            ))}{" "}
                        </form>
                      </div>
                      <div>
                        <img
                          className="airbus-seat-layout"
                          src={seatLayout}
                          alt="seat layout"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-bg-ctn">
                    <div className="card-bg-ctn-col">
                      <img
                        src={fetchedData.ImageUrl}
                        width="70px"
                        height="30px"
                      />
                      <span style={{ margin: "10px 0px" }}>
                        {OriginCity}
                        <ArrowRightAltRoundedIcon />
                        {DestinationCity}
                      </span>
                    </div>
                    <div className="card-bg-ctn-col">
                      <div className="card-bg-ctn-sub-col">
                        <span>Checkin</span>
                        <span>1 pcs/ person</span>
                        <span>15 kgs /1pcs</span>
                      </div>
                      <hr />
                      <div className="card-bg-ctn-sub-col">
                        <span>cabin</span>
                        <span>1 pcs/ person</span>
                        <span>7 kgs /1pcs</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {!bookingConfirm ? (
                <div className="card-sub-ctn">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <div className="card-sub-ctn-row">
                      <span className="card-content">
                        City From: {fetchedData.OriginCity}
                      </span>
                      <span className="card-content">
                        City To: {fetchedData.DestinationCity}
                      </span>
                      <span className="card-content">
                        Departure Time: {fetchedData.DepartureTime}
                      </span>
                      <span className="card-content">
                        {" "}
                        Arrival Time: {fetchedData.ArrivalTime}
                      </span>
                      <span className="card-content">
                        <b>Total Price: ₹ {ticketPrice}</b>
                      </span>
                    </div>
                    <div
                      className="card-sub-ctn-row"
                      style={{ flexWrap: "wrap" }}
                    >
                      <span className="card-content">
                        Flight No: {fetchedData.flightCode}
                      </span>
                      <span className="card-content">
                        Booked Date: {fetchedData.DepartureDate}
                      </span>
                      <span className="card-content">
                        No of Passengers: {passengerDetails.length}
                      </span>
                      <span className="card-content">Coupon:</span>
                      <span>
                        <div class="input-group mb-3">
                          <select
                            class="form-select"
                            id="inputGroupSelect03"
                            aria-label="Example select with button addon"
                            value={copon}
                            onChange={(e) => setCopon(e.target.value)}
                          >
                            <option selected>Select Coupon</option>
                            <option value="400">FLY400</option>
                            <option value="567">FLY567</option>
                            <option value="=765">FLY765</option>
                            <option value="=243">FLY243</option>
                          </select>
                        </div>
                      </span>
                    </div>
                    <div
                      className="card-sub-ctn-row"
                      style={{ flexWrap: "wrap" }}
                    >
                      <h5>Passengers</h5>
                      <hr />
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Seat No</th>
                            <th>Ordered Meal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passengerDetails.map((data, id) => (
                            <tr>
                              <td>{data.name}</td>
                              <td>{data.gender}</td>
                              <td>{data.age}</td>
                              <td>{data.seatNo}</td>
                              <td>{data.mealType}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-check-btn-ctn">
                      <button
                        className="card-btn"
                        onClick={() => checkOut(fetchedData)}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-sub-ctn">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="card-sub-ctn-row">
                      <span className="card-content">
                        <b>PNR No: {bookedDetails.bookingId}</b>
                      </span>
                      <span className="card-content">
                        Status:{" "}
                        <b style={{ color: "green" }}>Booking Confirm</b>
                      </span>
                      <span className="card-content">
                        <b> Total Amount : ₹ {bookedDetails.ticketPrice}</b>
                      </span>
                    </div>
 
                    <div className="card-sub-ctn-row">
                      <span className="card-content">
                        City From: <b>{bookedDetails.originCity}</b>
                      </span>
                      <span className="card-content">
                        City To: <b>{bookedDetails.destinationCity}</b>
                      </span>
                      <span className="card-content">
                        Departure Time: <b>{bookedDetails.DepartureTime}</b>
                      </span>
                      <span className="card-content">
                        {" "}
                        Arrival Time: <b>{bookedDetails.ArrivalTime}</b>
                      </span>
                    </div>
                    <div
                      className="card-sub-ctn-row"
                      style={{ flexWrap: "wrap" }}
                    >
                      <span className="card-content">
                        Flight No: <b>{bookedDetails.flightNo}</b>
                      </span>
                      <span className="card-content">
                        Booked Date: <b>{bookedDetails.bookingDate}</b>
                      </span>
                      <span className="card-content">
                        No of Passengers:{" "}
                        <b>{bookedDetails.passengerDetails.length}</b>
                      </span>
                    </div>
                    <div
                      className="card-sub-ctn-row"
                      style={{ flexWrap: "wrap" }}
                    >
                      <h5>Passengers Details</h5>
                      <hr />
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Seat No</th>
                            <th>Ordered Meal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookedDetails &&
                            bookedDetails.passengerDetails &&
                            bookedDetails.passengerDetails.map((data, id) => (
                              <tr>
                                <td>{data.name}</td>
                                <td>{data.gender}</td>
                                <td>{data.age}</td>
                                <td>{data.seatNo}</td>
                                <td>{data.mealType}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};
 
export default Cards;
 

