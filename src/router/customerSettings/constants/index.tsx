import Bag from "@/assets/image/bag.svg fill.png"
import Bill from "@/assets/image/Bill.svg fill.png"
import Address from "@/assets/image/portal-addresses.svg.png"

export const quoNum = 1;
export const negoNum = 2;

export const userInfo =
{
    avaLink: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
    name: "Nguyen Van A",
    address: "111 Le Van A",
    phone: "+8411111111",
    email: "nguyenvana@fpt.edu.vn"
}

export const staffInfo =
{
    avaLink: "https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Employee-512.png",
    name: "Nguyen Van B",
    phone: "+8411111111",
    email: "nguyenvana@fpt.edu.vn"
}

export const areaInfo = [
    {
        link: "quotations",
        src: Bag,
        alt: "Bag",
        name: "Quotations",
        description: "Quotations: Theo dõi, xem hoặc thanh toán đơn hàng của bạn",
    },
    {
        link: "quotations1",
        src: Bill,
        alt: "Bill",
        name: "Hóa đơn của bạn",
        description: "Theo dõi, tải xuống hoặc thanh toán hóa đơn của bạn",
    },
    {
        link: "quotations2",
        src: Address,
        alt: "Address",
        name: "Địa chỉ",
        description: "Thêm, xóa, sửa địa chỉ của bạn",
    },
];

export const quotationInfo =
{
    beginDate: "1/1/2001",
    endDate: "1/1/2003",
    totalPrice: 100000000
};

export const negoList = [
    {
        staffInfo: staffInfo,
        time: "12:00 12/1/2004",
        content: "Here is the comment! Here is the comment! Here is the comment!Here is the comment! Here is the comment! Here is the comment! Here is the comment!"
    },
    {
        staffInfo: staffInfo,
        time: "12:00 12/1/2004",
        content: "Here is the comment!"
    },
];

