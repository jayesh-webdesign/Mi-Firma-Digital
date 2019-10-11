export class UpdateInfo {
    f_name : string;
    l_name : string;
    email : string;
    p_code : string;
    rut : string;
    series : string;
    phone : number;
    m_l_name : string;
    b_date : Date;
    key : string;

    constructor(
        f_name : string,
        l_name : string,
        email : string,
        p_code : string,
        rut : string,
        series : string,
        phone : number,
        m_l_name : string,
        b_date : Date,
        key : string
    ){
        this.f_name = f_name;
        this.l_name = l_name;
        this.email = email;
        this.p_code = p_code;
        this.rut = rut;
        this.series = series;
        this.phone = phone;
        this.m_l_name = m_l_name;
        this.b_date = b_date;
        this.key = key;
    }
}


export class AddPurchaseCode {
    p_code : string;

    constructor(
        p_code : string,
    ){
        this.p_code = p_code;
    }
}