export class UserInfo {
    f_name : string;
    l_name : string;
    email : string;
    rut : string;
    dv : string;
    series : string;
    m_l_name : string;
    b_date : Date;
    key : string;

    constructor(
        f_name : string,
        l_name : string,
        email : string,
        rut : string,
        dv : string,
        series : string,
        m_l_name : string,
        b_date : Date,
        key : string
    ){
        this.f_name = f_name;
        this.l_name = l_name;
        this.email = email;
        this.rut = rut;
        this.dv = dv;
        this.series = series;
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

export class AddUserId {
    user_id : BigInteger;

    constructor(
        user_id : BigInteger,
    ){
        this.user_id = user_id;
    }
}