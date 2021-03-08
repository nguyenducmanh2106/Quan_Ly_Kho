﻿import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { PageLoading } from './../../elements/index'
import { useForm, Controller } from "react-hook-form";
import { postAPI } from './../../../utils/helpers';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import 'react-toastify/dist/ReactToastify.css';
const Modal = ({ isShowing, hide, data, onPostCreateItem }) => {
    const { register, handleSubmit, watch, errors, control } = useForm();
    const { addToast } = useToasts();
    const onSubmit=(data)=> {
        var obj = {
            "Name": data.Name,
            "Ordering": Number.parseInt(data.Ordering),
            "Code": data.Code,
            "Status": data.Status == true ? 1 : 0
        }
        onPostCreateItem(obj)
    }

    return (
        <>

            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <div className="modal fade show" id="modal-lg" style={{ display: isShowing ? "block" : "none" }} >
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Tạo Mới</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hide}>
                                            <span aria-hidden="true">X</span>
                                        </button>
                                    </div>
                                    
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className="modal-body">
                                            <div className="form-horizontal">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">
                                                            <span>Tên chức vụ</span>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input className={`form-control ${errors.Name ? "is-invalid" : ""
                                                                }`} id="Name" name="Name" type="text" placeholder="Nhập tên" ref={register({ required: true })} />
                                                            {errors.Name && <span class="parsley-required">Giá trị là bắt buộc</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">
                                                            <span>Mã chức vụ</span>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input className="form-control" id="Code" name="Code" type="text" placeholder="Mã chức vụ" ref={register()} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">
                                                            <span>Thứ tự</span>
                                                        </label>
                                                        <div className="col-md-3">
                                                            <input defaultValue={0} min={0} className="form-control" data-val="true"
                                                                ref={register} id="Ordering" name="Ordering" type="number" />
                                                            <p className="parsley-required">{errors.Ordering?.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">Trạng thái</label>
                                                        <div className="col-md-3">
                                                            <div className="fancy-checkbox">
                                                                <label><input type="checkbox" name="Status" id="Status"  ref={register} defaultChecked data-parsley-multiple="Status" /><span>Kích hoạt</span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary btn-sm"> Lưu</button>
                                            <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" onClick={hide}>Đóng</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </  React.Fragment>, document.body
                ) : null
            }
        </>
    )
}
export default Modal;