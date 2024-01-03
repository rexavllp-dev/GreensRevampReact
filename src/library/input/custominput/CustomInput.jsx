"use client";
import React from 'react'
import "./CustomInput.scss"
import { Input, Tooltip } from '@nextui-org/react'
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import InfoIcon from '@/components/customicons/InfoIcon';
import ValidationChecklist from '@/components/validationchecklist/ValidationChecklist';

const CustomInput = ({ type, label, name, value, onChange, placeholder, isRequired, haveInfo, info, isInvalid, errMsg, haveProgress, maxLength, disabled }) => {

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [message, setMessage] = React.useState("");
  const [progress, setProgress] = React.useState("");

  const handlePasswordChange = (e) => {
    let passwordValue = e.target.value;
    onChange(e);

    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength =
      verifiedList.length == 5
        ? "strong"
        : verifiedList.length >= 2
          ? "good"
          : "weak";

    // setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);

    // console.log("verifiedList: ", `${(verifiedList.length / 5) * 100}%`);
  };

  const getActiveColor = (type) => {
    if (type === "strong") return "#8BC926";
    if (type === "good") return "#FEBD01";
    return "#FF0054";
  };


  if (type === 'text') {

    return (
      <div className='custom-text-input-wrapper'>
        <div className='label-container'>
          <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
            {isRequired && <span>*</span>}
          </p>
          {haveInfo &&
            <Tooltip
              content={info}
              placement='right-end'
              classNames={{
                base: [
                  // arrow color
                  "before:bg-neutral-400 dark:before:bg-white",
                ],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >
              <div className="infoicon">
                <InfoIcon />
              </div>
            </Tooltip>
          }
        </div>
        <input
          name={name}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          className={isInvalid ? 'custom-text-input invalid-input' : 'custom-text-input'} //'custom-text-input'
          type='text'
          placeholder={placeholder}
          disabled={disabled}
        />
        <p className="errmsg">{isInvalid ? errMsg : ''}</p>
      </div>
    )
  } else if (type === 'email') {
    return (
      <div className='custom-text-input-wrapper'>
        <div className='label-container'>
          <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
            {isRequired && <span>*</span>}
          </p>
          {haveInfo &&
            <Tooltip
              content={info}
              placement='right-end'
              classNames={{
                base: [
                  // arrow color
                  "before:bg-neutral-400 dark:before:bg-white",
                ],
                content: [
                  "py-2 px-4 shadow-xl",
                  "text-black bg-gradient-to-br from-white to-neutral-400",
                ],
              }}
            >
              <div className="infoicon">
                <InfoIcon />
              </div>
            </Tooltip>
          }
        </div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={isInvalid ? 'custom-text-input invalid-input' : 'custom-text-input'} //'custom-text-input'
          type='text'
          placeholder={placeholder}
          disabled={disabled}
        />
        <p className="errmsg">{isInvalid ? errMsg : ''}</p>
      </div>
    )
  } else if (type === 'password') {

    return (
      <div>
        <Input
          label={label}
          variant="bordered"
          isRequired={isRequired}
          maxLength={maxLength}
          // isInvalid={isInvalid}
          // errorMessage={isInvalid ? errMsg : ''}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handlePasswordChange}
          labelPlacement={"outside"}
          placeholder={placeholder}
          radius='none'
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}

          classNames={{
            label: "custominput-label",
            inputWrapper: ["rounded", 'input-wrapper', isInvalid ? 'invalid-input' : ''],
            input: [
              "custom-input"
            ]
          }}
        />
        {!haveProgress && <p className="errmsg">{isInvalid ? errMsg : ''}</p>}
        {haveProgress &&
          <>
            <div className="progress-bg">
              <div
                className="progress"
                style={{
                  width: progress,
                  backgroundColor: getActiveColor(message),
                }}
              >
              </div>
            </div>
            <p className="errmsg">{isInvalid ? errMsg : ''}</p>

            {
              value?.length !== 0 ?
                (<>

                  {/* <p className="progress-msg" style={{ color: getActiveColor(message) }}>
                    Your password strength is {message}
                  </p> */}
                  <ValidationChecklist value={value} />
                </>

                )
                : ''
            }
          </>
        }
      </div>
    );

  }
}

export default CustomInput