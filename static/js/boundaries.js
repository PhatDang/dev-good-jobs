const citiesElement = document.getElementById("city");
const disTrictsElement = document.getElementById("district");
const wardsElement = document.getElementById("ward");
const data = {
    ho_chi_minh: {
        name: "Hồ Chí Minh",
        districts: {
            tan_binh: {
                name: "Tân Bình",
                wards: [1,2,3,4,5,6,7,8,9,10]
            },
            1: {
                name: "Quận 1",
                wards: ["Bến Nghé", "Bến Thành", "Cầu Kho", "Cô Giang", "Đa Kao", "Nguyễn Cư Trinh", "Nguyễn Thái Bình","Phạm Ngũ Lão", "Tân Định"]
            },
            2: {
                name: "Quận 2",
                wards: ["An Khánh", "An Lợi Đông", "An Phú", "Bình An", "Bình Khánh", "Bình Trưng Đông", "Bình Trưng Tây", "Cát Lái", "Thạnh Mỹ Lợi","Thảo Điền", "Thủ Thiêm"]
            },
            3: {
                name: "Quận 3",
                wards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
            },
            5: {
                name: "Quận 5",
                wards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            },
            6: {
                name: "Quận 6",
                wards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
            },
            7: {
                name: "Quận 7",
                wards: ["Bình Thuận", "Phú Mỹ", "Phú Thuận", "Tân Hưng", "Tân Kiểng", "Tân Phong", "Tân Phú", "Tân Quy", "Tân Thuận Đông", "Tân Thuận Tây"]
            },
            8: {
                name: "Quận 8",
                ward: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            },
            9: {
                name:"Quận 9",
                wards: ["Hiệp Phú", "Long Bình", "Long Phước", "Long Trường", "Long Thạnh Mỹ", "Phú Hữu","Phước Bình","Phước Long A", "Phước Long B", "Tân Phú", "Tăng Nhơn Phú A", "Tăng Nhơn Phú B","Trường Thạnh"]
            },
            10: {
                name: "Quận 10",
                wards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            },
            11: {
                name: "Quận 11",
                wards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
            },
            12: {
                name: "Quận 12",
                ward: ["An Phú Đông", "Đông Hưng Thuận", "Hiệp Chánh", "Tân Chánh Hiệp", "Tân Hưng Thuận", "Tân Thới Hiệp", "Tân Thới Nhất", "Thanh Lộc", "Thanh Xuân", "Thới An", "Trung Mỹ Tây"]
            }


        },
    }
}
let alldistricts = "<option selected hidden>Quận</option>";
for (key in data['ho_chi_minh'].districts) {
    alldistricts += "<option value='" + key + "'>" + data['ho_chi_minh'].districts[key].name + "</option>";
}
disTrictsElement.innerHTML = alldistricts;
disTrictsElement.addEventListener('change', (district) => {
    let allwards ="";
    district = disTrictsElement.value;
    console.log(district)
    for(let i=0; i<data['ho_chi_minh'].districts[district].wards.length;i++) {
        allwards += "<option value='" + i + "'>" + data['ho_chi_minh'].districts[district].wards[i] + "</option>";
        console.log(data['ho_chi_minh'].districts[district].wards[i])
    }
   wardsElement.innerHTML = allwards;
})
