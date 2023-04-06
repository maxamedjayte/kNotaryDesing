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
import { createBoss, httpFetcher } from "pages/services/fetchingData";
import useSWR from 'swr';

const DiiwaangalintaBooska = () => {
  const [whereComes, setWhereComes] = useState([]);
  const [whoHasses, setWhoHasses] = useState([]);
  const [witness, setWitness] = useState([]);
  const [booskaFormData, setBooskaFormData] = useState({});
  const { data: clientsUsers, error: clientsUsersError } = useSWR(`/api/client-list/`, httpFetcher);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setBooskaFormData((prev) => ({ ...prev, [name]: value }));
  };
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
      whereComes: Yup.object().shape({ id: Yup.string().required("Dooro Laga iibiyaha"), }),
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


    if (clientsUsers) {
      clientsUsers.map((user) => {
        whereComesArry.push({ value: user.id, label: user.name });
      });
    }


    setWhereComes(whereComesArry)
    setWitness(whereComesArry)
    setWhoHasses(whereComesArry)

  }, [clientsUsers])
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      
    let response= await createBoss(formData);
    console.log(response);

    if(response.status="success"){
      
      toastr.success('lama diiwaangalin fadlan ku celi markale')
      // toastr.warning("lama diiwaangalin fadlan ku celi markale")
      setBooskaFormData({})
      
    }else{
      // setBooskaFormData({})
    }
    } catch (error) {
      console.log(error);
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
            <Col xl="8">
              <Card>
                <CardBody>
                  <h4 className="card-title">Soo Gali Xogta Booska</h4>
                  <p className="card-title-desc">
                    Provide valuable, actionable feedback to your users with.
                  </p>
                  <Form className="needs-validation" onSubmit={handleSubmit}  >
                    <Row>
                      <Col md={4}  >
                      <Card>
                        sd
                      </Card>
                      </Col>
                      <Col md={8}  >
                      <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Dooro Sawirka</Label>
                          <Input
                            name="image"
                            placeholder="Sawirka Booska"
                            type="file"
                            className="form-control"
                            id="validationCustom01"
                            onChange={handleChange}
                            value={booskaFormData.image || ""}

                          />

                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Nootaayo Reff</Label>
                          <Input
                            name="nootaayoReff"
                            placeholder="Nootaayo Reff"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            onChange={handleChange}
                            value={booskaFormData.nootaayoReff || ""}

                          />

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
                            onChange={handleChange}
                            required
                            value={booskaFormData.magacaBooska}

                          />

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
                            required
                            className="form-control"
                            onChange={handleChange}
                            value={booskaFormData.lootoNum }

                          />

                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom04">soone</Label>
                          <Input
                            name="soone"
                            placeholder="soone"
                            type="text"
                            required
                            className="form-control"
                            id="validationCustom04"
                            onChange={handleChange}
                            value={booskaFormData.soone}

                          />

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
                              onChange={handleChange}
                              value={booskaFormData.price}

                            />
                          </InputGroup>


                        </FormGroup>
                      </Col>
                     
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Yaa Laga IIBSHAY</Label>
                          <Select
                            placeholder="Laga IIBSHAY"
                            name="whereComes"
                            id="validationCustom01"
                            options={whereComes}
                            classNamePrefix="select2-selection"
                            onChange={value => setBooskaFormData((prev) => ({ ...prev, ["whereComes"]: value.value })) }
                            value={whereComes?.find(vl => {return booskaFormData.whereComes == vl.value })}
                            required
                          />

                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-2">
                          <Label htmlFor="validationCustom02">Marqaatiyaal</Label>
                          <Select
                            placeholder="Door Marqaatiyaasha"
                            name="witnesses"
                            className="form-control"
                            id="validationCustom02"
                            options={witness}
                            isMulti
                            required
                            onChange={value => setBooskaFormData((prev) => ({ ...prev, ["witnesses"]: value.value }))}
                            // onBlur={validation.handleBlur}
                            value={witness?.find(vl =>  booskaFormData.witnesses == vl.value )}

                          />

                        </FormGroup>
                      </Col>
                      
                      <Col md="12">
                        <FormGroup className="mb-2">
                          <Label htmlFor="validationCustom01">Yaa iska-leh</Label>
                          <Select
                            placeholder="Laga IIBSHAY"
                            name="whoHas"
                            id="validationCustom01"
                            options={whoHasses}
                            classNamePrefix="select2-selection"
                            onChange={value => setBooskaFormData((prev) => ({ ...prev, ["whoHas"]: value.value }))}
                            value={whoHasses?.find(vl => { return booskaFormData.whoHas == vl.value })}
                            required
                          />

                        </FormGroup>
                      </Col>
                      <Col md="4">

                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom05">Waqtiga La'iibiyay</Label>
                          <Input
                            type="datetime-local"
                            name="dateTime"
                            onChange={handleChange}
                            value={booskaFormData.dateTime}
                            required
                          />

                        </FormGroup>
                      </Col>
                      <Col md="8">

                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom05">Faahfaahin</Label>
                          <Input
                            type="textarea"
                            id="textarea"
                            name="description"
                            onChange={handleChange}
                            value={booskaFormData.description || ""}
                            maxLength="225"
                            rows="3"
                            required
                            placeholder="This textarea has a limit of 225 chars."
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


          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(DiiwaangalintaBooska);
