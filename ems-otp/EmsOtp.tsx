"use client";

import { Input } from "antd";
import "./EmsOtp.scss";

type Props = {
  onChange?: (value: string) => void;
};

function EmsOtp(props: Props) {
  return <Input.OTP formatter={(str) => str.toUpperCase()} onChange={props.onChange} />;
}

export default EmsOtp;
