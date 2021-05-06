using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Application.UTILS
{
    public enum TypeFilter
    {
        [Description("Tất cả trạng thái")]
        All = -1,
        [Description("Bằng")]
        Equal = 0,
        [Description("Lớn hơn bằng")]
        Bigger_Or_Equal = 1,
        [Description("Nhỏ hơn bằng")]
        Smaller_Or_Equal = 2
    }
    public enum StatusEnum
    {
        [Description("Tất cả trạng thái")]
        All = -1,
        [Description("Sử dụng")]
        Active = 1,
        [Description("Không sử dụng")]
        Unactive = 2,
        [Description("Đã xóa")]
        Removed = 0
    }
    public enum StatusThanhToan
    {
        [Description("Tất cả trạng thái")]
        All = -1,
        [Description("Đã thanh toán")]
        Da_Thanh_Toan = 1,
        [Description("Chưa thanh toán")]
        Chua_Thanh_Toan = 2,
        [Description("Thanh toán một phần")]
        Thanh_Toan_Mot_Phan = 2,
        [Description("Hoàn tiền toàn bộ")]
        HoanTien = 0
    }
    public enum StatusNhapKho
    {
        [Description("Tất cả trạng thái")]
        All = -1,
        [Description("Chờ Nhập Hàng")]
        Cho_Nhap_Hang = 1,
        [Description("Đã nhập hàng")]
        Da_Nhap_Hang = 2,
    }
    public enum RolesEnum
    {
        [Description("Thêm mới")]
        Create,
        [Description("Sửa")]
        Update,
        [Description("Xóa")]
        Delete,
        [Description("Phê duyệt")]
        Approval,
        //[Description("Hủy")]
        //Reject

        // Thêm quyền mới

    }
}
public enum DatHangStatus
{
    [Description("Tất cả")]
    All = -1,
    [Description("Đặt hàng")]
    DatHang = 0,
    [Description("Duyệt")] // == Đăng tải
    Duyet = 1,
    [Description("Nhập kho")] // == bị từ chối
    NhapKho = 2,
    [Description("Hoàn thành")] // == bị từ chối
    HoanThanh = 3,
    [Description("Huỷ đơn")] // == bị từ chối
    HuyDon = 4,
}
public enum ContentTypeEnum
{
    [Description("Bài viết thường")]
    Normal = 1,
    [Description("Bài viết ảnh")]
    Image = 2,
    [Description("Bài viết video")]
    Video = 3,
}
//Enum Status cho Contents
public enum ContentStatusEnum
{
    [Description("Tất cả")]
    All = -1,
    [Description("Chờ phê duyệt")]
    Approving = 1,
    [Description("Đã phê duyệt")] // == Đăng tải
    Approved = 2,
    [Description("Trả về")] // == bị từ chối
    Revoked = 3,
    [Description("lấy lại đơn")] // == lấy lại đơn
    Rollback = 4,
    [Description("Đã nhận hàng")] // == đã nhận được hàng
    Received = 5,
    [Description("Đã xóa")]
    Delete = 6,

    //[Description("Đăng tải")]
    //Published = 3,
    //[Description("Thu hồi")]
    //Revoked = 4,
    //[Description("Hủy")]
    //Rejected = 5,
    //[Description("Bị gỡ")]
    //Removed = 6,
}
//Enum Status cho ContentType

public enum ConfigTypeEnum
{
    [Description("List")]
    List = 1,
    [Description("Slide")]
    Slide = 2
}
public enum ConfigDisplayTypeEnum
{
    [Description("Ngang")]
    Horizontal = 1,
    [Description("Dọc")]
    Vertical = 2
}
public enum ConfigPositionEnum
{
    [Description("Trái")]
    Left = 1,
    [Description("Phải")]
    Right = 2

}
public enum TypeQuestionEnum
{
    [Description("Chọn nhiều")]
    MultipleChoice = 1,
    [Description("Chọn 1")]
    SingleChoice = 2
    //[Description("Lưới trắc nghiệm")]
    //GridTest = 3

}
//Enum cho Medias Type
public enum MediaTypeEnum
{
    [Description("Ảnh")]
    Image = 1,
    [Description("Video")]
    Video = 2
}
public enum PanelBannerEnum
{
    [Description("Bên trái")]
    Left = 1,
    [Description("Bên phải")]
    Right = 2,
    [Description("Tất cả vị trí")]
    All = 0
}
public enum DisplayCateOnhomeEnum
{
    [Description("Dạng cột")]
    Column = 1,
    [Description("Dạng hàng")]
    Row = 2,
    [Description("Dạng kết hợp")]
    Mix = 3
}



