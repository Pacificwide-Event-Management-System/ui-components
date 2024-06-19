"use client";

import { Input } from "antd";
import "./EmsOtp.scss";

type Props = {
  id: string;
  onChange?: (value: string) => void;
};

function EmsOtp(props: Props) {
  return <Input.OTP id={props.id} formatter={(str) => str.toUpperCase()} onChange={props.onChange} />;
}

export default EmsOtp;
