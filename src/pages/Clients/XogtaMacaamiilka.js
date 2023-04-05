import React, { useEffect, useState, useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { ShimmerCategoryItem, ShimmerPostDetails } from "react-shimmer-effects";
import { map } from "lodash";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

// TableContainer



//Import mini card widgets

//Import Images
import profile1 from "assets/images/profile-img.png";

// import charts
// import ApexRevenue from "../ApexRevenue";
import { getUserProfile } from "store/actions";
import MiniCards from "./mini-card";
import { createTransactionForTheUser, httpFetcher } from "pages/services/fetchingData";
import useSWR from "swr";
import { success } from "toastr";

const XogtaMacaamiilka = props => {
  const [modal, setModal] = useState(false);
  const [transactionForm, setTransactionForm] = useState({})

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTransactionForm((prev) => ({ ...prev, [name]: value }));
    setTransactionForm((prev) => ({ ...prev, ['client']: clientInfo.id }));
  };
  const { id } = useParams();

  const { data: clientInfo, error } = useSWR(`/api/client-detail/${id}/`, httpFetcher);
  //meta title
  if (clientInfo) {
    document.title = `${clientInfo.name} Xogta Macamiilka | kNotary - React Admin & Dashboard Template`;
  }

  async function registreTransactionSubmit(e) {
    e.preventDefault();
    try {

      let response= await createTransactionForTheUser(transactionForm)
      location.reload()
    } catch (error) {
      console.log("")
    }
    // });
  }


  const { userProfile, onGetUserProfile } = props;
  // eslint-disable-next-line no-unused-vars
  const [miniCards, setMiniCards] = useState([
    {
      title: "Completed Projects",
      iconClass: "bx-check-circle",
      text: "125",
    },
    { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
    { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
  ]);

  useEffect(() => {
    onGetUserProfile();
  }, [onGetUserProfile]);

  return (
    <React.Fragment>
      <Modal size="md" isOpen={modal} >
        <ModalHeader tag="h4">
          {"Diiwaangali Dhaqdhaqaa"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={registreTransactionSubmit}>
            <Row form>
              <Col col={6}>
                <div className="mb-3">

                  <Label className="form-label">Lacagta</Label>
                  <Input
                    name="money"
                    type="number"
                    placeholder="Lacagta"
                    required
                    onChange={handleChange}
                    value={transactionForm.money}
                  />

                </div>
                <div className="mb-3">
                  <Label className="form-label">Nooca Lacagta</Label>
                  <Input
                    name="itReceives"
                    type="select"
                    className="form-select"
                    value={transactionForm.itReceives==true?"LACAG DHIGID" :"QAADASHO"}
                    onChange={e => setTransactionForm((prev) => ({ ...prev, ['itReceives']:  e.target.value =="QAADASHO"?false:true }))} 
                    
                  >
                    <option value="LACAG DHIGID" >LACAG DHIGID</option>
                    <option value="QAADASHO" >QAADASHO</option>
                  </Input>
                </div>
                <div className="mb-3">
                  <Label className="form-label">Waqtiga </Label>
                  <Input
                    name="dateTimeTransaction"
                    type="datetime-local"
                    className="form-control"
                    value={transactionForm.dateTimeTransaction}
                    onChange={handleChange}

                  >

                  </Input>
                </div>
                <div className="mb-3">
                  <Label htmlFor="validationCustom05">Faahfaahin</Label>


                  <Input
                    name="description"
                    type="textarea"
                    onChange={handleChange}
                    value={transactionForm.description}
                    maxLength="225"
                    className="form-control"
                    rows="3"
                    placeholder="This textarea has a limit of 225 chars."
                  />
                </div>
                <div className="mb-3">
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-success save-user"
                    >
                      Save Data
                    </button>
                  </div>
                </div>
              </Col>
            </Row>

          </Form>
        </ModalBody>
      </Modal>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {!clientInfo && !error ? (
            <Fragment>
              <div className=" pt-8 pb-8">
                <Container>
                  <ShimmerPostDetails card cta variant="EDITOR" />
                </Container>
              </div>
            </Fragment>
          ) : (

            <Row>
              <Col xl="4">
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col xs="7">
                        <div className="text-primary p-3">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p>It will seem like simplified</p>
                        </div>
                      </Col>
                      <Col xs="5" className="align-self-end">
                        <img src={profile1} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <Row>
                      <Col sm="4">
                        <div className="avatar-md profile-user-wid mb-2">
                          <img
                            src={`http://127.0.0.1:8000${clientInfo.image}`}
                            alt=""
                            height="290px"
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                        <h5 className="font-size-15 text-truncate">
                          {clientInfo.name}
                        </h5>
                        <p className="text-muted mb-0 text-truncate">
                          {clientInfo.number}
                        </p>
                      </Col>

                      <Col sm={8}>
                        <div className="pt-4">
                          <Row>
                            <Col xs="6">
                              <h5 className="font-size-15">
                                {userProfile.projectCount}
                              </h5>
                              <p className="text-muted mb-0">Projects</p>
                            </Col>
                            <Col xs="6">
                              <h5 className="font-size-15">
                                ${userProfile.revenue}
                              </h5>
                              <p className="text-muted mb-0">Revenue</p>
                            </Col>
                          </Row>
                          {/* <div className="mt-4">
                          <Link to="" className="btn btn-primary  btn-sm">
                            View Profile{" "}
                            <i className="mdi mdi-arrow-right ms-1" />
                          </Link>
                        </div> */}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Xogta Shaqsigan</CardTitle>
                    <p className="text-muted mb-4">
                      {userProfile.personalDetail}
                    </p>
                    <div className="table-responsive">
                      <Table className="table-nowrap mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Full Name :</th>
                            <td>{clientInfo.name}</td>
                          </tr>
                          <tr>
                            <th scope="row">Mobile :</th>
                            <td>{clientInfo.number}</td>
                          </tr>
                          <tr>
                            <th scope="row">Mobile-2 :</th>
                            <td>{clientInfo.number2}</td>
                          </tr>
                          <tr>
                            <th scope="row">Waqtiga Dhalashada :</th>
                            <td>{clientInfo.dateOfBirth}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <CardTitle className="mb-5">Marqaati Qabasho</CardTitle>
                    <div >
                      <ul className="verti-timeline list-unstyled">
                        {map(userProfile.experiences, (experience, i) => (
                          <li
                            className={
                              experience.id === 1
                                ? "event-list active"
                                : "event-list"
                            }
                            key={"_exp_" + i}
                          >
                            <div className="event-timeline-dot">
                              <i
                                className={
                                  experience.id === 1
                                    ? "bx bx-right-arrow-circle bx-fade-right"
                                    : "bx bx-right-arrow-circle"
                                }
                              />
                            </div>
                            <div className="d-flex">
                              <div className="me-3">
                                <i
                                  className={
                                    "bx " +
                                    experience.iconClass +
                                    " h4 text-primary"
                                  }
                                />
                              </div>
                              <div className="flex-grow-1">
                                <div>
                                  <h5 className="font-size-15">
                                    <Link
                                      to={experience.link}
                                      className="text-dark"
                                    >
                                      {experience.designation}
                                    </Link>
                                  </h5>
                                  <span className="text-primary">
                                    {experience.timeDuration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xl="8">
                <Row>
                  <MiniCards
                    title='Boosaska'
                    text={clientInfo.booskaWhoHas.length}
                    iconClass="bx-check-circle"
                    key={"_card_" + 1}
                  />
                  <MiniCards
                    title='Haraaga Lacagta'
                    text={<strong>${clientInfo.balance}</strong>}
                    iconClass="bx-hourglass"
                    key={"_card_" + 2}
                  />
                </Row>
                <Card>
                  <CardBody>
                    <div className="mb-2 d-flex justify-content-between">

                      <CardTitle className="mb-3">Boosaska Macaamiilka</CardTitle>
                      <Button size="sm" type="success" > Diiwaangali Boos Cusub</Button>
                    </div>
                    <div id="revenue-chart">
                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <thead className="table-dark">
                            <tr>
                              <th>#</th>
                              <th>NootaayoReff</th>
                              <th>MagacaBooska</th>
                              <th>LootoNum</th>
                              <th>Soone</th>
                              <th>Waqtiga-La</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="fw-bold">
                            {clientInfo.booskaWhoHas.length == 0 ? (
                              <tr>

                                <center><h6>boos uma diiwaan gashna</h6> </center>
                              </tr>
                            ) : (
                              clientInfo.booskaWhoHas.map((booska, index) => {
                                return <tr key={index}>
                                  <th scope="row">{booska.id}</th>
                                  <td>{booska.nootaayoReff}</td>
                                  <td>{booska.magacaBooska}</td>
                                  <td>{booska.lootoNum}</td>
                                  <td>{booska.soone}</td>
                                  <td>{booska.dateTime.split('T')[0]} - {booska.dateTime.split('T')[1].split('Z')[0]}</td>
                                </tr>
                              })
                            )}

                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <br></br>
                <Card>
                  <CardBody>
                    <div className="mb-2 d-flex justify-content-between">

                      <CardTitle className="mb-3">Dhaqdhaqaaqa Lacageed</CardTitle>
                      <Button size="sm" type="success" onClick={() => {
                        setModal(true)
                      }}> Dhaqdahqaaq Cusub</Button>
                    </div>
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th>#</th>
                            <th>NoocaDhaqdha</th>
                            <th>Lacagta</th>
                            <th>Marqaatiyasha</th>
                            <th>Faahfaahin</th>
                            <th>Waqtiga-La</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientInfo.userTransactions.length == 0 ? (
                            <tr>

                              <center><h6>boos uma diiwaan gashna</h6> </center>
                            </tr>
                          ) : (
                            clientInfo.userTransactions.map((transaction, index) => {
                              return <tr key={index}>
                                <th scope="row">{transaction.id}</th>
                                <td>{transaction.itReceives ? (<Badge style={{ 'backgroundColor': 'green' }} bg="success">DHIGTAY</Badge>) : (<Badge bg="success">QAATAY</Badge>)}</td>
                                <td><span style={{ 'fontSize': '13px' }} >$</span><strong>{transaction.money}</strong> </td>
                                <td>{transaction.description}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.dateTimeTransaction.split('T')[0]}  {transaction.dateTimeTransaction.split('T')[1].split('Z')[0]}</td>
                              </tr>
                            })
                          )}

                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

        </Container>
      </div>
    </React.Fragment>
  );
};

XogtaMacaamiilka.propTypes = {
  userProfile: PropTypes.any,
  onGetUserProfile: PropTypes.func,
};

const mapStateToProps = ({ contacts }) => ({
  userProfile: contacts.userProfile,
});

const mapDispatchToProps = dispatch => ({
  onGetUserProfile: () => dispatch(getUserProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(XogtaMacaamiilka));
