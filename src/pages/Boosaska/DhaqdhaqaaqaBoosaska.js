import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  FormGroup,
  CardTitle,
  CardSubtitle,
  InputGroup,
  Table,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import Select from "react-select";
//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { createBooskaChanges, createBoss, httpFetcher } from "pages/services/fetchingData";
import useSWR from 'swr';

const DhaqdhaqaaqaBoosaska = () => {
  const [booskaska, setBooskaska] = useState([]);
  const [whoHasses, setWhoHasses] = useState([]);
  const [witness, setWitness] = useState([]);
  const [booskaFormData, setBooskaFormData] = useState({});
  const { data: booskaskaData, error: booskaskaError } = useSWR(`/api/booska-list/`, httpFetcher);
  const { data: booskaChangesData, error: booskaChangesError } = useSWR(`/api/booskaChanges-list/`, httpFetcher);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setBooskaFormData((prev) => ({ ...prev, [name]: value }));
    setBooskaFormData((prev) => ({ ...prev, ["oldPrice"]: booskaskaData?.find(vl => { return booskaFormData.booska == vl.id; }).price }));
  };


  const regExp = /\b\d{5}\b/;

  useEffect(() => {
    const booskaskaArray = []


    if (booskaskaData) {
      booskaskaData.map((booska) => {
        booskaskaArray.push({ value: booska.id, label: <strong>{booska.nootaayoReff.toUpperCase() + ' - ' + booska.magacaBooska}</strong> });
      });
    }


    setBooskaska(booskaskaArray)

  }, [booskaskaData])
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("oldPrice", booskaskaData?.find(vl => { return booskaFormData.booska == vl.id; }).price)
    try {

      let response = await createBooskaChanges(formData);
      console.log (response)
      if (response.status = "success") {
        setBooskaFormData({})

        // mutate(`/api/booskaChanges-list/`, httpFetcher)
        location.reload()

      } else {
        // setBooskaFormData({})
      }
    } catch (error) {
      // toastr.success('lama diiwaangalin fadlan ku celi markale')

    }

    // if(response.)


  }

  //for change tooltip display propery


  //meta title
  document.title = "Diiwaangalinta Boosaska | kNotary React Admin & Dashboard";

  const dispatch = useDispatch();



  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {

  }, [dispatch, success]);



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="K-NOTARY" breadcrumbItem="DIIWAANGALINTA-BOOSASKA" />
          <Row>
            <Col xl="4">
              <Card>
                <CardBody>
                  <h4 className="card-title">Soo Gali Xogta Booska</h4>
                  <p className="card-title-desc">
                    Provide valuable, actionable feedback to your users with.
                  </p>
                  <Form className="needs-validation" onSubmit={handleSubmit}  >
                    <Row>
                      <Col md="12">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Dooro Booska</Label>
                          <Select
                            placeholder="Boosaska Diiwaangashay"
                            name="booska"
                            id="validationCustom01"
                            options={booskaska}
                            classNamePrefix="select2-selection"
                            onChange={value => { setBooskaFormData((prev) => ({ ...prev, ["booska"]: value.value })); }}
                            value={booskaska?.find(vl => { return booskaFormData.booska == vl.value })}
                            required
                          />

                        </FormGroup>
                      </Col>
                      {/* booskaska?.find(selectedBos =>booskaskaData.filter((theBoss)=>theBoss.id==selectedBos.value))  */}
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Qiimaha Hore</Label>
                          <InputGroup>
                            <div className="input-group-text">$</div>
                            <Input
                              name="oldPrice"
                              type="number"
                              disabled
                              className="form-control"
                              id="validationCustom02"
                              onChange={handleChange}
                              required
                              value={booskaskaData?.find(vl => { return booskaFormData.booska == vl.id; })?.price || 0}

                            />
                          </InputGroup>

                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Qiimaha Cusub</Label>
                          <InputGroup>
                            <div className="input-group-text">$</div>
                            <Input
                              name="newPrice"
                              placeholder="Qiimaha Cusub"
                              type="number"
                              className="form-control"
                              id="validationCustom02"
                              onChange={handleChange}
                              required
                              value={booskaFormData.newPrice}
                            />
                          </InputGroup>

                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Dooro Booska</Label>
                          <Input
                            placeholder="Waqtiga Is badalka"
                            name="dateTimeChanged"
                            type="datetime-local"
                            id="validationCustom01"
                            classNamePrefix="select2-selection"
                            onChange={handleChange}
                            value={booskaFormData.dateTimeChanged}
                            required
                          />

                        </FormGroup>
                      </Col>
                    </Row>



                    <Button color="primary" type="submit">
                      Submit form
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col xl="8">
              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>XAALADA</th>
                      <th>BOOSKA</th>
                      <th>Qiimaha Hore</th>
                      <th>Qiimaha Danbe</th>
                      <th>DateTime-Changed</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booskaChangesData?.length == 0 ? (


                      <center>
                        <tr></tr>
                        <h6>boos uma diiwaan gashna</h6>
                      </center>

                    ) : (
                      booskaChangesData?.map((changes, index) => {
                        return <tr key={index}>
                          <th scope="row">{changes.id}</th>
                          <td>{changes.oldPrice < changes.newPrice ? (<Badge style={{ 'backgroundColor': 'green' }} bg="success">KACAY</Badge>) : (<Badge bg="warning">DAGAY</Badge>)}</td>
                          <td>
                            <Link to={`/xogta-booska/${changes.booska.id}/`} >
                              <div className="d-flex">

                                <div className="align-self-center me-3">
                                  <img
                                    src={`https://knotary.up.railway.app/${changes.booska.image}`}
                                    className="rounded-circle avatar-xs"
                                    alt=""
                                  />
                                </div>

                                <div className="flex-grow-1 overflow-hidden">
                                  <h5 className="text-truncate fw-bold font-size-14 mb-0">
                                    {changes.booska.magacaBooska}
                                  </h5>
                                  <p style={{ 'fontSize': "10px" }} className="text-truncate mb-0 text-black">
                                    {changes.booska.nootaayoReff}
                                  </p>
                                </div>
                                {/* <div className="font-size-11">
                                  "{chat.time}"
                                </div> */}
                              </div>
                            </Link>
                          </td>
                          <td><span style={{ 'fontSize': '13px' }} >$</span><strong>{changes.oldPrice}</strong> </td>
                          <td><span style={{ 'fontSize': '13px' }} >$</span><strong>{changes.newPrice}</strong> </td>
                          <td>{changes.dateTimeChanged.split('T')[0]}  {changes.dateTimeChanged.split('T')[1].split('Z')[0]}</td>
                          <td>
                            <div className="d-flex gap-3">
                              
                              
                              <Link
                                to="#"
                                className="text-danger"
                                onClick={() => {
                                  const macamiilData = cellProps.row.original;
                                  // onClickDelete(macamiilData);
                                }}
                              >
                                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                                <UncontrolledTooltip placement="top" target="deletetooltip">
                                  Delete
                                </UncontrolledTooltip>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      })
                    )}

                  </tbody>
                </Table>
              </div>
            </Col>


          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(DhaqdhaqaaqaBoosaska);
