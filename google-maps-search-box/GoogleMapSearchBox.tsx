"use client";

import { Autocomplete, Libraries, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import EmsSpiner from "../ems-spiner/EmsSpiner";
//@ts-expect-error
import GoogleMapsIcon from "@/static/google-maps.svg?component";
import { InputProps } from "antd";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import EmsTextField from "../ems-text-field/EmsTextField";

const libraries: Libraries = ["places"];

type Props = {
  id?: string;
  state?: "error" | "";
  textInputClassName?: string;
  onChange?: (place: string) => void;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
  showLocationNotSelectedError?: boolean;
  helperText?: string;
};

const GoogleMapSearchBox: React.FC<Props & InputProps> = (props) => {
  const t = useTranslations();

  const { isLoaded: isGoogleMapApiLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: getGoogleMapsApiKey(),
    googleMapsApiKey: "AIzaSyBTQCWCIhW2ILIdWY-t3bNPsEHbI2dW1BU",
    libraries: libraries,
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const [location, setLocation] = useState<{
    name: string;
  }>({
    name: (props.value as string) ?? "",
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocomplete.setOptions({
      fields: ["name", "formatted_address", "place_id"],
    });
    setAutocomplete(autocomplete);
  };

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({ name: e.target.value });
    if (props.onChange) {
      props.onChange(e.target.value);
    }
    if (props.onPlaceSelect) {
      props.onPlaceSelect(null);
    }
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();

      if (props.onChange) {
        props.onChange(place.name);
      }
      if (props.onPlaceSelect) {
        props.onPlaceSelect(place);
      }
      setLocation({ name: place.name });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const renderHelperText = () =>
    props.helperText ? (
      <label className="mt-2 text-sm text-accent-red">{props.helperText}</label>
    ) : props.showLocationNotSelectedError ? (
      <label className="mt-2 text-sm text-accent-red">{t("validate_message.please_choose_a_location_for_the_event_on_the_map")}</label>
    ) : undefined;

  if (isGoogleMapApiLoaded) {
    return (
      <div className={props.className}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <EmsTextField
            {...props}
            suffix={<GoogleMapsIcon />}
            textInputClassName={clsx(props.disabled && "border-neutral-divider !bg-neutral-7 !text-neutral-3 hover:border-neutral-5", props.textInputClassName)}
            value={location.name}
            onChange={onQueryChange}
            id={props.id}
            disabled={!autocomplete || props.disabled}
            autoComplete={props.autoComplete ?? "off"}
          />
        </Autocomplete>
        {renderHelperText()}
      </div>
    );
  } else {
    return <EmsSpiner />;
  }
};

export default GoogleMapSearchBox;
