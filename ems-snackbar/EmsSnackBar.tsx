"use client";
import Close from "@/static/close.svg";
import Error from "@/static/error.svg";
import Info from "@/static/info.svg";
import Success from "@/static/success.svg";
import Warning from "@/static/warning.svg";
import Image from "next/image";
import {
  CustomContentProps,
  ProviderContext,
  SnackbarContent,
  useSnackbar,
} from "notistack";
import { forwardRef } from "react";

let useSnackbarRef: ProviderContext;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const onClickDismiss = (key) => {
  useSnackbarRef.closeSnackbar(key);
};

interface EmsSnackbarProps extends CustomContentProps {
  id: string;
  message: string;
}

export const EmsSnackbar = forwardRef<HTMLDivElement, EmsSnackbarProps>(
  ({ id, message, variant, ...props }, ref) => {
    return (
      <SnackbarContent
        ref={ref}
        className="fixed left-[50%] top-[4.75rem] z-[999999] flex !translate-x-[-50%] items-center justify-center"
      >
        <div className="flex w-max min-h-7 items-center gap-2 rounded-md border-[0.5px] border-neutral-4 bg-neutral-8 px-2 py-1">
          {variant == "success" && (
            <>
              <Image src={Success.src} width={16} height={16} alt="" />
              <div className="text-sm font-normal">{message}</div>
              <Image
                src={Close.src}
                width={20}
                height={20}
                alt=""
                className="cursor-pointer"
                onClick={() => onClickDismiss(id)}
              />
            </>
          )}
          {variant == "info" && (
            <>
              <Image src={Info.src} width={16} height={16} alt="" />
              <div className="text-sm font-normal">{message}</div>
              <Image
                src={Close.src}
                width={20}
                height={20}
                alt=""
                className="cursor-pointer"
                onClick={() => onClickDismiss(id)}
              />
            </>
          )}
          {variant == "warning" && (
            <>
              <Image src={Warning.src} width={16} height={16} alt="" />
              <div className="text-sm font-normal">{message}</div>
              <Image
                src={Close.src}
                width={20}
                height={20}
                alt=""
                className="cursor-pointer"
                onClick={() => onClickDismiss(id)}
              />
            </>
          )}
          {variant == "error" && (
            <>
              <Image src={Error.src} width={16} height={16} alt="" />
              <div className="text-sm font-normal text-accent-red">
                {message}
              </div>
              <Image
                src={Close.src}
                width={20}
                height={20}
                alt=""
                className="cursor-pointer"
                onClick={() => onClickDismiss(id)}
              />
            </>
          )}
        </div>
      </SnackbarContent>
    );
  }
);

EmsSnackbar.displayName = "EmsSnackbar";

const SnackbarUtils = {
  success(msg) {
    this.toast(msg, { variant: "success" });
  },
  warning(msg) {
    this.toast(msg, { variant: "warning" });
  },
  info(msg) {
    this.toast(msg, { variant: "info" });
  },
  error(msg) {
    this.toast(msg, { variant: "error" });
  },
  toast(msg: string, props) {
    useSnackbarRef?.enqueueSnackbar?.(msg, {
      ...props,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  },
};

export default SnackbarUtils;
