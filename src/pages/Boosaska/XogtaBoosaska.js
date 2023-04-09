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

function XogtaBoosaska() {

  //meta title
  document.title="Xogta Boosaska | kNotary - React Admin & Dashboard";
  const { data: xogtaBoosaska, error: xogtaBoosaskaError } = useSWR(`/api/booska-list/`, httpFetcher);
  console.log(xogtaBoosaska)
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [order, setOrder] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || '',
      billingName: (order && order.billingName) || '',
      orderdate: (order && order.orderdate) || '',
      total: (order && order.total) || '',
      paymentStatus: (order && order.paymentStatus) || 'Paid',
      badgeclass: (order && order.badgeclass) || 'success',
      paymentMethod: (order && order.paymentMethod) || 'Mastercard',
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required("Please Enter Your Order Id"),
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      orderdate: Yup.string().required("Please Enter Your Order Date"),
      total: Yup.string().required("Total Amount"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateOrder = {
          id: order ? order.id : 0,
          orderId: values.orderId,
          billingName: values.billingName,
          orderdate: values.orderdate,
          total: values.total,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeclass: values.badgeclass,
        };
        console.log("updateOrder", updateOrder);
        // update order
        dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          orderId: values["orderId"],
          billingName: values["billingName"],
          orderdate: values["orderdate"],
          total: values["total"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
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
  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }));

  const UserInfoAvator = (cell) => {
    return (
      <Link to={`/xogta-macaamiilka/${cell.value.id}/`} >
        <div className="d-flex">

          <div className="align-self-center me-3">
            <img
              src={`https://knotary.up.railway.app/${cell.value.image}`}
              className="rounded-circle avatar-xs"
              alt=""
            />
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-14 mb-1">
              {cell.value.name}
            </h5>
            <p className="text-truncate mb-0 text-black">
              {cell.value.number}
            </p>
          </div>
          {/* <div className="font-size-11">
            "{chat.time}"
        </div> */}
        </div>
      </Link>
    );
  };



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
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
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
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [
      
      {
        Header: 'NootaayoReff',
        accessor: 'nootaayoReff',
        
        filterable: true,
        Cell: (cellProps) => {
          return <Link to="#" className="text-body fw-bold">{cellProps.value ? cellProps.value : ''}</Link>;
        }
      },
      {
        Header: 'Sawirka',
        accessor: 'image',
        
        filterable: true,
        Cell: (cellProps) => {
          return <Link to="#" className="text-body fw-bold">
            <img width="100px" src="https://res.cloudinary.com/dw6vcihvc/image/upload/v1/media/images/events/general_nrwpfm" />
            </Link>;
        }
      },
      {
        Header: 'Magaca Booska',
        accessor: 'magacaBooska',
        filterable: true,
        Cell: (cellProps) => {
          return <Link to="#" className="text-body fw-bold">{cellProps.value ? cellProps.value : ''}</Link>;
        }
      },
      {
        Header: 'Looto Num',
        accessor: 'lootoNum',
        filterable: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : '';
        }
      },
      {
        Header: 'Soone',
        accessor: 'soone',
        filterable: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : '';
        }
      },
      {
        Header: 'Yaa leh',
        accessor: 'whoHas',
        filterable: true,
        Cell: (cellProps) => {
          return <UserInfoAvator {...cellProps} />
        }
      },
      {
        Header: 'Marqaatiyaal',
        accessor: 'id',
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : '';
        }
      },
      {
        Header: 'Date Time',
        accessor: 'dateTime',
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value.split("T")[0] : '';
        }
      },
      
      {
        Header: 'View Details',
        accessor: 'viewd',
        disableFilters: true,
        Cell: () => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>);
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
                {xogtaBoosaska ? (<TableContainer
                    columns={columns}
                    data={xogtaBoosaska}
                    isGlobalFilter={true}
                    isAddOptions={true}
                    handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />) : null}
                 
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
                      <Label className="form-label">Order Id</Label>
                      <Input
                        name="orderId"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.orderId || ""}
                        invalid={
                          validation.touched.orderId && validation.errors.orderId ? true : false
                        }
                      />
                      {validation.touched.orderId && validation.errors.orderId ? (
                        <FormFeedback type="invalid">{validation.errors.orderId}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Billing Name</Label>
                      <Input
                        name="billingName"
                        type="text"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.billingName || ""}
                        invalid={
                          validation.touched.billingName && validation.errors.billingName ? true : false
                        }
                      />
                      {validation.touched.billingName && validation.errors.billingName ? (
                        <FormFeedback type="invalid">{validation.errors.billingName}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Order Date</Label>
                      <Input
                        name="orderdate"
                        type="date"
                        // value={orderList.orderdate || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.orderdate || ""}
                        invalid={
                          validation.touched.orderdate && validation.errors.orderdate ? true : false
                        }
                      />
                      {validation.touched.orderdate && validation.errors.orderdate ? (
                        <FormFeedback type="invalid">{validation.errors.orderdate}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Total</Label>
                      <Input
                        name="total"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.total || ""}
                        invalid={
                          validation.touched.total && validation.errors.total ? true : false
                        }
                      />
                      {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">{validation.errors.total}</FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Total</Label>
                      <Input
                        name="paymentStatus"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.paymentStatus || ""
                        }
                      >
                        <option>Paid</option>
                        <option>Chargeback</option>
                        <option>Refund</option>
                      </Input>
                      {validation.touched.paymentStatus && validation.errors.paymentStatus ? (
                        <FormFeedback type="invalid">{validation.errors.paymentStatus}</FormFeedback>
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
                        name="paymentMethod"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.paymentMethod || ""
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
XogtaBoosaska.propTypes = {
  preGlobalFilteredRows: PropTypes.any,

};


export default XogtaBoosaska;