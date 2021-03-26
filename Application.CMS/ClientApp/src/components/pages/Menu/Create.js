﻿import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { useForm, Controller } from "react-hook-form";
import { Modal } from 'antd';
const ModalForm = ({ isShowing, hide, data, onPostCreateItem }) => {
    const { register, handleSubmit, watch, errors, control } = useForm();
    const onSubmit = (data) => {
        var obj = {
            "ParentId": Number.parseInt(data.ParentId.value),
            "Name": data.Name,
            "Url": data.Url,
            "Ordering": Number.parseInt(data.Ordering),
            "isMenu": data.IsShowMenu,
            "Status": data.Status == true ? 1 : 0,
            "icon": data.icon
        }
        onPostCreateItem(obj)
    }

    return (
        ReactDOM.createPortal(

            <React.Fragment>

                <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                    onOk={handleSubmit(onSubmit)} style={{ top: 20 }} onCancel={hide}>
                    <form>
                        <div className="modal-body">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-md-3 text-right">
                                            <span>Danh mục cha</span>
                                        </label>
                                        <div className="col-md-9">
                                            <Controller
                                                autoFocus
                                                isSearchable={true}
                                                //isClearable={true}
                                                defaultValue={data[0]}
                                                as={Select}
                                                name='ParentId'
                                                options={data}
                                                control={control}
                                                rules={{ name: "ParentId" }, { required: true }}
                                            />
                                            {errors.ParentId && <span class="parsley-required">Giá trị là bắt buộc</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown-menu">
                                    <div className="form-outline mb-4">
                                        <input type="email" id="form2Example1" className="form-control" />
                                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="form2Example2" className="form-control" />
                                        <label className="form-label" htmlFor="form2Example2">Password</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-md-3 text-right">
                                            <span>Tên danh mục<span class="cred">(*)</span></span>
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
                                            <span>Icon</span>
                                        </label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="icon" name="icon" type="text" placeholder="Icon" ref={register()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-md-3 text-right">
                                            <span>Đường dẫn</span>
                                        </label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="Url" name="Url" type="text" placeholder="Nhập url" ref={register} />
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
                                        <label className="control-label col-md-3 text-right">&nbsp;</label>
                                        <div className="col-md-3">
                                            <div className="fancy-checkbox">
                                                <label><input type="checkbox" name="IsShowMenu" id="IsShowMenu" defaultChecked ref={register} /><span>Hiển thị menu</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label col-md-3 text-right">Trạng thái</label>
                                        <div className="col-md-3">
                                            <div className="fancy-checkbox">
                                                <label><input type="checkbox" name="Status" id="Status" ref={register} defaultChecked data-parsley-multiple="Status" /><span>Kích hoạt</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </Modal>

            </  React.Fragment>, document.body
        )
    )
}
export default ModalForm;
