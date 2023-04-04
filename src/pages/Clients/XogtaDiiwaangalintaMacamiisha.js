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
} from "reactstrap";
import DeleteModal from "components/Common/DeleteModal";
import TableContainer from "components/Common/TableContainer";
import { httpFetcher } from "pages/services/fetchingData";
import useSWR from 'swr';

function XogtaDiiwaangalintaMacamiisha() {

  //meta title
  document.title="Xogta Macaamiisha | kNotary - React Admin & Dashboard";
  const { data: clientsUsers, error: clientsUsersError } = useSWR(`/api/client-list/`, httpFetcher);

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState(null);
  const FullName = (cell) => {
    return (
    <Link to="#" >
    <div className="d-flex">

        <div className="align-self-center me-3">
            <img
                src={`http://127.0.0.1:8000${cell.row.original.image}`}
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
      id: (order && order.id) || '',
      name: (order && order.name) || '',
      dateOfBirth: (order && order.dateOfBirth) || '',
      balance: (order && order.balance) || '',
      dateTimeRegistred: (order && order.dateTimeRegistred) || 'Paid',
      badgeclass: (order && order.badgeclass) || 'success',
      typeOfMoney: (order && order.typeOfMoney) || 'Mastercard',
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Please Enter Your Order Id"),
      name: Yup.string().required("Fadlan Soo Gali Magaca"),
      dateOfBirth: Yup.string().required("Please Enter Your Order Date"),
      balance: Yup.string().required("Total Amount"),
      dateTimeRegistred: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      typeOfMoney: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateOrder = {
          id: values.id,
          name: values.name,
          dateOfBirth: values.dateOfBirth,
          balance: values.balance,
          dateTimeRegistred: values.dateTimeRegistred,
          typeOfMoney: values.typeOfMoney,
          badgeclass: values.badgeclass,
        };
        console.log("updateOrder", updateOrder);
        // update order
        dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          id: values["id"],
          name: values["name"],
          dateOfBirth: values["dateOfBirth"],
          balance: values["balance"],
          dateTimeRegistred: values["dateTimeRegistred"],
          typeOfMoney: values["typeOfMoney"],
          badgeclass: values["badgeclass"],
        };
        console.log("newOrder", newOrder);
        // save new order
        dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
  });


  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();



  useEffect(() => {
    
  }, [clientsUsers]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const handleOrderClick = arg => {
    const order = arg;
    setOrder({
      id: order.id,
      id: order.id,
      name: order.name,
      dateOfBirth: order.dateOfBirth,
      balance: order.balance,
      dateTimeRegistred: order.dateTimeRegistred,
      typeOfMoney: order.typeOfMoney,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);

    toggle();
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (order) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(onDeleteOrder(order));
      setDeleteModal(false);
    }
  };
  const handleOrderClicks = () => {
    setOrderList("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [

      {
        Header: 'ID',
        accessor: 'id',
        width:"10px",
        disableFilters:true,
        Cell: (cellProps) => {
          return <strong> {cellProps.value ? cellProps.value : ''}</strong>;
        }
      },
      {
        Header: 'Magaca Shaqsiga',
        accessor: 'name',
        filterable: true,
        Cell: (cellProps) => {
          return <FullName {...cellProps}   />
        }
      },
      {
        Header: 'Da\'da',
        accessor: 'dateOfBirth',
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
          return cellProps.value ? cellProps.value : '';
        }
      },
      {
        Header: 'Nuuca-Lacagta',
        disableFilters:true,
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
                onClick={() => {
                  const orderData = cellProps.row.original;
                  handleOrderClick(orderData);
                }}
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
                  const orderData = cellProps.row.original;
                  handleOrderClick(orderData);
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
                  const orderData = cellProps.row.original;
                  onClickDelete(orderData);
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
                    handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />):null}
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Order" : "Add Order"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row form>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Id</Label>
                      <Input
                        name="id"
                        type="text"
                        disabled
                        onBlur={validation.handleBlur}
                        value={validation.values.id || ""}
                        invalid={
                          validation.touched.id && validation.errors.id ? true : false
                        }
                      />
                      {validation.touched.id && validation.errors.id ? (
                        <FormFeedback type="invalid">{validation.errors.id}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Billing Name</Label>
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
                    <div className="mb-3">
                      <Label className="form-label">Order Date</Label>
                      <Input
                        name="dateOfBirth"
                        type="date"
                        // value={orderList.dateOfBirth || ""}
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
                      <Label className="form-label">Total</Label>
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
                      <Label className="form-label">Total</Label>
                      <Input
                        name="dateTimeRegistred"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.dateTimeRegistred || ""
                        }
                      >
                        <option>Paid</option>
                        <option>Chargeback</option>
                        <option>Refund</option>
                      </Input>
                      {validation.touched.dateTimeRegistred && validation.errors.dateTimeRegistred ? (
                        <FormFeedback type="invalid">{validation.errors.dateTimeRegistred}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Badge Class</Label>
                      <Input
                        name="badgeclass"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.badgeclass || ""}
                      >
                        <option>success</option>
                        <option>danger</option>
                        <option>warning</option>
                      </Input>
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Payment Method</Label>
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
                        <option>Mastercard</option>
                        <option>Visa</option>
                        <option>Paypal</option>
                        <option>COD</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
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