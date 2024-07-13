import request from "@/utils/request"

export interface FileBody {
    FileId: string;
    FileOriginName: string;
    UploadDateTime: string;
    UploadUserId: User["id"];
    UploadFileSize: number;
    UploadFileUrl: string;
}

/**
 * @POST 上传文件
 * @param file File
 * */
export function uploaderFile(file: File) {
    const fd = new FormData()
    fd.append("file", file)
    return request.Post<InstanceBody<FileBody>>("/upload/file", file, {
        meta: {
            requiredLogin: true,
        }
    });
}
