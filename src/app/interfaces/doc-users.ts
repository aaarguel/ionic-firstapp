//Interface para la variable doc definida en la función en el servicio de firebase (logIn)
export interface doc_users{
    id: String;
    data: usuario;
}


export interface usuario{
    email: String;
    firstname: String;
    lastname: String;
    username: String;
    password: String;    
}