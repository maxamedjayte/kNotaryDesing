import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";


import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "store/actions";



//redux
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  Breadcrumb,
  Spinner,
} from "reactstrap";
import DeleteModal from "components/Common/DeleteModal";
import TableContainer from "components/Common/TableContainer";
import { createMacaamiilInfo, httpFetcher, updateMacaamiilInfo } from "pages/services/fetchingData";
import useSWR from 'swr';
import { ShimmerTitle } from "react-shimmer-effects";

function XogtaDiiwaangalintaMacamiisha() {

  //meta title
  document.title = "Xogta Macaamiisha | kNotary - React Admin & Dashboard";
  const { data: clientsUsers, error: clientsUsersError } = useSWR(`/api/client-list/`, httpFetcher);

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [macaamiilFormData, setMacaamiilFormData] = useState();

  const [macamiil, setMacaamiil] = useState(null);
  const FullName = (cell) => {
    return (


      <Link to={`/xogta-macaamiilka/${cell.row.original.id}/`} >
        <div className="d-flex">

          <div className="align-self-center me-3">
            <img
              src={`https://knotary.up.railway.app/${cell.row.original.image}`}
              className="rounded-circle avatar-xs"
              alt=""
            />
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-14 mb-1">
              {cell.value}
            </h5>
            <p className="text-truncate mb-0">
              {cell.row.original.number}
            </p>
          </div>
          {/* <div className="font-size-11">
            "{chat.time}"
        </div> */}
        </div>
      </Link>
    );
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (macamiil && macamiil.id) || '',
      name: (macamiil && macamiil.name) || '',
      image: (macamiil && macamiil.image) || '',
      number: (macamiil && macamiil.number) || '',
      number2: (macamiil && macamiil.number2) || '',
      gender: (macamiil && macamiil.gender) || 'Lab',
      dateOfBirth: (macamiil && macamiil.dateOfBirth) || '',
      balance: (macamiil && macamiil.balance) || '',
      dateTimeRegistred: (macamiil && macamiil.dateTimeRegistred) || '',
      typeOfMoney: (macamiil && macamiil.typeOfMoney) || 'N/A',
    },
    validationSchema: Yup.object({
      id: Yup.string(),
      name: Yup.string().required("Fadlan Soo Gali Magaca"),
      image: Yup.string(),
      number: Yup.number().required("Fadlan Soo Gali Number"),
      number2: Yup.number(),
      dateOfBirth: Yup.string().required("Soo Gali tarikhda dhalashada"),
      balance: Yup.string().required("Haraaga Amount"),
      dateTimeRegistred: Yup.string(),
      gender: Yup.string().required("Dooro Jinsiga"),
      typeOfMoney: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: async (values) => {
      let response;
      setFormIsLoading(true);
      if (isEdit) {
        // const updateOrder = {
        //   id: values.id,
        //   name: values.name,
        //   image: values.image,
        //   number: values.number,
        //   number2: values.number2,
        //   dateOfBirth: values.dateOfBirth,
        //   balance: values.balance,
        //   dateTimeRegistred: values.dateTimeRegistred,
        //   typeOfMoney: values.typeOfMoney,
        //   gender: values.gender,
        // };
        // console.log("updateOrder", updateOrder);
        for (const [key, value] of macaamiilFormData) {
          if (key == 'image') {
            if (value.name == '') {
              macaamiilFormData.delete("image")
            }
          }
        }
        // update macamiil
        response = await updateMacaamiilInfo(macaamiilFormData, values.id);
        setFormIsLoading(false)
        // dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {

        response = await createMacaamiilInfo(macaamiilFormData)
        setFormIsLoading(false)
        console.log(response)
        // dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }

      toggle();
    },
  });


  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();




  const toggle = () => {
    if (modal) {
      setModal(false);
      setMacaamiil(null);
    } else {
      setModal(true);
    }
  };

  const handleOrderClick = arg => {
    const macamiilArg = arg;
    setMacaamiil({
      id: macamiilArg.id,
      name: macamiilArg.name,
      number: macamiilArg.number,
      number2: macamiilArg.number2,
      gender: macamiilArg.gender,
      dateOfBirth: macamiilArg.dateOfBirth,
      balance: macamiilArg.balance,
      dateTimeRegistred: macamiilArg.dateTimeRegistred,
      typeOfMoney: macamiilArg.typeOfMoney,
    });
    setIsEdit(true);

    toggle();
  };

  //delete macamiil
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (macamiil) => {
    setMacaamiil(macamiil);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (macamiil.id) {
      dispatch(onDeleteOrder(macamiil));
      setDeleteModal(false);
    }
  };
  const handleMacaamiilCreateClicks = () => {
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [

      {
        Header: 'ID',
        accessor: 'id',
        width: "10px",
        disableFilters: true,
        Cell: (cellProps) => {
          return <strong> {cellProps.value ? cellProps.value : ''}</strong>;
        }
      },
      {
        Header: 'Magaca Shaqsiga',
        accessor: 'name',
        filterable: true,
        Cell: (cellProps) => {
          return  <FullName {...cellProps} />
           
        }
      },
      {
        Header: 'Jinsiga',
        accessor: 'gender',
        filterable: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : '';
        }
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        filterable: true,
        Cell: (cellProps) => {
          return <strong> $ {cellProps.value ? cellProps.value : ''}</strong>
        }
      },
      {
        Header: 'Ladiiwaangaliyay',
        accessor: 'dateTimeRegistred',
        filterable: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value.split('T')[0] : '';
        }
      },
      {
        Header: 'Nuuca-Lacagta',
        disableFilters: true,
        accessor: 'typeOfMoney',
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : '';
        }
      },

      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/xogta-macaamiilka/${cellProps.row.original.id}/`}
                className="text-info"

              >
                <i className="mdi mdi-eye font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  View
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const macamiilData = cellProps.row.original;
                  handleOrderClick(macamiilData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const macamiilData = cellProps.row.original;
                  onClickDelete(macamiilData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        }
      },
    ],
    []
  );

  return (
    <React.Fragment>
      {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumb title="K-NOTARY" breadcrumbItem="XOGTA-BOOSASKA" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {clientsUsers ? (<TableContainer
                    columns={columns}
                    data={clientsUsers}
                    isGlobalFilter={true}
                    isAddOptions={true}
                    handleMacaamiilCreateClicks={handleMacaamiilCreateClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />) : <ShimmerTitle line={6} gap={10} variant="primary" />}

                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Wax-ka badal macaamiil" : "Diiwaangali Macaamiil"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMacaamiilFormData(new FormData(e.target))
                  validation.handleSubmit(e);
                  return false;
                }}
              >
                <Row form>
                  <Input
                    name="id"
                    hidden={true}
                    onChange={validation.handleChange}
                    value={validation.values.id || ""}

                  />
                  <Col className="col-6">
                    <div className="mb-2">
                      <Label className="form-label">Sawirka</Label>
                      <Input
                        name="image"
                        type="file"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.image || ""}

                      />

                    </div>
                    <div className="mb-2">
                      <Label className="form-label">Full-Name</Label>
                      <Input
                        name="name"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name ? true : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <Label className="form-label">Number</Label>
                      <Input
                        name="number"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.number || ""}
                        invalid={
                          validation.touched.number && validation.errors.number ? true : false
                        }
                      />
                      {validation.touched.number && validation.errors.number ? (
                        <FormFeedback type="invalid">{validation.errors.number}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Number2</Label>
                      <Input
                        name="number2"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.number2 || ""}
                        invalid={
                          validation.touched.number2 && validation.errors.number2 ? true : false
                        }
                      />
                      {validation.touched.number2 && validation.errors.number2 ? (
                        <FormFeedback type="invalid">{validation.errors.number2}</FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col col={6}>                    <div className="mb-3">
                    <Label className="form-label">Tariikhda Dhalashada</Label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      // value={macamiilList.dateOfBirth || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.dateOfBirth || ""}
                      invalid={
                        validation.touched.dateOfBirth && validation.errors.dateOfBirth ? true : false
                      }
                    />
                    {validation.touched.dateOfBirth && validation.errors.dateOfBirth ? (
                      <FormFeedback type="invalid">{validation.errors.dateOfBirth}</FormFeedback>
                    ) : null}
                  </div>
                    <div className="mb-3">
                      <Label className="form-label">Lacagta Haraaga</Label>
                      <Input
                        name="balance"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.balance || ""}
                        invalid={
                          validation.touched.balance && validation.errors.balance ? true : false
                        }
                      />
                      {validation.touched.balance && validation.errors.balance ? (
                        <FormFeedback type="invalid">{validation.errors.balance}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Jinsiga Shaqsiga</Label>
                      <Input
                        name="gender"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.badgeclass || ""}
                      >
                        <option value="Lab">Lab</option>
                        <option value="Dhadig">Dhadig</option>
                      </Input>
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Nooca Lacagta</Label>
                      <Input
                        name="typeOfMoney"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.typeOfMoney || ""
                        }
                      >
                        <option>N/A</option>
                        <option>BY-ELECTRIC</option>
                        <option>CASH</option>
                      </Input>
                    </div>
                    <div className="mb-3">
                      <div className="text-end">
                        {formIsLoading ? (
                          <button
                            type="submit"
                            className="btn btn-success save-user"
                          >
                            <Spinner animation="border" variant="primary" />
                          </button>

                        ) : (
                          <button
                            type="submit"
                            className="btn btn-success save-user"
                          >
                            Save  c
                          </button>
                        )}

                      </div>
                    </div>
                  </Col>
                </Row>

              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}
XogtaDiiwaangalintaMacamiisha.propTypes = {
  preGlobalFilteredRows: PropTypes.any,

};


export default XogtaDiiwaangalintaMacamiisha;