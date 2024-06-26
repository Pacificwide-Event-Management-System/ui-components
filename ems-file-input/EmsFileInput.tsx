import AuthConstant from "@/libs/constants/authConstant";
import FileModel from "@/models/common/fileModel";
import { setAccessToken, setRefreshToken } from "@/utils/cookieUtils";
import { Upload, UploadFile, UploadProps } from "antd";
import clsx from "clsx";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { FunctionComponent, ReactNode, useState } from "react";
import SnackbarUtils from "../ems-snackbar/EmsSnackBar";
import "./EmsFileInput.css";
import EmsFileInputCard from "./EmsFileInputCard";

type Props = {
  helperText?: ReactNode;
  fileNotSupportedErrorMessage?: string;
  textInputClassName?: string;
  onChange?: (value: FileModel[]) => void;
  value?: FileModel[];

  onNewFilesChange?: (files: string[]) => void;

  maxSize?: number; //in bytes

  apiUrl: string;
  uploadUrl: string;
  uploadStatusHandling?: (isUploading: boolean) => void;
};

// Custom components
const EmsFileInput: FunctionComponent<Props & UploadProps> = (props) => {
  const t = useTranslations("validate_message");

  const uploadPath = process.env.NEXT_PUBLIC_BACKEND_API_URL + props.apiUrl + props.uploadUrl;
  const [accessToken, setAccessToken] = useState<string | null>(Cookies.get(AuthConstant.AccessTokenCookieName));

  // const [uploadedFiles, setUploadedFiles] = useState<FileModel[]>(props.value ?? []);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>(
    props.value?.map((file) => {
      return {
        uid: file.id,
        name: file.fileName,
        status: "uploaded" as any,
        url: file.filePath,
        response: file,
      };
    }) ?? []
  );

  const [newUploadedFiles, setNewUploadedFiles] = useState<string[]>([]);

  const handleRemoveUploadedFiles = (file: UploadFile) => {
    const index = props.value?.findIndex((x) => x.id === file.uid);
    if (index > -1) {
      props.value.splice(index, 1);
      props.onChange?.([...props.value]);
    }
  };

  const handleRemoveCurrentFiles = (file: UploadFile) => {
    if (file.response) {
      const index = newUploadedFiles.findIndex((x) => x === file.response);
      if (index > -1) {
        newUploadedFiles.splice(index, 1);
        setNewUploadedFiles([...newUploadedFiles]);
        props.onNewFilesChange?.([...newUploadedFiles]);
      }
    }
  };

  const uploadProps: UploadProps = {
    action: uploadPath,
    fileList: uploadedFiles,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    async onChange(info) {
      setUploadedFiles(info.fileList);
      if (info.file?.status === "error" && info.file?.error?.status === 401) {
        await refreshToken();
        setAccessToken(Cookies.get(AuthConstant.AccessTokenCookieName));
      } else if (info.file?.status === "done" && props.onChange) {
        const response = info.file?.response as string;
        newUploadedFiles.push(response);
        setNewUploadedFiles([...newUploadedFiles]);
        props.onNewFilesChange([...newUploadedFiles]);
      }
      if (info.fileList.some((x) => x.status === "uploading")) {
        props.uploadStatusHandling?.(true);
      } else {
        props.uploadStatusHandling?.(false);
      }
    },

    onRemove(file) {
      handleRemoveUploadedFiles(file);
      handleRemoveCurrentFiles(file);

      const index = uploadedFiles.findIndex((x) => x.uid === file.uid);
      if (index > -1) {
        uploadedFiles.splice(index, 1);
        setUploadedFiles([...uploadedFiles]);
      }

      return true;
    },
    beforeUpload(file) {
      const fileExtension = file.name.split(".").pop();
      if (props.maxSize && file.size > props.maxSize) {
        SnackbarUtils.error(t("file_size_exceeds_xmb", { size: (props.maxSize / (1024 * 1024)).toString() }));
        return Upload.LIST_IGNORE;
      } else if (file.type && props.accept?.length && !props.accept.includes(fileExtension)) {
        SnackbarUtils.error(props.fileNotSupportedErrorMessage ?? t("the_uploaded_file_was_not_supported"));
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onPreview(file) {
      console.log("onPreview", file);
    },
    itemRender: (originNode, file, currFileList, actions) => {
      return <EmsFileInputCard originNode={originNode} file={file} fileList={currFileList} actions={actions} />;
    },
  };

  return (
    <Upload {...props} {...uploadProps} className={clsx("ems-file-upload", props.className)}>
      <div>
        <input
          type="file"
          disabled={props.disabled}
          className={clsx("custom-upload-input", props.textInputClassName)}
          id={props.id}
          autoComplete={"off"}
          onClick={(e) => e.preventDefault()}
        />
        {props.helperText && <>{props.helperText}</>}
      </div>
    </Upload>
  );
};

export default EmsFileInput;

async function refreshToken() {
  try {
    const refreshToken = Cookies.get(AuthConstant.RefreshTokenCookieName);

    if (refreshToken) {
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "/";
      const response = await fetch(`${baseURL}api/Users/refreshToken`, {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      if (data?.accessToken && data?.refreshToken) {
        await setAccessToken(data?.accessToken);
        await setRefreshToken(data?.refreshToken);

        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
