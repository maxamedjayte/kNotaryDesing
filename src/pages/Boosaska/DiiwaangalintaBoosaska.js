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
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import Select from "react-select";
//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { httpFetcher } from "pages/services/fetchingData";
import useSWR from 'swr';

const DiiwaangalintaBooska = () => {
  const [whereComes, setWhereComes] = useState([]);
  const [witness, setWitness] = useState([]);
  const { data: clientsUsers, error: clientsUsersError } = useSWR(`/api/client-list/`, httpFetcher);


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    onChange: (data) => {
      console.log(data)
    },
    initialValues: {
      nootaayoReff: '',
      magacaBooska: '',
      lootoNum: '',
      soone: '',
      whereComes: '',
      price: '',
      witnesses: witness,
      dateTime: '',
      description: '',
    },
    validationSchema: Yup.object({
      nootaayoReff: Yup.string().required("Soo Gali nootaayoref"),
      magacaBooska: Yup.string().required("Soo gali magaca booska"),
      lootoNum: Yup.string().required("Soo gali looto Num"),
      soone: Yup.string().required("Soo gali Soonaha Booska"),
      whereComes: Yup.string().required("Dooro Laga iibiyaha"),
      price: Yup.number().required("Soo Gali qiimaha"),
      witnesses: Yup.string().required("Dooro Yaa laga iib-shay"),
      description: Yup.string().required("Soo gali faahfaahin"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    }
  });



  const regExp = /\b\d{5}\b/;

  useEffect(() => {
    const whereComesArry = []
    const witnessesArry = []

    
    if(clientsUsers){
      clientsUsers.map((user) => {
       whereComesArry.push({ value: user.id, label: user.name });
       witnessesArry.push({ value: user.id, label: user.name });
    });
    }

    
    setWhereComes(whereComesArry)
    setWitness(witnessesArry)

  }, [clientsUsers])
  function handleSubmit(e) {
    e.preventDefault();

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
            <Col xl="8">
              <Card>
                <CardBody>
                  <h4 className="card-title">Soo Gali Xogta Booska</h4>
                  <p className="card-title-desc">
                    Provide valuable, actionable feedback to your users with
                    HTML5 form validation–available in all our supported
                    browsers.
                  </p>
                  <Form className="needs-validation"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Nootaayo Reff</Label>
                          <Input
                            name="nootaayoReff"
                            placeholder="Nootaayo Reff"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.nootaayoReff || ""}
                            invalid={
                              validation.touched.nootaayoReff && validation.errors.nootaayoReff ? true : false
                            }
                          />
                          {validation.touched.nootaayoReff && validation.errors.nootaayoReff ? (
                            <FormFeedback type="invalid">{validation.errors.firstname}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Magaca Booska</Label>
                          <Input
                            name="magacaBooska"
                            placeholder="Magaca Booska"
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.magacaBooska || ""}
                            invalid={
                              validation.touched.magacaBooska && validation.errors.magacaBooska ? true : false
                            }
                          />
                          {validation.touched.magacaBooska && validation.errors.magacaBooska ? (
                            <FormFeedback type="invalid">{validation.errors.magacaBooska}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom03">Looto Number</Label>
                          <Input
                            name="lootoNum"
                            placeholder="Looto Number"
                            type="text"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lootoNum || ""}
                            invalid={
                              validation.touched.lootoNum && validation.errors.lootoNum ? true : false
                            }
                          />
                          {validation.touched.lootoNum && validation.errors.lootoNum ? (
                            <FormFeedback type="invalid">{validation.errors.lootoNum}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom04">soone</Label>
                          <Input
                            name="soone"
                            placeholder="soone"
                            type="text"
                            className="form-control"
                            id="validationCustom04"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.soone || ""}
                            invalid={
                              validation.touched.soone && validation.errors.soone ? true : false
                            }
                          />
                          {validation.touched.soone && validation.errors.soone ? (
                            <FormFeedback type="invalid">{validation.errors.soone}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom05">Qiimaha</Label>
                          <InputGroup>
                            <div className="input-group-text">$</div>
                            <Input
                              className="form-control"
                              id="autoSizingInputGroup"
                              name="price"
                              placeholder="Qiimaha Booska"
                              type="number"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.price || ""}
                              invalid={
                                validation.touched.price && validation.errors.price ? true : false
                              }
                            />
                          </InputGroup>

                          {validation.touched.price && validation.errors.price ? (
                            <FormFeedback type="invalid">{validation.errors.price}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Yaa Laga IIBSHAY</Label>
                          <Select
                            placeholder="Laga IIBSHAY"
                            type="text"
                            id="validationCustom01"
                            options={whereComes}
                            classNamePrefix="select2-selection"
                            onChange={value => validation.setFieldValue("whereComes", value.value)}
                            onBlur={validation.handleBlur}
                            value={validation.values.whereComes || ""}
                            invalid={
                              validation.touched.whereComes && validation.errors.whereComes ? true : false
                            }
                          />

                          {validation.touched.whereComes && validation.errors.whereComes ? (
                            <FormFeedback type="invalid">{validation.errors.whereComes}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Marqaatiyaal</Label>
                          <Select
                            placeholder="Magaca Booska"
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            options={witness}
                            onChange={value => validation.setFieldValue("witnesses", value.value)}
                            // onBlur={validation.handleBlur}
                            value={validation.values.witnesses || ""}
                            invalid={
                              validation.touched.witnesses && validation.errors.witnesses ? true : false
                            }
                          />
                          {validation.touched.witnesses && validation.errors.witnesses ? (
                            <FormFeedback type="invalid">{validation.errors.witnesses}</FormFeedback>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="12">

                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom05">Faahfaahin</Label>


                          <Input
                            type="textarea"
                            id="textarea"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.description || ""}
                            maxLength="225"
                            rows="3"
                            placeholder="This textarea has a limit of 225 chars."
                          />
                          {validation.touched.description && validation.errors.description ? (
                            <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                          ) : null}
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


          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(DiiwaangalintaBooska);
