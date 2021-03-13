import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { PageLoading } from './../../elements/index'
import { useForm, Controller } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
const ModelUpdate = ({ isShowing, hide, data, item, onPostUpdateItem }) => {
    const { register, handleSubmit, watch, errors, control } = useForm();
    const getDefaultOption = (data, item) => {
        var itemDefault = data ? data[0] : {};
          itemDefault=data.find(value => 
              value.value === item.parentId
        ) 
        return itemDefault
    }
    const  onSubmit=(data)=> {
        var obj = {
            "Id": item.id,
            "ParentId": Number.parseInt(data.ParentId.value),
            "Name": data.Name,
            "Ordering": Number.parseInt(data.Ordering),
            "Status": data.Status == true ? 1 : 0,
            "Code":data.Code
        }
        onPostUpdateItem(obj);

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
                                        <h4 className="modal-title">Cập nhật</h4>
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
                                                            <span>Danh mục cha</span>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <Controller
                                                                autoFocus
                                                                isSearchable={true}
                                                                //isClearable={true}
                                                                defaultValue={getDefaultOption(data, item)}
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
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">
                                                            <span>Tên đơn vị</span>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input className={`form-control ${errors.Name ? "is-invalid" : ""
                                                                }`} id="Name" name="Name" type="text" placeholder="Nhập tên" ref={register({ required: true })} defaultValue={item?.name} />
                                                            {errors.Name && <span class="parsley-required">Giá trị là bắt buộc</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">
                                                            <span>Mã đơn vị</span>
                                                        </label>
                                                        <div className="col-md-9">
                                                            <input className="form-control" id="Code" name="Code" type="text" placeholder="Nhập mã đơn vị" ref={register({required:true})} defaultValue={item?.code} />
                                                            {errors.Code && <span class="parsley-required">Giá trị là bắt buộc</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">
                                                            <span>Thứ tự</span>
                                                        </label>
                                                        <div className="col-md-3">
                                                            <input defaultValue={item?.ordering} min={0} className="form-control" data-val="true"
                                                                ref={register({
                                                                    min: {
                                                                        value: 0,
                                                                        message: "Giá trị tối thiểu"
                                                                    }
                                                                })} id="Ordering" name="Ordering" type="number" />
                                                            <p className="parsley-required">{errors.Ordering?.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <label className="control-label col-md-3 text-right">Trạng thái</label>
                                                        <div className="col-md-3">
                                                            <div className="fancy-checkbox">
                                                                <label><input type="checkbox" name="Status" id="Status"  ref={register} defaultChecked={item?.status == 1 ? true : false} data-parsley-multiple="Status" /><span>Kích hoạt</span></label>
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
export default ModelUpdate;
