using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Application.Utils
{
    public enum StatusEnum
    {
        [Description("Tất cả trạng thái")]
        All = -1,
        [Description("Sử dụng")]
        Active = 1,
        [Description("Không sử dụng")]
        Unactive = 0,
        [Description("Đã xóa")]
        Removed = 2
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
        [Description("Đã xóa")]
        Delete = 3
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



