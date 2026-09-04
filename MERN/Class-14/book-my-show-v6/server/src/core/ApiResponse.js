export class ApiResponse{
    constructor(status, message, payload) {
        this.status = status;
        this.message = message;
        this.payload = payload;
    }
    static build(status, message, payload=null) {
        return new ApiResponse(status, message, payload);
    }
}